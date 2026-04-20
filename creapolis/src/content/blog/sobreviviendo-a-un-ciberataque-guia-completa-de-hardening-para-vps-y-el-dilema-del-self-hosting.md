---
title: "Sobreviviendo a un Ciberataque: Guía Completa de Hardening para VPS y el Dilema del Self-Hosting"
description: "Guía práctica de hardening VPS: en esta guía aprenderás a proteger tu VPS contra ataques comunes (fuerza bruta SSH, malware, misconfiguraciones), aplicar hardening SSH, configurar…"
pubDate: "2026-01-13"
author: "tiagofur"
tags: []
categories: ["Flutter - Basico"]
slug: "sobreviviendo-a-un-ciberataque-guia-completa-de-hardening-para-vps-y-el-dilema-del-self-hosting"
originalUrl: "https://creapolis.dev/sobreviviendo-a-un-ciberataque-guia-completa-de-hardening-para-vps-y-el-dilema-del-self-hosting/"
draft: false
---

**Guía práctica de hardening VPS:** en esta guía aprenderás a
proteger tu VPS contra ataques comunes (fuerza bruta SSH, malware,
misconfiguraciones), aplicar hardening SSH, configurar firewall y decidir
cuándo optar por self-hosting o una plataforma gestionada.

**Lo que aprendimos recuperando nuestro servidor, análisis detallado de
amenazas, configuración paso a paso de seguridad y cuándo es mejor delegar
la seguridad a servicios como Vercel o Coolify**

## Introducción

En el mundo del desarrollo, a menudo nos enfocamos tanto en el código —en que
el \_frontend\_ en React sea rápido o el \_backend\_ en NestJS sea escalable— que
olvidamos el suelo sobre el que pisamos: la infraestructura. Es un error
común: optimizamos el rendimiento de nuestras aplicaciones mientras la puerta
principal está abierta a cualquier atacante.

Recientemente, en **Creapolis**, nuestro servidor VPS sufrió un
ataque. No es algo extraño; según los datos de CrowdSec, más de 15 millones de
señales de IPs agresivas se comparten diariamente en su red de más de 100,000
usuarios activos en más de 190 países. Los bots escanean internet las 24 horas
buscando puertos abiertos y vulnerabilidades.

Esta experiencia no solo nos sirvió para reforzar nuestros protocolos de
seguridad, sino que se convirtió en una oportunidad invaluable para
reflexionar sobre una decisión crítica para cualquier desarrollador:
**¿Deberías gestionar tu propio VPS o usar una plataforma gestionada?**

En este artículo, te contamos qué pasó con nuestro servidor, cómo lo
solucionamos, qué debes hacer hoy mismo para proteger tu servidor, y te
ofrecemos un análisis comparativo exhaustivo entre el self-hosting y el uso de
PaaS.

## Prerrequisitos

Para seguir completamente esta guía y aplicar todas las configuraciones de
hardening, necesitas:

- Acceso root o sudo a un servidor Ubuntu 20.04/22.04/24.04 o Debian 11/12

- Conocimiento básico de línea de comandos de Linux

- Un VPS activo en IONOS, DigitalOcean, Hetzner, AWS EC2 o similar

- Cliente SSH instalado en tu máquina local

- Docker instalado (si planeas usar contenedores)

- Tiempo estimado: 1-2 horas para hardening completo

## Anatomía del Ataque: Lo que Realmente Sucedió

### Cómo nos enteramos del ataque

Generalmente, los ataques no son dramáticos como en las películas. Son
silenciosos y graduales. En nuestro caso, los primeros síntomas fueron:

1. **Degradación del rendimiento:** El tiempo de respuesta de
nuestras APIs aumentó de 200ms a 5+ segundos

2. **CPU al límite:** Con `htop` vimos procesos desconocidos
consumiendo el 100% de la CPU

3. **Tráfico inusual:** Monitoreando con `nload`, observamos
picos de tráfico sostenido hacia el puerto 22

4. **Logs de autenticación:** Al revisar `/var/log/auth.log`,
encontramos miles de intentos fallidos de login por minuto

### Análisis del tipo de ataque

El ataque fue un
**ataque de fuerza bruta SSH (brute-force attack)** automatizado.
Los atacantes utilizaron botnets para:

- Escanear nuestra IP y detectar el puerto 22 abierto

- Intentar miles de combinaciones de usuario/contraseña por segundo

- Usar diccionarios de contraseñas comunes y listas de usuarios típicos
(admin, root, user, ubuntu, etc.)

- Rotar IPs desde múltiples nodos para evadir bloqueos simples

Según CrowdSec, este tipo de ataques representa aproximadamente el 40% del
tráfico malicioso en servidores públicos mal configurados.

### Lo que hicimos (y lo que debes hacer) paso a paso

#### Paso 1: Aislar y Analizar

Lo primero fue entrar por consola (aún era posible porque el ataque no había
comprometido por completo el acceso) y revisar los procesos activos:

```
# Ver procesos en tiempo real
htop

# O usar top si htop no está instalado
top
```

Herramientas como `htop` o `top` son fundamentales aquí. Identificamos el
proceso malicioso (un script de minado de criptomonedas) y lo eliminamos:

```
# Matar el proceso por PID
kill -9 PID

# Si el proceso se reinicia automáticamente
systemctl stop nombre_servicio
systemctl disable nombre_servicio
```

#### Paso 2: Revisión de Logs Exhaustiva

Revisamos los logs del sistema para entender el alcance del ataque:

```
# Ver intentos de acceso fallidos en Ubuntu/Debian
tail -f /var/log/auth.log | grep "Failed password"

# Contar intentos por IP
grep "Failed password" /var/log/auth.log | awk '{print $(NF-3)}' | sort | uniq -c | sort -nr | head -20

# Ver intentos de root
grep "Failed password for root" /var/log/auth.log | wc -l
```

Confirmamos que fue un intento masivo de fuerza bruta contra el puerto 22, con
más de 50,000 intentos en 24 horas desde múltiples IPs.

#### Paso 3: Cierre de Puertas Inmediato

Configuramos el firewall UFW para denegar todo tráfico entrante que no fuera
estrictamente necesario:

```
# Primero, permite conexiones existentes para no quedarte afuera
ufw allow ssh

# Permite tráfico HTTP y HTTPS
ufw allow 80/tcp
ufw allow 443/tcp

# Habilita UFW con regla por defecto de denegar entrante
ufw default deny incoming
ufw default allow outgoing
ufw enable
```

**IMPORTANTE:** Antes de cambiar el puerto SSH, asegúrate de
configurarlo primero en `sshd\_config` y probar la nueva conexión. De lo
contrario, podrías quedarte bloqueado fuera de tu propio servidor.

## Guía Completa de Prevención: Hardening de VPS

Si tienes un VPS (en IONOS, DigitalOcean, AWS, Hetzner, etc.) y lo configuras
"tal cual viene", eres un blanco fácil. Las configuraciones por defecto están
diseñadas para facilidad de uso, no para seguridad. Aquí tienes la
**checklist obligatoria** que aplicamos, con cada paso detallado.

### A. Cambia el puerto SSH por defecto

Los bots automatizados atacan el puerto 22 por defecto. Es el primer puerto
que escanean. Mover tu SSH a un puerto no estándar (ej. 2244, 3456, 5678)
reduce el "ruido" de ataques en un 90%.

**Configuración paso a paso:**

```
# 1. Edita el archivo de configuración SSH
sudo nano /etc/ssh/sshd_config

# 2. Busca y modifica la línea Port 22 (descoméntala si está comentada)
Port 2244

# 3. Guarda con Ctrl+O y sal con Ctrl+X

# 4. Antes de reiniciar SSH, permite el nuevo puerto en el firewall
sudo ufw allow 2244/tcp

# 5. Reinicia el servicio SSH
sudo systemctl restart sshd

# 6. Prueba la nueva conexión ANTES de cerrar la sesión actual
ssh -p 2244 usuario@tu-servidor

# 7. Si funciona, ahora puedes eliminar el puerto 22 del firewall
sudo ufw delete allow 22/tcp
```

**Consejo de seguridad:** Usa un puerto alto (por encima de 1024)
pero evita puertos muy comunes como 2222, 22222 o 8080.

### B. Prohibido el acceso por contraseña - Solo SSH Keys

Esta es la **regla de oro** del SSH hardening. Las contraseñas
pueden ser adivinadas o forzadas por fuerza bruta. Las llaves SSH son
prácticamente imposibles de romper por fuerza bruta convencional.

#### Generar llaves SSH en tu máquina local

```
# Genera un par de llaves ED25519 (recomendado, más seguro y rápido)
ssh-keygen -t ed25519 -C "tu_email@ejemplo.com"

# O genera RSA 4096-bit si necesitas compatibilidad con sistemas muy antiguos
ssh-keygen -t rsa -b 4096 -C "tu_email@ejemplo.com"
```

#### Copiar la llave pública al servidor

```
# Método 1: Usar ssh-copy-id (más fácil)
ssh-copy-id -i ~/.ssh/id_ed25519.pub usuario@tu-servidor

# Método 2: Manualmente si ssh-copy-id no está disponible
cat ~/.ssh/id_ed25519.pub | ssh usuario@tu-servidor "mkdir -p ~/.ssh && cat >> ~/.ssh/authorized_keys"
```

#### Configurar el servidor para rechazar contraseñas

```
# Edita la configuración SSH
sudo nano /etc/ssh/sshd_config
```

Modifica o añade estas líneas:

```
# Deshabilita autenticación por contraseña
PasswordAuthentication no

# No permitir login directo como root
PermitRootLogin prohibit-password

# Limita los métodos de autenticación
AuthenticationMethods publickey

# Opcional: Especifica qué usuarios pueden acceder
AllowUsers usuario1 usuario2
# O qué grupos
# AllowGroup sudo docker
```

Guarda los cambios y reinicia SSH:

```
# Verifica que la configuración es correcta
sudo sshd -t

# Si no hay errores, reinicia el servicio
sudo systemctl restart sshd
```

**CRÍTICO:** Antes de reiniciar SSH, abre una NUEVA sesión de SSH
en otra terminal para verificar que puedes entrar con tu llave. Si algo sale
mal, aún tendrás la sesión original abierta para corregir.

#### Hardening avanzado de SSH

Basándonos en las guías de sshaudit.com, aquí hay configuraciones adicionales
para maximizar la seguridad:

```
# Crea un archivo de configuración de hardening
sudo nano /etc/ssh/sshd_config.d/hardening.conf
```

Añade lo siguiente:

```
# Cifrado fuerte
Ciphers chacha20-poly1305@openssh.com,aes256-gcm@openssh.com,aes256-ctr,aes192-ctr

# MAC (Message Authentication Code) seguro
MACs hmac-sha2-512-etm@openssh.com,hmac-sha2-256-etm@openssh.com,umac-128-etm@openssh.com

# Algoritmos de intercambio de claves
KexAlgorithms curve25519-sha256,curve25519-sha256@libssh.org,diffie-hellman-group16-sha512,diffie-hellman-group18-sha512

# Algoritmos de llaves de host
HostKeyAlgorithms ssh-ed25519,ssh-ed25519-cert-v01@openssh.com,rsa-sha2-512,rsa-sha2-256

# Tiempo de inactividad antes de desconectar (300 segundos = 5 minutos)
ClientAliveInterval 300
ClientAliveCountMax 2

# Máximo de intentos de autenticación
MaxAuthTries 3

# Login grace time (tiempo para autenticarse antes de desconectar)
LoginGraceTime 60
```

### C. Instala Fail2Ban o CrowdSec

Estas herramientas son esenciales. Leen los logs del sistema y si detectan
comportamientos sospechosos (como múltiples intentos fallidos de contraseña),
bloquean automáticamente la IP del atacante.

#### Opción 1: Fail2Ban (Clásico y Probado)

```
# Instala Fail2Ban
sudo apt update
sudo apt install fail2ban -y

# Crea una copia del archivo de configuración principal
sudo cp /etc/fail2ban/jail.conf /etc/fail2ban/jail.local

# Edita la configuración local
sudo nano /etc/fail2ban/jail.local
```

Configuración básica recomendada para `/etc/fail2ban/jail.local`:

```
[DEFAULT]
# Tiempo de ban en segundos (1 día = 86400)
bantime = 86400

# Número de fallos antes de banear
findtime = 600
maxretry = 5

# Ignora tu IP personal (reemplaza con tu IP real)
ignoreip = 127.0.0.1/8 ::1 TU_IP_PÚBLICA

[sshd]
enabled = true
port = ssh,2244
filter = sshd
logpath = /var/log/auth.log
maxretry = 3
bantime = 3600
```

```
# Reinicia Fail2Ban
sudo systemctl restart fail2ban

# Verifica el estado
sudo fail2ban-client status

# Ver el estado de la jail SSH
sudo fail2ban-client status sshd

# Ver IPs baneadas
sudo fail2ban-client status sshd | grep "Banned IP"
```

Desbanear una IP si es necesario:

```
# Desbanear una IP específica
sudo fail2ban-client set sshd unbanip IP_DEL_ATACANTE
```

#### Opción 2: CrowdSec (Moderno con Inteligencia Colectiva)

CrowdSec es más moderno y tiene una ventaja única:
**comparte información de IPs maliciosas entre todos los usuarios**. Si un atacante golpea tu servidor, su IP se comparte con la comunidad, y tú
recibes protección contra IPs que han atacado a otros.

```
# Instala CrowdSec
curl -s https://packagecloud.io/install/repositories/crowdsec/crowdsec/script.deb.sh | sudo bash
sudo apt install crowdsec -y

# Instala el decisor de firewall (para baneos automáticos)
sudo apt install crowdsec-firewall-bouncer-iptables -y

# Configura CrowdSec
sudo cscli hub update
sudo cscli collections install crowdsecurity/linux
sudo cscli collections install crowdsecurity/sshd
sudo cscli parsers install crowdsecurity/dateparse-enrich

# Reinicia CrowdSec
sudo systemctl restart crowdsec
sudo systemctl restart crowdsec-firewall
```

Verificar que está funcionando:

```
# Ver logs de CrowdSec
sudo journalctl -u crowdsec -f

# Ver escenarios activos
sudo cscli scenarios list

# Ver decisiones recientes (baneos)
sudo cscli decisions list
```

**Ventaja clave de CrowdSec:** Puedes instalar "blocklists" que
banean automáticamente IPs que han atacado a otros usuarios, incluso antes de
que intenten atacarte. Esto reduce hasta un 95% el ruido de ataques según sus
datos.

### D. Configuración Avanzada de Firewall con UFW

UFW (Uncomplicated Firewall) es la interfaz fácil para iptables. Aquí hay una
configuración completa y segura:

```
# 1. Establece políticas por defecto
sudo ufw default deny incoming
sudo ufw default allow outgoing

# 2. Permite conexiones loopback (necesarias para el sistema)
sudo ufw allow in on lo

# 3. Permite conexiones establecidas y relacionadas
sudo ufw allow established
sudo ufw allow related

# 4. Permite SSH (en tu puerto personalizado)
sudo ufw allow 2244/tcp comment 'SSH personalizado'

# 5. Permite HTTP y HTTPS
sudo ufw allow 80/tcp comment 'HTTP'
sudo ufw allow 443/tcp comment 'HTTPS'

# 6. Opcional: Permite puertos específicos para tus aplicaciones
# sudo ufw allow 3000/tcp comment 'Node.js app'
# sudo ufw allow 5432/tcp comment 'PostgreSQL' (SOLO si está detrás de VPN)
# sudo ufw allow 6379/tcp comment 'Redis' (SOLO si está detrás de VPN)

# 7. Opcional: Limita conexiones SSH para prevenir ataques de fuerza bruta
sudo ufw limit 2244/tcp comment 'SSH con limitación de rate'

# 8. Activa el firewall
sudo ufw enable

# 9. Verifica el estado
sudo ufw status verbose
```

**Configuración avanzada de rate limiting:**

```
# Permite solo 6 conexiones nuevas por cada 30 segundos desde la misma IP al puerto SSH
sudo ufw limit 2244/tcp

# Esto previene ataques DDoS de capa de aplicación y fuerza bruta agresiva
```

### E. Seguridad Avanzada de Docker

Docker es increíblemente útil, pero puede ser un vector de ataque si no se
configura correctamente. Aquí está el hardening esencial:

#### 1. Ejecutar Docker sin root (Rootless Docker)

```
# Instala rootless-docker
curl -fsSL https://get.docker.com/rootless | sh

# Añade variables de entorno a ~/.bashrc
echo 'export PATH=/home/$USER/bin:$PATH' >> ~/.bashrc
source ~/.bashrc

# Activa el servicio
systemctl --user start docker
systemctl --user enable docker
```

#### 2. Configurar daemon de Docker para seguridad

```
# Edita o crea /etc/docker/daemon.json
sudo nano /etc/docker/daemon.json
```

Configuración recomendada:

```
{
  "live-restore": true,
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "10m",
    "max-file": "3"
  },
  "storage-driver": "overlay2",
  "userland-proxy": false,
  "no-new-privileges": true,
  "icc": false,
  "default-ulimits": {
    "nofile": {
      "Name": "nofile",
      "Hard": 64000,
      "Soft": 64000
    }
  }
}
```

```
# Reinicia Docker
sudo systemctl restart docker
```

#### 3. Aislar contenedores de la red pública

**MAL:** Exponer puertos a todas las interfaces

```
docker run -p 8080:80 nginx  # Expose a 0.0.0.0:8080
```

**BIEN:** Exponer solo a localhost si es posible

```
docker run -p 127.0.0.1:8080:80 nginx  # Solo accessible localmente
```

**BIEN:** O usar una red Docker personalizada

```
# Crea una red personalizada
docker network create app-network

# Conecta contenedores a la red
docker network connect app-network contenedor1
docker network connect app-network contenedor2

# Solo expone el contenedor reverse proxy
docker run -p 80:80 --network app-network nginx
```

#### 4. Usar capacidades mínimas

Por defecto, Docker corre como root. Reduce las capacidades:

```
docker run --cap-drop ALL --cap-add NET_BIND_SERVICE nginx
```

#### 5. Imágenes de Docker seguras

```
# Usa imágenes minimalistas (alpine)
docker pull nginx:alpine

# Escanea imágenes en busca de vulnerabilidades
sudo apt install docker-scan-plugin
docker scan nginx:alpine
```

### F. Actualizaciones Automáticas del Sistema

Un sistema actualizado es fundamental. Configura actualizaciones de seguridad
automáticas:

```
# Instala unattended-upgrades
sudo apt install unattended-upgrades apt-listchanges -y

# Configura para que solo actualice seguridad
sudo dpkg-reconfigure -plow unattended-upgrades

# Configura actualizaciones automáticas en /etc/apt/apt.conf.d/50unattended-upgrades
sudo nano /etc/apt/apt.conf.d/50unattended-upgrades
```

Asegúrate de que tenga estas líneas descomentadas:

```
Unattended-Upgrade::Allowed-Origins {
    "${distro_id}:${distro_codename}-security";
};
Unattended-Upgrade::AutoFixInterruptedDpkg "true";
Unattended-Upgrade::Remove-Unused-Dependencies "true";
Unattended-Upgrade::Automatic-Reboot "false";
```

## El Dilema Estratégico: ¿VPS (Self-Hosted) o PaaS?

Después del incidente y de implementar todo este hardening, surge la pregunta
lógica: \_¿Realmente vale la pena todo este mantenimiento?\_

Esta no es una decisión trivial. Implica权衡 (trade-offs) importantes en
términos de tiempo, dinero, seguridad y control. Aquí es donde entra el debate
entre tener tu propio VPS (usando herramientas como **Dokploy** o
**Coolify**) frente a usar plataformas gestionadas como
**Vercel, Railway, Heroku o Render**.

### Opción A: El camino del VPS (Control Total)

Es lo que usamos nosotros en Creapolis para ciertos proyectos grandes donde el
control y la soberanía de datos son críticos.

#### Ventajas Profundas del VPS

1. **Costo Dramáticamente Menor**

- Un VPS de 4 vCPU, 8GB RAM puede costar $20-40/mes

- El mismo rendimiento en Vercel/Railway puede costar $200-500+/mes

- El costo es predecible y no escala con el tráfico (dentro de límites
razonables)

2. **Soberanía y Privacidad de Datos**

- Tus datos están en tu servidor, bajo tu control

- Puedes elegir el país donde está el servidor (GDPR compliance)

- Ninguna plataforma puede acceder a tus datos

- Cumplimiento más fácil con regulaciones de privacidad

3. **Sin Vendor Lock-in**

- Puedes mover tu servidor a cualquier proveedor en cualquier momento

- Tienes acceso completo a archivos, bases de datos, configuraciones

- Tu infraestructura está estandarizada (Docker, Linux, etc.)

4. **Flexibilidad Ilimitada**

- Instala cualquier software, versión o configuración

- Configura puertos personalizados, firewalls específicos

- Usa cualquier stack tecnológico sin restricciones

5. **Educación y Habilidades Valiosas**

- Aprendes DevOps, administración de sistemas, seguridad

- Estas habilidades son muy valoradas en el mercado laboral

- Mejor comprensión de cómo funciona toda la stack

#### Desventajas Significativas del VPS

1. **Responsabilidad Total (y onerosa)**

- Tú eres el administrador de sistemas, sin escapatoria

- Si el servidor se cae a las 3 AM de un domingo, tú lo levantas

- Tú configuras y actualizas el firewall, SSL, backups, monitoreo

- Vulnerabilidades de seguridad son tu problema, no de alguien más

2. **Tiempo de Mantenimiento Sustancial**

- Actualizaciones del sistema: 2-4 horas/mes

- Monitoreo y respuesta a incidentes: 1-2 horas/semana

- Configuración inicial y hardening: 8-20 horas

- Esto es tiempo que no dedicas a desarrollar features

3. **Curva de Aprendizaje Empinada**

- Necesitas aprender Linux, redes, seguridad, Docker, etc.

- Errores de configuración pueden ser desastrosos

- La comunidad de soporte es más fragmentada que en PaaS

4. **Scaling Manual**

- Si tu tráfico aumenta 10x, debes configurar load balancers, múltiples
servidores, etc.

- No hay "magic scaling" como en Vercel/Railway

- Requiere arquitectura más compleja para alta disponibilidad

#### Herramientas que Facilitan el Camino del VPS

Si decides ir por el camino del VPS, estas herramientas son esenciales para no
perder la cabeza:

**Coolify (PaaS Open Source Auto-alojable)**

- Dashboard web para despliegue de aplicaciones

- Integración con GitHub/GitLab/GitBitbucket

- Soporte para bases de datos (PostgreSQL, MySQL, Redis, MongoDB)

- SSL automático con Let's Encrypt

- Backups automáticos a S3-compatible

- **Costo:** $0 (software open source), solo pagas tu VPS

- **Ideal para:** Proyectos que necesitan control total pero con
UX amigable

**Dokploy (Alternativa Moderna)**

- Interfaz más moderna y pulida que Coolify

- Soporte para Docker Compose completo

- Gestión de secrets más robusta

- Mejor documentación y comunidad activa

- **Costo:** $0 (open source)

- **Ideal para:** Equipos que priorizan UX y documentación

**Otros complementos esenciales:**

- **UFW/iptables:** Firewall

- **Fail2Ban/CrowdSec:** Protección contra ataques

- **Nginx/Traefik:** Reverse proxy y load balancing

- **Prometheus + Grafana:** Monitoreo y alertas

- **Portainer:** UI para gestión de Docker

- **Cockpit:** Panel de administración del servidor

### Opción B: El camino del PaaS (Vercel, Netlify, Railway)

Ideal para proyectos donde la velocidad de iteración es más importante que el
costo o el control absoluto de la infraestructura. Es la elección de la
mayoría de startups y proyectos indie.

#### Ventajas Profundas del PaaS

1. **Tiempo de Time-to-Market Casi Nulo**

- "Push to deploy": Haces git push y en minutos está en producción

- Sin configuración de servidores, DNS, SSL, etc.

- Preview environments automáticos para cada PR

- Rollbacks instantáneos con un clic

2. **Seguridad Gestionada por Expertos**

- DDoS protection integrada y a nivel de borde (Cloudflare en muchos casos)

- Actualizaciones de seguridad del sistema y dependencias automáticas

- Protección WAF (Web Application Firewall) incluida

- Penetration testing regular por equipos de seguridad

3. **Scaling Automático y Transparente**

- De 0 a 1,000,000 de requests sin intervención manual

- Cold starts optimizados (especialmente en Vercel)

- Geo-distribution automática (CDN integrado)

- Precio escala con uso, pero la configuración no

4. **Integraciones Premium con Ecosistemas**

- Vercel: Optimización extrema de Next.js, ISR, SSR

- Railway: Bases de datos administradas, CLI robusta

- Netlify: Headless CMS, forms, edge functions

- Render: Blue/Green deployments, PostgreSQL/Redis administrados

5. **Experiencia de Desarrollador Superior**

- Logs agregados y busquedas avanzadas

- Metrics y tracing integrados

- Integraciones con Slack/Discord para alertas

- Entornos de staging/producción separados con un clic

#### Desventajas Significativas del PaaS

1. **Costo Explosivo con Tráfico Alto**

- Vercel: $20/mes base + $40/100GB bandwidth

- Railway: $5/mes por contenedor + uso de CPU/RAM

- Un sitio con 1M visitors/mes puede costar $500-2,000/mes

- El costo es muy difícil de predecir y puede sorprenderte

2. **Vendor Lock-in Real**

- Tus aplicaciones pueden tener código específico de Vercel (Next.js edge
functions)

- Migrar es complejo: APIs de datos, secretos, configuraciones

- Tú depende totalmente de la estabilidad del proveedor

- Si el proveedor aumenta precios, no tienes muchas alternativas

3. **Limitaciones de Configuración**

- No puedes instalar software arbitrario

- Tiempos de ejecución límites (e.g., 60 segundos en Vercel Serverless
Functions)

- Sin acceso directo al sistema operativo

- Configuraciones de networking limitadas

4. **Menor Transparencia**

- No sabes exactamente dónde están tus datos

- Menor control sobre compliance específico

- Audit logs más limitados que en VPS propio

#### Comparativa de Precios (2026)

| Escenario | VPS Self-Hosted (con Coolify) | Vercel | Railway | Heroku |

|-----------|-------------------------------|---------|---------|---------|

| Blog personal (10k visitors/mes) | $5-10/mes | $20/mes | $5/mes | $7/mes |

| SaaS pequeño (100k visitors/mes) | $20-40/mes | $200-400/mes | $100-200/mes
| $150-300/mes |

| Startup en crecimiento (1M visitors/mes) | $100-200/mes | $1,000-2,000/mes |
$500-1,000/mes | $800-1,500/mes |

| Empresa grande (10M+ visitors/mes) | $500-1,000/mes | $10,000+/mes |
$5,000-10,000/mes | $8,000-15,000/mes |

*Nota: Precios aproximados, varían por configuración específica y uso
real*

## Cuándo Elegir Cada Opción: Framework de Decisión

### Elige VPS + Coolify/Dokploy si:

**Factores Técnicos:**

- Tienes experiencia moderada con Linux y administración de sistemas

- Tu aplicación requiere configuraciones específicas no soportadas por PaaS

- Necesitas acceso directo al sistema operativo o bases de datos

- Tu stack tecnológico es altamente personalizado

**Factores de Negocio:**

- El costo es un factor crítico (startup bootstrapped, proyecto indie)

- La privacidad y soberanía de datos son requisitos legales (GDPR, HIPAA,
etc.)

- Tu presupuesto es predecible y limitado

- Estás en un mercado regulado con requisitos de compliance específicos

**Factores de Tráfico:**

- Tienes tráfico predecible y estable

- No esperas picos de tráfico masivos e inesperados

- El tráfico está principalmente en una región geográfica específica

**Factores de Aprendizaje:**

- Quieres aprender DevOps y administración de sistemas

- Tienes tiempo para invertir en configuración y mantenimiento

- Valoras las habilidades que adquieres más que el tiempo ahorrado

### Elige PaaS (Vercel/Railway) si:

**Factores Técnicos:**

- Es tu primer proyecto en producción

- Tu stack es estándar (Next.js, Node.js, Python, Go, etc.)

- No necesitas configuraciones avanzadas de red o sistema operativo

- Prefieres enfocarte en código, no en infraestructura

**Factores de Negocio:**

- El tiempo de time-to-market es crítico (startup en etapa inicial, concurso,
hackathon)

- El presupuesto no es el problema principal

- Necesitas iterar muy rápidamente (experimentación rápida)

- Tienes inversión o financiamiento que cubra costos de infraestructura

**Factores de Tráfico:**

- Tu tráfico es esporádico o altamente impredecible

- Esperas picos de tráfico masivos (viralidad, campañas de marketing)

- Tu tráfico es global (necesitas geo-distribution)

**Factores de Equipo:**

- Tu equipo es pequeño (1-3 personas) y no tiene experiencia en DevOps

- Prefieres invertir tiempo en desarrollo, no en operaciones

- Necesitas features empresariales (SSO, RBAC, audit logs) sin configuración

## Arquitecturas Híbridas: El Mejor de los Dos Mundos

No tienes que elegir uno u otro exclusivamente. Las arquitecturas híbridas
pueden darte lo mejor de ambos mundos:

### Patrón 1: Frontend en PaaS, Backend en VPS

```
graph LR
    A[Frontend en Vercel] -->|HTTPS/API calls| B[Backend en VPS]
    B --> C[(PostgreSQL en VPS)]
    B --> D[(Redis en VPS)]
```

**Ventajas:**

- Frontend: CDN global, caching, edge computing en Vercel

- Backend: Control total de lógica de negocio y bases de datos en VPS

- Costo balanceado: Frontend escala gratis/poco, backend costo predecible

**Use case:** Aplicaciones con frontend estático/dinámico que
consume APIs complejas

### Patrón 2: Desarrollo en PaaS, Producción en VPS

```
graph LR
    A[Dev/Staging en Vercel] -->|Git push| B[Producción en VPS con Coolify]
```

**Ventajas:**

- Desarrollo y testing rápido en PaaS (preview environments)

- Producción con control total y costo menor en VPS

- Equipo puede aprender DevOps gradualmente

**Use case:** Startups que quieren velocidad inicial pero costo
eficiente a largo plazo

### Patrón 3: Core en VPS, Edge Functions en PaaS

```
graph LR
    A[Edge Functions en Vercel] -->|Caché y routing| B[Core App en VPS]
```

**Ventajas:**

- Edge functions para caching, A/B testing, feature flags en Vercel

- Core application y bases de datos con control en VPS

- Óptimo balance de rendimiento y costo

**Use case:** SaaS con features globales que necesitan caching
inteligente

## Herramientas Recomendadas (Evaluación Detallada)

### Para VPS Self-Hosted

**Coolify** ⭐⭐⭐⭐⭐ (5/5)

- **Precio:** Gratis (open source)

- **Dificultad:** Media

- **Ideal para:** Equipos pequeños, proyectos que necesitan PaaS
pero con control

- **Características destacadas:**

- Despliegue desde Git con preview environments

- Soporte para múltiples tipos de bases de datos

- Backups automáticos integrados

- UI intuitiva para gestión de Docker containers

- **Limitaciones:**

- Menos estable que Dokploy (versiones beta frecuentes)

- Documentación fragmentada

**Dokploy** ⭐⭐⭐⭐½ (4.5/5)

- **Precio:** Gratis (open source)

- **Dificultad:** Media

- **Ideal para:** Equipos que priorizan UX y estabilidad

- **Características destacadas:**

- Interfaz más moderna y estable que Coolify

- Mejor gestión de secrets y configuraciones

- Documentación más completa y comunitad activa

- Soporte para Docker Compose avanzado

- **Limitaciones:**

- Menos maduro que Coolify (proyecto más reciente)

- Menor ecosistema de plugins

**UFW (Uncomplicated Firewall)** ⭐⭐⭐⭐⭐ (5/5)

- **Precio:** Gratis (incluido en Ubuntu)

- **Dificultad:** Baja

- **Ideal para:** Firewall básico en servidores Ubuntu

- **Características destacadas:**

- Sintaxis simple y legible

- Integración nativa con Ubuntu

- Configuración de rate limiting fácil

**Fail2Ban** ⭐⭐⭐⭐½ (4.5/5)

- **Precio:** Gratis

- **Dificultad:** Media

- **Ideal para:** Protección contra fuerza bruta clásica

- **Características destacadas:**

- Muy estable y probado en producción

- Comunidad amplia y documentación extensa

- Configuración flexible con jails

- **Limitaciones:**

- No tiene inteligencia colectiva ( CrowdSec sí)

**CrowdSec** ⭐⭐⭐⭐⭐ (5/5)

- **Precio:** Gratis (open source), version enterprise disponible

- **Dificultad:** Media

- **Ideal para:** Protección moderna con inteligencia colectiva

- **Características destacadas:**

- Inteligencia colectiva: IPs atacantes compuestas entre usuarios

- Blocklists preemptivas: banea IPs antes de que te ataquen

- Más moderno y activamente desarrollado

- Puede integrar blocklists premium con datos exclusivos

- **Limitaciones:**

- Curva de aprendizaje mayor que Fail2Ban

- Comunidad más pequeña (pero creciendo rápido)

**Nginx** ⭐⭐⭐⭐½ (4.5/5)

- **Precio:** Gratis

- **Dificultad:** Media-Alta

- **Ideal para:** Reverse proxy, load balancing, serving estático

- **Características destacadas:**

- Muy alto rendimiento

- Configuración flexible y poderosa

- Ecosistema amplio (certbot, etc.)

**Traefik** ⭐⭐⭐⭐⭐ (5/5)

- **Precio:** Gratis

- **Dificultad:** Alta

- **Ideal para:** Arquitecturas microservices, auto-discovery

- **Características destacadas:**

- Auto-discovery de containers Docker

- SSL automático con Let's Encrypt

- Dashboard web para monitoreo

- Configuración dinámica sin reiniciar

- **Limitaciones:**

- Curva de aprendizaje empinada

### Para PaaS

**Vercel** ⭐⭐⭐⭐⭐ (5/5) -
*Recomendado para Frontend/Next.js*

- **Precio:** Gratis (hobby), $20/mes (pro), enterprise
disponible

- **Dificultad:** Muy baja

- **Ideal para:** Frontend, Next.js, React, aplicaciones
serverless

- **Características destacadas:**

- Optimización extrema de Next.js (ISR, SSR, edge)

- CDN global integrada

- Preview environments automáticos

- Integración nativa con Next.js framework

- **Limitaciones:**

- Costo escalado agresivo con bandwidth y serverless functions

- Solo útil para frontend, no para backend complejo

**Railway** ⭐⭐⭐⭐½ (4.5/5) - *Recomendado para Backend*

- **Precio:** $5/mes por servicio (base), enterprise disponible

- **Dificultad:** Baja

- **Ideal para:** Backend, bases de datos, aplicaciones
full-stack

- **Características destacadas:**

- Bases de datos administradas (PostgreSQL, MySQL, Redis, MongoDB)

- CLI robusta para gestión de servicios

- Soporte para Docker containers personalizados

- Monitoreo y logs integrados

- **Limitaciones:**

- Costo por servicio puede ser alto para múltiples microservices

- Menos optimizado para edge computing que Vercel

**Render** ⭐⭐⭐⭐ (4/5) - *Balance Precio/Facilidad*

- **Precio:** Gratis tier disponible, $7/mes por web service

- **Dificultad:** Baja

- **Ideal para:** Aplicaciones balanceadas, equipos bootstrapped

- **Características destacadas:**

- Blue/Green deployments

- PostgreSQL y Redis administrados

- Balance mejor precio/funcionalidad

- Soporte para Docker y runtime nativo

- **Limitaciones:**

- Menos features enterprise que Railway/Vercel

- Menos optimizado para frameworks específicos

**Netlify** ⭐⭐⭐⭐ (4/5) - *Mejor para Sitios Estticos*

- **Precio:** Gratis tier disponible, $19/mes (pro)

- **Dificultad:** Muy baja

- **Ideal para:** Sitios estáticos, JAMstack, headless CMS

- **Características destacadas:**

- Forms y serverless functions integrados

- Headless CMS incluido

- Edge functions potentes

- Optimizado para frameworks estáticos (Hugo, Jekyll, Gatsby)

- **Limitaciones:**

- Menos potente para aplicaciones dinámicas complejas

- Costo por formulario y funciones en plan gratuito

## Conclusión: Nuestra Recomendación Basada en Experiencia Real

El ataque a nuestro servidor fue un recordatorio brutal de que
**la seguridad es un proceso continuo, no una configuración de una sola
vez**. Implementamos todo el hardening que describimos en este artículo, y el
resultado fue un servidor 10x más seguro que antes. Pero esto vino con un
costo: aproximadamente 15-20 horas de configuración inicial + 2-3 horas de
mantenimiento mensual.

**Nuestra recomendación final basada en experiencia real:**

### Si estás en una de estas situaciones, \*\*USA PAAS\*\*:

1. **Es tu primer proyecto en producción:** La curva de
aprendizaje de VPS + security puede ser abrumadora cuando tu objetivo
principal es lanzar y validar

2. **Startup en etapa temprana (seed/pre-seed):** Tu tiempo es
más valioso en features y validación que en optimización de costos de
infraestructura

3. **Proyecto con tráfico viral/esporádico:** Los costos
impredecibles de PaaS son preferibles a configurar autoscaling complejo en VPS

4. **Equipo sin experiencia DevOps:** No te arriesgues a
configuraciones incorrectas que pueden ser desastrosas

5. **Fechas de lanzamiento críticas:** Launches, hackathons, demo
days donde cada segundo cuenta

**Stack recomendado PaaS:**

- Frontend: **Vercel** (para Next.js/React) o
**Netlify** (para sitios estáticos/JAMstack)

- Backend: **Railway** (bases de datos administradas) o
**Render** (balance precio/funcionalidad)

- Costo estimado: $50-200/mes para startup en crecimiento

### Si cumples estas condiciones, \*\*USA VPS + COOLIFY/DOKPLOY\*\*:

1. **Tienes 1-2 años de experiencia en desarrollo:** Ya entiendes
sistemas básicos y estás listo para aprender más

2. **Proyecto con revenue/cashflow estable:** Puedes invertir
tiempo en configuración que pagará dividendos a largo plazo

3. **Startup bootstrapped o indie hacker:** El costo de
infraestructura impacta directamente tu margen

4. **Requisitos de compliance/regulación:** GDPR, HIPAA, SOX
donde la soberanía de datos es legal

5. **Curiosidad genuina por DevOps:** Realmente disfrutas
aprender sobre sistemas, redes, seguridad

6. **Tráfico predecible y regional:** Puedes planificar capacidad
sin necesidad de autoscaling global

**Stack recomendado VPS:**

- Proveedor VPS: **Hetzner** (Europa, mejor precio/rendimiento),
**DigitalOcean** (USA, excelente soporte), o
**IONOS** (si ya tienes infraestructura con ellos)

- Orquestación: **Coolify** (si prefieres más features) o
**Dokploy** (si prefieres mejor UX)

- Seguridad: **CrowdSec** (inteligencia colectiva) +
**UFW** (firewall básico)

- Costo estimado: $20-100/mes para startup en crecimiento

### Nuestra arquitectura híbr recomendada:

Para la mayoría de startups en etapa de crecimiento (Series A/B):

```
Frontend (Next.js) → Vercel ($50-100/mes)
     ↓ API Calls
Backend APIs → VPS con Dokploy ($40-80/mes)
     ↓
PostgreSQL/Redis → En el mismo VPS (incluido en costo VPS)
```

**Costo total:** $90-180/mes vs $500-2,000/mes en PaaS full-stack

**Beneficio:** Velocidad de despliegue PaaS + costo predictible
de VPS + control total de datos sensibles

**Consejo final:** No te paralices tratando de elegir la opción
"perfecta". Empieza con PaaS para lanzar rápido, y cuando tu startup tenga
validación y cashflow, migra gradualmente a VPS para componentes críticos. La
seguridad que implementamos en este artículo es el estándar mínimo para
cualquier VPS en producción, independientemente de tu elección final.

Y, por favor, **¡cierra ese puerto 22!**

## Recursos Adicionales y Lectura Profunda

### Documentación Oficial

-
[Guía oficial de Ubuntu sobre UFW](https://ubuntu.com/server/docs/security-firewall)
- Configuración paso a paso de firewall

-
[Documentación de Fail2Ban](https://fail2ban.readthedocs.io/)
- Jails, filters, configuración avanzada

-
[Documentación de CrowdSec](https://doc.crowdsec.net/)
- Instalación, configuración, integración con blocklists

-
[Coolify Docs](https://coolify.io/docs)
- Guía completa de instalación y uso

-
[Dokploy Documentation](https://dokploy.com/docs)
- Instalación y configuración

### Guías de Hardening Avanzado

-
[SSH Hardening Guides - sshaudit.com](https://www.sshaudit.com/hardening_guides.html)
- Las guías más completas para SSH hardening

-
[Docker Engine Security](https://docs.docker.com/engine/security/)
- Seguridad profunda de Docker

-
[CIS Ubuntu Linux Benchmark](https://www.cisecurity.org/benchmark/ubuntu_linux)
- Estándar de seguridad empresarial

-
[NIST Cybersecurity Framework](https://www.nist.gov/cyberframework)
- Framework de seguridad recomendado

### Herramientas de Monitoreo y Seguridad

-
[Portainer](https://www.portainer.io/)
- UI gratuita para gestión de Docker

-
[Cockpit](https://cockpit-project.org/)
- Panel de administración web del servidor

-
[Grafana + Prometheus](https://grafana.com/grafana/)
- Monitoreo y alertas avanzado

-
[Nessus](https://www.tenable.com/products/nessus)
- Escáner de vulnerabilidades (gratuito hasta 16 IPs)

-
[Lynis](https://cisofy.com/lynis/)
- Auditoría de seguridad del sistema

### Comunidades y Soporte

-
[r/selfhosted en Reddit](https://reddit.com/r/selfhosted/)
- Comunidad de self-hosting

-
[r/devops en Reddit](https://reddit.com/r/devops/)
- Discusiones de DevOps

-
[Server Fault](https://serverfault.com/)
- Q&A para administración de sistemas (Stack Exchange)

-
[CrowdSec Discord](https://discord.gg/crowdsec)
- Soporte directo de CrowdSec

## Ruta de Aprendizaje: De Principiante a Experto

### Nivel 1: Principiante (1-2 meses)

**Objetivo:** Entender despliegues básicos sin configuración de
infraestructura

- Empieza con Vercel/Railway para entender CI/CD básico

- Deploy un proyecto simple (blog, portfolio, landing page)

- Aprende conceptos básicos: frontend, backend, base de datos, API

- Familiarízate con git, GitHub/GitLab workflows

**Proyecto:** Deploy un blog simple con Next.js y Railway

### Nivel 2: Intermedio (3-6 meses)

**Objetivo:** Configurar un VPS básico y entender networking

- Compra un VPS barato ($5-10/mes en DigitalOcean/Hetzner)

- Configura un servidor Ubuntu básico

- Instala Docker y deploy contenedores simples

- Aprende comandos esenciales de Linux: ls, cd, grep, cat, chmod, chown

- Entiende conceptos básicos: DNS, puertos, firewall

**Proyecto:** Deploy una API REST simple en Docker en tu VPS

### Nivel 3: Avanzado (6-12 meses)

**Objetivo:** Implementar seguridad y orquestación profesional

- Instala Coolify/Dokploy en tu VPS

- Configura UFW firewall con reglas específicas

- Implementa Fail2Ban o CrowdSec

- Genera llaves SSH y deshabilita autenticación por contraseña

- Configura SSL automático con Let's Encrypt

- Implementa backups automáticos (rsync, rclone, etc.)

**Proyecto:** Migrar un proyecto desde PaaS a VPS con Coolify

### Nivel 4: Experto (12-24+ meses)

**Objetivo:** Arquitectura empresarial y alta disponibilidad

- Configura monitoreo con Prometheus + Grafana

- Implementa alertas (email, Slack, PagerDuty)

- Configura load balancing con Nginx/Traefik

- Implementa múltiples servidores y auto-discovery

- Configura blue/green deployments y canary releases

- Implementa seguridad avanzada: SELinux/AppArmor, intrusion detection

- Optimiza rendimiento: caching, CDN, edge computing

**Proyecto:** Arquitectura multi-servidor con HA y auto-scaling

## Desafío Práctico: Tu Tarea Para Esta Semana

No te quedes solo leyendo. Implementa al menos 3 de estas tareas esta semana:

1. **Auditoría de Puertos SSH:** Si ya tienes un VPS, verifica
que el puerto SSH NO sea el 22. Si lo es, cámbialo inmediatamente

2. **Generación de Llaves SSH:** Genera llaves ED25519 en tu
máquina local, copia la llave pública a tu servidor y deshabilita el acceso
por contraseña

3. **Instalación de Protección Anti-Fuerza Bruta:** Instala
Fail2Ban o CrowdSec en tu servidor. Configura al menos 1 jail para SSH

4. **Configuración de Firewall:** Configura UFW para permitir
solo puertos necesarios. Usa `sudo ufw status verbose` para verificar

5. **Prueba de Infiltración:** Instala Lynis (`sudo apt install
lynis`) y ejecuta `sudo lynis audit system`. Tu meta: llegar al menos a 60-70
de seguridad

**Bonus - Comparte tu experiencia:**

1. Crea un repositorio en GitHub con tu configuración de hardening (sin
secrets ni contraseñas reales)

2. Escribe un tweet/post sobre qué herramienta elegiste (Coolify vs Dokploy vs
Vercel) y por qué

3. Si aprendiste algo nuevo, comparte esta guía con otros desarrolladores que
puedan estar en la misma situación

Recuerda:
**La seguridad de tus servidores es tu responsabilidad como desarrollador.
Los atacantes no descansan, y tú tampoco deberías hacerlo cuando se trata de
proteger tu trabajo.**

## Preguntas frecuentes (FAQ)

### 1. ¿Qué es el hardening VPS y por qué es importante?

El **hardening VPS** son las acciones para reducir la superficie
de ataque de un servidor: deshabilitar servicios innecesarios, forzar
autenticación por llave, configurar firewall, aplicar actualizaciones y
habilitar monitoreo y alertas. Es la base para evitar accesos no autorizados y
reducir impacto en caso de incidentes.

### 2. ¿Cómo genero y uso llaves SSH de forma segura?

Genera un par de llaves ED25519 con `ssh-keygen -t ed25519`, añade
la pública a `~/.ssh/authorized_keys` del servidor y deshabilita la
autenticación por contraseña en `/etc/ssh/sshd_config` con
`PasswordAuthentication no`. Mantén la llave privada con permisos
600 y protégela con passphrase.

### 3. ¿Cómo instalo y configuro Fail2Ban o CrowdSec rápido?

En Ubuntu: `sudo apt install fail2ban`. Crea un archivo local
`/etc/fail2ban/jail.d/ssh.local` con reglas básicas para proteger
SSH y reinicia `sudo systemctl restart fail2ban`. CrowdSec ofrece
más inteligencia colaborativa; sigue su guía oficial para instalar y habilitar
parsers y bouncers.

### 4. ¿Cómo asegurar mis backups y planes de recuperación?

Automatiza backups fuera del servidor (S3, Backblaze, Google Drive via
rclone). Encripta backups en tránsito y en reposo, prueba restauraciones
periódicas, y documenta un runbook de recovery con pasos claros y contactos de
emergencia.

### 5. ¿Self-hosting o PaaS: cuál elegir?

Elige PaaS si quieres minimizar responsabilidad operativa y no puedes mantener
seguridad/monitoring constante. Elige self-hosting si necesitas control,
optimización de costes a largo plazo o requisitos especiales. Para muchos
equipos, la opción híbrida (servicios gestionados para infra crítica + VPS
para control específico) es la mejor.

---

**¿Este artículo te fue útil?** Si quieres que profundicemos en
algún tema específico (configuración de Docker Swarm, Kubernetes, seguridad
avanzada de bases de datos, etc.), déjalo en los comentarios. En Creapolis,
creemos que compartir experiencias reales es la mejor forma de aprender y
mejorar como comunidad de desarrolladores.
