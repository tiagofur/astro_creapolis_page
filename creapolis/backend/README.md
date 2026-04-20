# Backend — Contact Form API

## Go + Chi router + MariaDB

Servidor en Go para recibir submissions del formulario de contacto con protección anti-spam.

## Features

- ✅ Honeypot (campo invisible para bots)
- ✅ Rate limiting (5 req/min por IP)
- ✅ Timestamp challenge (anti-bot rápido)
- ✅ Validación de email
- ✅ Guardar en MariaDB / MySQL
- ✅ Email notifications (logs en desarrollo)

## Correr

```bash
cd backend
./server
```

El servidor corre en `http://localhost:3000`

## Environment Variables

```bash
# Server
PORT=3000

# Database (MariaDB/MySQL DSN — formato Go driver)
# user:password@tcp(host:port)/dbname?parseTime=true&charset=utf8mb4&loc=Local
DATABASE_URL=creapolis_api:tu-password@tcp(localhost:3306)/creapolis_dev?parseTime=true&charset=utf8mb4&loc=Local

# SMTP (Plesk Mail — para enviar notificaciones del formulario)
SMTP_HOST=creapolis.dev
SMTP_PORT=465
SMTP_USER=no-reply@creapolis.dev
SMTP_PASS=tu-password-de-email

# Email destino para notificaciones (opcional, default: SMTP_USER)
NOTIFY_EMAIL=tiagofur@gmail.com
```

### Configuración SMTP (Plesk Mail)

1. Ingresá al panel de Plesk → Correo → `no-reply@creapolis.dev`
2. El servidor SMTP es el host principal: `creapolis.dev` (o la IP del VPS, `74.208.234.244`)
3. Puerto: `465` (TLS implícito) o `587` (STARTTLS)
4. Usuario: `no-reply@creapolis.dev`, contraseña: la que se generó al crear el buzón
5. Las notificaciones se envían a `NOTIFY_EMAIL` (por defecto, el mismo `SMTP_USER`)

## Base de datos

El servidor crea automáticamente la tabla `contacts` si no existe.

## Endpoint

```
POST /api/contact
Content-Type: application/json

{
  "name": "Juan Pérez",
  "email": "juan@empresa.com",
  "company": "Mi Empresa",
  "message": "Hola, quiero información sobre...",
  "website": "",  // Honeypot - vacío si es humano
  "timestamp": "1700000000000"  // Timestamp JS
}
```

## Respuesta

```json
{
  "success": true,
  "message": "Thank you! We'll get back to you soon."
}
```

## Producción

Para producción en el VPS de IONOS con Plesk:

1. **Database** — Configurar `DATABASE_URL` con la MariaDB de Plesk (`creapolis_dev`)
2. **CORS** — Los orígenes ya están configurados (`creapolis.dev`, `www.creapolis.dev`)
3. **Email** — Usar las credenciales SMTP de `no-reply@creapolis.dev` (Plesk Mail)
4. **HTTPS** — El proxy inverso de Plesk sobre `api.creapolis.dev` maneja el TLS (Let's Encrypt)
5. **Deploy** — Imagen Docker publicada en GHCR vía GitHub Actions; Plesk Docker la corre en el VPS

## Estructura

```
backend/
├── main.go      # Servidor
├── go.mod       # Dependencias
├── go.sum       # Checksums
└── server       # Binario compilado
```