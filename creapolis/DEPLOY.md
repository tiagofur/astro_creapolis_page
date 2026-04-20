# Runbook de despliegue — creapolis.dev

Guía para reconstruir el entorno productivo desde cero en caso de que el VPS se pierda o haya que migrar.

## Arquitectura

- **Frontend**: Astro estático, servido por nginx (gestionado por Plesk) bajo el dominio `creapolis.dev`.
- **Backend**: API en Go (chi router) compilada en imagen Docker publicada en GHCR (`ghcr.io/tiagofur/creapolis-api:latest`).
- **Base de datos**: MariaDB/MySQL local en el VPS (gestionado por Plesk), base `creapolis_dev`.
- **Email notifications**: relay SMTP a Gmail (IONOS bloquea el puerto 25 saliente).

El backend escucha en el puerto `3000` dentro del contenedor, mapeado a `3100` en el host. nginx en `creapolis.dev` hace proxy `/api/` → `127.0.0.1:3100`.

## Infraestructura base

- **VPS**: IONOS, Ubuntu 24.04, IP `74.208.234.244`.
- **Panel**: Plesk Obsidian 18.0.76.
- **DNS**: registros A de `creapolis.dev` y `www.creapolis.dev` apuntando a `74.208.234.244`.

## 1. Provisionar VPS y Plesk

1. Instalar Ubuntu 24.04 en el VPS.
2. Instalar Plesk Obsidian siguiendo el instalador oficial de IONOS/Plesk.
3. Crear el dominio `creapolis.dev` en Plesk (Suscripciones → Add Domain).
4. Emitir certificado Let's Encrypt para `creapolis.dev` y `www.creapolis.dev` desde Plesk → SSL/TLS Certificates.

## 2. Ajustar firewall

La imagen de VPS de IONOS puede traer una cadena personalizada `CF_WEB` en iptables que solo acepta :80/:443 desde IPs de Cloudflare. Como `creapolis.dev` apunta directo al VPS (no vía Cloudflare), hay que quitarla:

```bash
# Verificar si existe
sudo iptables -L INPUT -n | grep CF_WEB

# Si existe, eliminar la regla y la cadena
sudo iptables -D INPUT -p tcp -m multiport --dports 80,443 -j CF_WEB
sudo iptables -F CF_WEB
sudo iptables -X CF_WEB

# Persistir
sudo iptables-save | sudo tee /etc/iptables/rules.v4
sudo ip6tables-save | sudo tee /etc/iptables/rules.v6

# Limpiar el ipset cf_v4 si existe
sudo ipset destroy cf_v4 2>/dev/null
sudo grep -vE "cf_v4" /etc/iptables/ipsets > /tmp/ipsets.new && sudo mv /tmp/ipsets.new /etc/iptables/ipsets
```

Dejar abiertos los puertos estándar de Plesk (80, 443, 22, 8443, etc.) — normalmente ya vienen abiertos.

## 3. Instalar Docker

```bash
sudo apt update
sudo apt install -y docker.io
sudo systemctl enable --now docker
```

## 4. Configurar variables de entorno del backend

Crear el directorio y el archivo (permisos 600 para proteger el App Password):

```bash
sudo mkdir -p /etc/creapolis
sudo tee /etc/creapolis/backend.env > /dev/null <<'EOF'
PORT=3000
DATABASE_URL=creapolis_api:<DB_PASSWORD>@tcp(10.0.0.1:3306)/creapolis_dev?parseTime=true&charset=utf8mb4&loc=Local
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=creapolis.mx@gmail.com
SMTP_PASS=<GMAIL_APP_PASSWORD_16_CHARS_SIN_ESPACIOS>
NOTIFY_EMAIL=tiagofur@gmail.com
SMTP_INSECURE_SKIP_VERIFY=false
EOF
sudo chmod 600 /etc/creapolis/backend.env
```

Sustituir:

- `<DB_PASSWORD>`: contraseña del usuario `creapolis_api` en la DB de Plesk.
- `<GMAIL_APP_PASSWORD_16_CHARS_SIN_ESPACIOS>`: App Password generado en Google Account → Security → App Passwords para la cuenta `creapolis.mx@gmail.com` (requiere 2FA activa). Los 16 caracteres van sin espacios.

### ¿Por qué Gmail relay en lugar de Postfix directo?

IONOS bloquea el puerto 25 saliente como política anti-spam. Postfix acepta el mensaje localmente pero nunca lo entrega (queda en deferred). Gmail SMTP en :465 funciona porque usa un puerto submission distinto.

## 5. Base de datos

Desde Plesk → Databases, crear:

- DB: `creapolis_dev`
- Usuario: `creapolis_api` con la contraseña que pusiste en `<DB_PASSWORD>`.

Luego aplicar las migraciones del backend (ver `backend/migrations/` en el repo) con el cliente mysql del host:

```bash
mysql -u creapolis_api -p creapolis_dev < backend/migrations/001_init.sql
```

## 6. Configurar proxy nginx para `/api/`

Crear el override de nginx por dominio (Plesk lo aplica automáticamente al recargar):

```bash
sudo tee /var/www/vhosts/system/creapolis.dev/conf/vhost_nginx.conf > /dev/null <<'EOF'
location /api/ {
    proxy_pass http://127.0.0.1:3100;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_read_timeout 30s;
}
EOF

# Regenerar la config de nginx de Plesk
sudo plesk repair web -y
sudo systemctl reload nginx
```

Esto hace que `POST https://creapolis.dev/api/contact` desde el frontend llegue al backend Go sin CORS ni URL absoluta. El frontend usa `fetch('/api/contact')` como fallback cuando `import.meta.env.API_URL` no está definido (que es el caso en el bundle cliente de Astro porque la var no tiene prefijo `PUBLIC_`).

## 7. Desplegar el backend

```bash
# Login en GHCR (con Personal Access Token con scope read:packages)
echo $GITHUB_TOKEN | sudo docker login ghcr.io -u tiagofur --password-stdin

# Pull y run
sudo docker pull ghcr.io/tiagofur/creapolis-api:latest
sudo docker run -d --name creapolis-api \
  --restart unless-stopped \
  --env-file /etc/creapolis/backend.env \
  -p 3100:3000 \
  ghcr.io/tiagofur/creapolis-api:latest
```

Verificar logs:

```bash
sudo docker logs -f creapolis-api
```

Debe aparecer algo como `Server listening on :3000`.

## 8. Desplegar el frontend

El frontend se publica desde GitHub Actions (ver `.github/workflows/`) vía SSH/rsync al webroot de Plesk: `/var/www/vhosts/creapolis.dev/httpdocs/`.

Para un deploy manual desde local:

```bash
cd creapolis
npm ci
npm run build
rsync -avz --delete dist/ user@74.208.234.244:/var/www/vhosts/creapolis.dev/httpdocs/
```

## Operaciones comunes

### Rotar el App Password de Gmail

1. Google Account → Security → App Passwords → revocar el actual y generar uno nuevo.
2. En el VPS:

   ```bash
   sudo nano /etc/creapolis/backend.env
   # cambiar SMTP_PASS= (16 chars sin espacios)
   sudo docker stop creapolis-api && sudo docker rm creapolis-api
   sudo docker run -d --name creapolis-api \
     --restart unless-stopped \
     --env-file /etc/creapolis/backend.env \
     -p 3100:3000 \
     ghcr.io/tiagofur/creapolis-api:latest
   ```

Importante: `docker restart` **NO** recarga `--env-file` — hay que `stop && rm && run`.

### Actualizar el backend a una nueva versión

```bash
sudo docker pull ghcr.io/tiagofur/creapolis-api:latest
sudo docker stop creapolis-api && sudo docker rm creapolis-api
sudo docker run -d --name creapolis-api \
  --restart unless-stopped \
  --env-file /etc/creapolis/backend.env \
  -p 3100:3000 \
  ghcr.io/tiagofur/creapolis-api:latest
```

### Verificar que el form de contacto funciona end-to-end

```bash
curl -X POST https://creapolis.dev/api/contact \
  -H 'Content-Type: application/json' \
  -d '{"name":"Test","email":"test@example.com","message":"runbook check"}'
```

Debe responder `200 OK`, guardar el registro en la tabla de contactos, y llegar un email a `tiagofur@gmail.com` en 1–3 segundos.

### Limpiar cola de correo en Postfix (si quedó algo atascado de antes)

```bash
sudo mailq | head
sudo postsuper -d ALL deferred
```

## Troubleshooting

**`ERR_CONNECTION_TIMED_OUT` desde navegadores externos pero `curl` local funciona.**
Casi seguro la cadena `CF_WEB` de iptables volvió a cargarse tras un reinicio. Repetir los pasos de la sección 2 y asegurarse de guardar `rules.v4` y `ipsets`.

**Email no llega pero el form devuelve 200.**
Revisar logs del contenedor (`sudo docker logs creapolis-api`) — si aparece `smtp: tls: ...` el problema es autenticación; rotar App Password. Si aparece `dial tcp: i/o timeout`, IONOS está bloqueando también :465 (improbable, pero confirmar con `telnet smtp.gmail.com 465` desde el VPS).

**Puerto 25 falla pero no estás usando relay.**
Es la política anti-spam de IONOS. No se puede quitar; hay que usar un relay (Gmail, SendGrid, Mailgun, etc.).

## Contactos / recursos

- Repo: este directorio.
- Registro de imágenes: `ghcr.io/tiagofur/creapolis-api`.
- DNS: gestionado donde se registró `creapolis.dev`.
- Cuenta SMTP: `creapolis.mx@gmail.com` (App Password, 2FA obligatorio).
- Destinatario de notificaciones: `tiagofur@gmail.com`.
