# Backend — Contact Form API

## Go + Chi router + PostgreSQL

Servidor en Go para recibir submissions del formulario de contacto con protección anti-spam.

## Features

- ✅ Honeypot (campo invisible para bots)
- ✅ Rate limiting (5 req/min por IP)
- ✅ Timestamp challenge (anti-bot rápido)
- ✅ Validación de email
- ✅ Guardar en PostgreSQL
- ✅ Email notifications (logs en desarrollo)

## Correr

```bash
cd backend
./server
```

El servidor corre en `http://localhost:3000`

## Environment Variables

```bash
PORT=3000
DATABASE_URL=postgres://user:pass@localhost:5432/creapolis?sslmode=disable
```

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

Para producción:

1. **Database** — Configurar `DATABASE_URL` con tu PostgreSQL
2. **CORS** — Actualizar dominios permitidos en `main.go`
3. **Email** — Implementar `sendEmailNotification()` con SendGrid/AWS SES
4. **HTTPS** — Usar nginx con TLS o deploy en servicio con SSL

## Estructura

```
backend/
├── main.go      # Servidor
├── go.mod       # Dependencias
├── go.sum       # Checksums
└── server       # Binario compilado
```