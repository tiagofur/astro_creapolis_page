# syntax=docker/dockerfile:1.7

# ---------- Build stage ----------
FROM golang:1.26-alpine AS builder

# ca-certificates for HTTPS, git for go mod if needed
RUN apk add --no-cache ca-certificates git

WORKDIR /src

# Copy all source first (go.sum tracked in the repo is intentionally minimal,
# so we regenerate it here after everything is in place).
COPY . .

# Resolve dependencies and (re)generate go.sum for the MySQL driver.
# Running tidy AFTER the full COPY avoids having the full-source copy
# overwrite an already-regenerated go.sum layer.
RUN go mod tidy

# Build a fully static binary (no libc dependency → works on scratch/distroless)
# CGO_ENABLED=0 is important because the MySQL driver is pure Go.
RUN CGO_ENABLED=0 GOOS=linux go build \
    -ldflags="-s -w" \
    -trimpath \
    -o /out/server \
    .

# ---------- Runtime stage ----------
FROM alpine:3.20

# ca-certificates for TLS to SMTP/DB; tzdata so time.Local works
RUN apk add --no-cache ca-certificates tzdata && \
    addgroup -S app && adduser -S -G app app

WORKDIR /app
COPY --from=builder /out/server /app/server

# Run as non-root
USER app

# The Go server listens on $PORT (default 3000)
ENV PORT=3000
EXPOSE 3000

# Lightweight healthcheck — hits the root endpoint
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
    CMD wget -qO- http://127.0.0.1:${PORT}/ >/dev/null 2>&1 || exit 1

ENTRYPOINT ["/app/server"]
