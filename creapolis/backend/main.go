package main

import (
	"crypto/tls"
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"net/mail"
	"net/smtp"
	"os"
	"strconv"
	"strings"
	"sync"
	"time"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"
	_ "github.com/go-sql-driver/mysql"
)

type ContactRequest struct {
	Name      string `json:"name"`
	Email     string `json:"email"`
	Company   string `json:"company"`
	Type      string `json:"type"`    // App móvil, Web, etc. (contacto.astro)
	Budget    string `json:"budget"`  // Rango de presupuesto (contacto.astro)
	Service   string `json:"service"` // Servicio seleccionado (servicios.astro)
	Message   string `json:"message"`
	Website   string `json:"website"`   // Honeypot
	Timestamp string `json:"timestamp"` // Anti-bot
}

type ContactResponse struct {
	Success bool   `json:"success"`
	Message string `json:"message"`
}

type Contact struct {
	ID        int       `json:"id"`
	Name      string    `json:"name"`
	Email     string    `json:"email"`
	Company   string    `json:"company"`
	Type      string    `json:"type"`
	Budget    string    `json:"budget"`
	Service   string    `json:"service"`
	Message   string    `json:"message"`
	CreatedAt time.Time `json:"created_at"`
}

// Rate limiter
type RateLimiter struct {
	mu       sync.Mutex
	requests map[string][]time.Time
	limit    int
	window   time.Duration
}

func NewRateLimiter(limit int, window time.Duration) *RateLimiter {
	return &RateLimiter{
		requests: make(map[string][]time.Time),
		limit:    limit,
		window:   window,
	}
}

func (rl *RateLimiter) Allow(ip string) bool {
	rl.mu.Lock()
	defer rl.mu.Unlock()

	now := time.Now()
	cutoff := now.Add(-rl.window)

	var valid []time.Time
	for _, t := range rl.requests[ip] {
		if t.After(cutoff) {
			valid = append(valid, t)
		}
	}

	if len(valid) >= rl.limit {
		rl.requests[ip] = valid
		return false
	}

	rl.requests[ip] = append(valid, now)
	return true
}

// Database
var db *sql.DB

func initDB() error {
	connStr := os.Getenv("DATABASE_URL")
	if connStr == "" {
		// Default DSN para desarrollo local (MariaDB/MySQL)
		// Formato: user:pass@tcp(host:port)/dbname?params
		connStr = "creapolis:creapolis@tcp(localhost:3306)/creapolis_dev?parseTime=true&charset=utf8mb4&loc=Local"
	}

	var err error
	db, err = sql.Open("mysql", connStr)
	if err != nil {
		return err
	}

	// Verify connection
	if err = db.Ping(); err != nil {
		return err
	}

	// Sensible connection pool defaults
	db.SetMaxOpenConns(10)
	db.SetMaxIdleConns(5)
	db.SetConnMaxLifetime(5 * time.Minute)

	// Create table if not exists
	_, err = db.Exec(`
		CREATE TABLE IF NOT EXISTS contacts (
			id INT AUTO_INCREMENT PRIMARY KEY,
			name VARCHAR(255) NOT NULL,
			email VARCHAR(255) NOT NULL,
			company VARCHAR(255),
			type VARCHAR(100),
			budget VARCHAR(100),
			service VARCHAR(100),
			message TEXT NOT NULL,
			created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
		) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
	`)
	return err
}

func saveContact(c *Contact) error {
	_, err := db.Exec(
		"INSERT INTO contacts (name, email, company, type, budget, service, message) VALUES (?, ?, ?, ?, ?, ?, ?)",
		c.Name, c.Email, c.Company, c.Type, c.Budget, c.Service, c.Message)
	return err
}

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "3000"
	}

	// Initialize DB
	if err := initDB(); err != nil {
		log.Printf("Warning: Could not connect to database: %v", err)
		log.Printf("Running without database - submissions will be logged only")
	} else {
		log.Printf("Database connected successfully")
	}

	rateLimiter := NewRateLimiter(5, time.Minute)

	r := chi.NewRouter()

	// CORS
	r.Use(cors.Handler(cors.Options{
		AllowedOrigins: []string{
			"http://localhost:4321",
			"http://localhost:3000",
			"https://creapolis.dev",
			"https://www.creapolis.dev",
		},
		AllowedMethods:   []string{"GET", "POST", "OPTIONS"},
		AllowedHeaders:   []string{"Content-Type"},
		AllowCredentials: false,
		MaxAge:           300,
	}))

	// Middleware
	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)
	r.Use(middleware.Timeout(60 * time.Second))

	// Rate limiting
	r.Use(func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			ip := r.RemoteAddr
			if !rateLimiter.Allow(ip) {
				respond(w, false, "Too many requests. Please try again later.")
				return
			}
			next.ServeHTTP(w, r)
		})
	})

	// Routes
	r.Get("/", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("Creapolis Contact API"))
	})

	r.Post("/api/contact", handleContact)

	log.Printf("Server starting on port %s\n", port)
	log.Fatal(http.ListenAndServe(":"+port, r))
}

func handleContact(w http.ResponseWriter, r *http.Request) {
	var req ContactRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		respond(w, false, "Cuerpo de la petición inválido")
		return
	}

	// Honeypot check
	if req.Website != "" {
		respond(w, true, "¡Recibido! Te escribimos pronto.")
		return
	}

	// Timestamp validation
	if req.Timestamp != "" {
		ts, err := strconv.ParseInt(req.Timestamp, 10, 64)
		if err == nil {
			elapsed := time.Now().UnixMilli() - ts
			if elapsed < 2000 {
				respond(w, false, "Esperá un momento antes de enviar.")
				return
			}
		}
	}

	// Validation
	if req.Name == "" {
		respond(w, false, "El nombre es obligatorio")
		return
	}
	if req.Email == "" {
		respond(w, false, "El email es obligatorio")
		return
	}
	if req.Message == "" {
		respond(w, false, "El mensaje es obligatorio")
		return
	}
	if !isValidEmail(req.Email) {
		respond(w, false, "Formato de email inválido")
		return
	}

	// Save to database
	contact := &Contact{
		Name:    req.Name,
		Email:   req.Email,
		Company: req.Company,
		Type:    req.Type,
		Budget:  req.Budget,
		Service: req.Service,
		Message: req.Message,
	}

	if db != nil {
		if err := saveContact(contact); err != nil {
			log.Printf("Error saving contact: %v", err)
		} else {
			log.Printf("Contact saved: %s (%s) [type=%s budget=%s service=%s]",
				contact.Name, contact.Email, contact.Type, contact.Budget, contact.Service)
		}
	} else {
		log.Printf("New contact (no DB): %s (%s) [type=%s budget=%s service=%s]: %s",
			req.Name, req.Email, req.Type, req.Budget, req.Service, req.Message)
	}

	// Send email notification
	sendEmailNotification(contact)

	respond(w, true, "¡Recibido! Te respondo en menos de 24 horas.")
}

func isValidEmail(email string) bool {
	if len(email) < 3 || len(email) > 254 {
		return false
	}
	atIndex := -1
	dotAfterAt := false
	for i, c := range email {
		if c == '@' {
			if atIndex != -1 || i == 0 {
				return false
			}
			atIndex = i
		} else if c == '.' && atIndex != -1 {
			dotAfterAt = true
		}
	}
	return atIndex > 0 && dotAfterAt
}

// sendEmailNotification sends email via SMTP (IONOS or any provider)
func sendEmailNotification(c *Contact) {
	smtpHost := os.Getenv("SMTP_HOST")
	smtpPort := os.Getenv("SMTP_PORT")
	smtpUser := os.Getenv("SMTP_USER")
	smtpPass := os.Getenv("SMTP_PASS")
	toEmail := os.Getenv("NOTIFY_EMAIL")

	// If SMTP is not configured, log only
	if smtpHost == "" || smtpUser == "" || smtpPass == "" {
		log.Printf("EMAIL (no SMTP configured): Nuevo contacto:")
		log.Printf("  Nombre: %s | Email: %s | Empresa: %s", c.Name, c.Email, c.Company)
		log.Printf("  Tipo: %s | Presupuesto: %s | Servicio: %s", c.Type, c.Budget, c.Service)
		log.Printf("  Mensaje: %s", c.Message)
		return
	}

	if toEmail == "" {
		toEmail = smtpUser // Send to self if no notify email set
	}

	// Build email body
	var body strings.Builder
	body.WriteString(fmt.Sprintf("Nuevo contacto desde creapolis.dev\n"))
	body.WriteString(fmt.Sprintf("══════════════════════════════════\n\n"))
	body.WriteString(fmt.Sprintf("Nombre:   %s\n", c.Name))
	body.WriteString(fmt.Sprintf("Email:    %s\n", c.Email))
	if c.Company != "" {
		body.WriteString(fmt.Sprintf("Empresa:  %s\n", c.Company))
	}
	if c.Type != "" {
		body.WriteString(fmt.Sprintf("Tipo:     %s\n", c.Type))
	}
	if c.Budget != "" {
		body.WriteString(fmt.Sprintf("Budget:   %s\n", c.Budget))
	}
	if c.Service != "" {
		body.WriteString(fmt.Sprintf("Servicio: %s\n", c.Service))
	}
	body.WriteString(fmt.Sprintf("\nMensaje:\n%s\n", c.Message))

	subject := fmt.Sprintf("Nuevo contacto: %s", c.Name)
	from := mail.Address{Name: "Creapolis Web", Address: smtpUser}
	to := mail.Address{Name: "", Address: toEmail}

	// Build RFC 2822 message
	headers := make(map[string]string)
	headers["From"] = from.String()
	headers["To"] = to.String()
	headers["Subject"] = subject
	headers["MIME-Version"] = "1.0"
	headers["Content-Type"] = "text/plain; charset=\"utf-8\""
	headers["Date"] = time.Now().Format(time.RFC1123Z)

	var msg strings.Builder
	for k, v := range headers {
		msg.WriteString(fmt.Sprintf("%s: %s\r\n", k, v))
	}
	msg.WriteString("\r\n")
	msg.WriteString(body.String())

	// Connect and send
	addr := fmt.Sprintf("%s:%s", smtpHost, smtpPort)
	auth := smtp.PlainAuth("", smtpUser, smtpPass, smtpHost)

	var err error
	if smtpPort == "465" {
		// Implicit TLS (IONOS uses port 465)
		err = sendMailTLS(addr, auth, from.Address, []string{to.Address}, []byte(msg.String()))
	} else {
		// STARTTLS (port 587)
		err = smtp.SendMail(addr, auth, from.Address, []string{to.Address}, []byte(msg.String()))
	}

	if err != nil {
		log.Printf("EMAIL error sending: %v", err)
	} else {
		log.Printf("EMAIL sent to %s: Nuevo contacto de %s", toEmail, c.Name)
	}
}

// sendMailTLS sends email via implicit TLS (port 465)
func sendMailTLS(addr string, auth smtp.Auth, from string, to []string, msg []byte) error {
	host := strings.Split(addr, ":")[0]
	tlsConfig := &tls.Config{ServerName: host}

	conn, err := tls.Dial("tcp", addr, tlsConfig)
	if err != nil {
		return fmt.Errorf("tls dial: %w", err)
	}
	defer conn.Close()

	client, err := smtp.NewClient(conn, host)
	if err != nil {
		return fmt.Errorf("smtp client: %w", err)
	}
	defer client.Close()

	if err = client.Auth(auth); err != nil {
		return fmt.Errorf("auth: %w", err)
	}
	if err = client.Mail(from); err != nil {
		return fmt.Errorf("mail from: %w", err)
	}
	for _, rcpt := range to {
		if err = client.Rcpt(rcpt); err != nil {
			return fmt.Errorf("rcpt to: %w", err)
		}
	}
	w, err := client.Data()
	if err != nil {
		return fmt.Errorf("data: %w", err)
	}
	if _, err = w.Write(msg); err != nil {
		return fmt.Errorf("write: %w", err)
	}
	return w.Close()
}

func respond(w http.ResponseWriter, success bool, message string) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(ContactResponse{
		Success: success,
		Message: message,
	})
}
