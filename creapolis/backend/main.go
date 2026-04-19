package main

import (
	"context"
	"encoding/json"
	"log"
	"net/http"
	"os"
	"strconv"
	"sync"
	"time"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"
	"github.com/jackc/pgx/v5"
)

type ContactRequest struct {
	Name      string `json:"name"`
	Email     string `json:"email"`
	Company   string `json:"company"`
	Message   string `json:"message"`
	Website   string `json:"website"` // Honeypot
	Timestamp string `json:"timestamp"`
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
var db *pgx.Conn

func initDB() error {
	connStr := os.Getenv("DATABASE_URL")
	if connStr == "" {
		connStr = "postgres://postgres:postgres@localhost:5432/creapolis?sslmode=disable"
	}

	var err error
	db, err = pgx.Connect(context.Background(), connStr)
	if err != nil {
		return err
	}

	// Create table if not exists
	_, err = db.Exec(context.Background(), `
		CREATE TABLE IF NOT EXISTS contacts (
			id SERIAL PRIMARY KEY,
			name VARCHAR(255) NOT NULL,
			email VARCHAR(255) NOT NULL,
			company VARCHAR(255),
			message TEXT NOT NULL,
			created_at TIMESTAMP DEFAULT NOW()
		)
	`)
	return err
}

func saveContact(c *Contact) error {
	_, err := db.Exec(context.Background(),
		"INSERT INTO contacts (name, email, company, message) VALUES ($1, $2, $3, $4)",
		c.Name, c.Email, c.Company, c.Message)
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

	// CORS - add your production domain here
	r.Use(cors.Handler(cors.Options{
		AllowedOrigins: []string{
			"http://localhost:4321",
			"http://localhost:3000",
			"https://creapolis.dev",
		},
		AllowedMethods: []string{"GET", "POST", "OPTIONS"},
		AllowedHeaders: []string{"Content-Type"},
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
		respond(w, false, "Invalid request body")
		return
	}

	// Honeypot check
	if req.Website != "" {
		respond(w, true, "Thank you! We'll get back to you soon.")
		return
	}

	// Timestamp validation
	if req.Timestamp != "" {
		ts, err := strconv.ParseInt(req.Timestamp, 10, 64)
		if err == nil {
			elapsed := time.Now().UnixMilli() - ts
			if elapsed < 2000 {
				respond(w, false, "Please wait a moment before submitting.")
				return
			}
		}
	}

	// Validation
	if req.Name == "" {
		respond(w, false, "Name is required")
		return
	}
	if req.Email == "" {
		respond(w, false, "Email is required")
		return
	}
	if req.Message == "" {
		respond(w, false, "Message is required")
		return
	}
	if !isValidEmail(req.Email) {
		respond(w, false, "Invalid email format")
		return
	}

	// Save to database
	contact := &Contact{
		Name:    req.Name,
		Email:   req.Email,
		Company: req.Company,
		Message: req.Message,
	}

	if db != nil {
		if err := saveContact(contact); err != nil {
			log.Printf("Error saving contact: %v", err)
		} else {
			log.Printf("Contact saved to database: %s (%s)", contact.Name, contact.Email)
		}
	} else {
		log.Printf("New contact (no DB): %s (%s): %s", req.Name, req.Email, req.Message)
	}

	// Send email notification (for production, use SendGrid, AWS SES, etc.)
	sendEmailNotification(contact)

	respond(w, true, "Thank you! We'll get back to you soon.")
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

// sendEmailNotification sends email notification about new contact
// For production, integrate with SendGrid, AWS SES, Mailgun, etc.
func sendEmailNotification(c *Contact) {
	// TODO: Implement email sending in production
	// Example with SendGrid:
	// sg := sendgrid.NewSendGridClient(apiKey)
	// message := sendgrid.NewMessage()
	// message.AddTo("hola@creapolis.dev")
	// message.SetSubject("Nuevo contacto desde la web")
	// message.SetHTML(fmt.Sprintf("Nuevo contacto: %s<br>Email: %s<br>Empresa: %s<br>Mensaje: %s", c.Name, c.Email, c.Company, c.Message))
	// sg.Send(message)

	log.Printf("EMAIL would be sent to hola@creapolis.dev:")
	log.Printf("  Subject: Nuevo contacto desde la web")
	log.Printf("  From: %s", c.Email)
	log.Printf("  Name: %s", c.Name)
	log.Printf("  Company: %s", c.Company)
	log.Printf("  Message: %s", c.Message)
}

func respond(w http.ResponseWriter, success bool, message string) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(ContactResponse{
		Success: success,
		Message: message,
	})
}
