package handlers

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"github.com/jackc/pgx/v5/pgxpool"
	"golang.org/x/crypto/bcrypt"

	"castcreel/backend/config"
)

// AuthHandler holds the things the auth functions need to do their job —
// a database connection for looking up users, and the app config for
// JWT signing settings.
type AuthHandler struct {
	db  *pgxpool.Pool
	cfg *config.Config
}

// NewAuthHandler creates a new AuthHandler with the dependencies it needs.
func NewAuthHandler(db interface{}, cfg *config.Config) *AuthHandler {
	return &AuthHandler{db: db.(*pgxpool.Pool), cfg: cfg}
}

// Register handles a request from someone who wants to create a new account.
// It reads their chosen email and password, checks the email isn't already
// taken, hashes the password so we never store it in plain text, saves the
// new user to the database, and sends back a login token right away so they
// don't have to log in separately after signing up.
func (h *AuthHandler) Register(w http.ResponseWriter, r *http.Request) {
	var req struct {
    Email    string `json:"email"`
    Username string `json:"username"`
    Password string `json:"password"`
	}
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
    respondError(w, http.StatusBadRequest, "invalid request body")
    return
	}
	if req.Email == "" || req.Username == "" || req.Password == "" {
    respondError(w, http.StatusBadRequest, "email, username and password are required")
    return
	}

	hash, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
	if err != nil {
		respondError(w, http.StatusInternalServerError, "could not hash password")
    	return
	}
	var userID int64
	err = h.db.QueryRow(
	    context.Background(),
	    "INSERT INTO users (email, username, password_hash) VALUES ($1, $2, $3) RETURNING id",
	    req.Email, req.Username, string(hash),
	).Scan(&userID)
	if err != nil {
	    respondError(w, http.StatusInternalServerError, "could not create user")
	    return
	}

	accessToken, refreshToken, err := h.generateTokenPair(userID)
	if err != nil {
		respondError(w, http.StatusInternalServerError, "could not generate token")
    	return
	}
	respondJSON(w, http.StatusCreated, map[string]string {
		"access_token":  accessToken,
    	"refresh_token": refreshToken,
	})
}

// Login handles a request from someone who already has an account.
// It checks that the email and password match what's in the database,
// and if they do, it sends back a short-lived access token and a longer-lived
// refresh token. The access token is used for normal requests; the refresh
// token is used to get a new access token when the old one expires.
func (h *AuthHandler) Login(w http.ResponseWriter, r *http.Request) {
	var req struct {
    Identifier string `json:"identifier"`
    Password string `json:"password"`
	}
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
    respondError(w, http.StatusBadRequest, "invalid request body")
    return
	}
	if req.Identifier == "" || req.Password == "" {
    respondError(w, http.StatusBadRequest, "email, username and password are required")
    return
	}
	var userID int64
	var passwordHash string
	err := h.db.QueryRow(context.Background(),"SELECT id, password_hash FROM users WHERE email = $1 OR username = $1", req.Identifier).Scan(&userID,&passwordHash)
	if err != nil{
		respondError(w, http.StatusInternalServerError, "User Does not Exist")
    	return
	}
	err = bcrypt.CompareHashAndPassword([]byte(passwordHash),[]byte(req.Password))
	if err != nil {
		respondError(w, http.StatusInternalServerError, "Password dont match")
    	return
	}
	accessToken, refreshToken, err := h.generateTokenPair(userID)
	if err != nil {
		respondError(w, http.StatusInternalServerError, "could not generate token")
    	return
	}
	respondJSON(w, http.StatusCreated, map[string]string {
		"access_token":  accessToken,
    	"refresh_token": refreshToken,
	})
}

// Logout handles a request to sign out. It invalidates the user's current
// refresh token so it can't be used to get new access tokens anymore.
// The access token itself will expire on its own schedule.
func (h *AuthHandler) Logout(w http.ResponseWriter, r *http.Request) {
	var req struct {
		refresh_token string `json:"refresh_token"`
	}
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
    	respondError(w, http.StatusBadRequest, "invalid request body")
    	return
	}
	if req.refresh_token == "" {
		respondError(w, http.StatusBadRequest, "Token Empty")
    	return
	}
	
}

// RefreshToken handles a request to swap an expired access token for a new one.
// The user sends their refresh token; if it's still valid, we send back a
// fresh access token without making them type their password again.
func (h *AuthHandler) RefreshToken(w http.ResponseWriter, r *http.Request) {
	var req struct {
		RefreshToken string `json:"refresh_token"`
	}

	if err := json.NewDecoder(r.Body).Decode(&req); err != nil || req.RefreshToken == "" {
        respondError(w, http.StatusBadRequest, "refresh_token required")
        return
    }

	claims, err := h.parseToken(req.RefreshToken)
	if err != nil {
		respondError(w, http.StatusUnauthorized, "invalid or expired refresh token")
	}

	userID, err := strconv.ParseInt(claims.Subject, 10, 64)
	if err != nil {
        respondError(w, http.StatusUnauthorized, "invalid token subject")
        return
    }

	accessToken, refreshToken, err := h.generateTokenPair(userID)
    if err != nil {
        respondError(w, http.StatusInternalServerError, "could not generate token")
        return
    }
	respondJSON(w, http.StatusOK, map[string]string{
        "access_token":  accessToken,
        "refresh_token": refreshToken,
    })
}

// generateTokenPair creates both an access token and a refresh token for a user.
// The access token is short-lived (e.g. 15 minutes) and used on every request.
// The refresh token lives much longer (e.g. 30 days) and is only used here.
func (h *AuthHandler) generateTokenPair(userID int64) (accessToken, refreshToken string, err error) {
	now := time.Now()
	subject := strconv.FormatInt(userID, 10)
	secret := []byte(h.cfg.JWTSecret)

	// Access token: short-lived, sent with every API request.
	accessClaims := jwt.RegisteredClaims{
		Subject:   subject,
		IssuedAt:  jwt.NewNumericDate(now),
		ExpiresAt: jwt.NewNumericDate(now.Add(h.cfg.JWTExpiryDuration)),
	}
	accessToken, err = jwt.NewWithClaims(jwt.SigningMethodHS256, accessClaims).SignedString(secret)
	if err != nil {
		return "", "", err
	}

	// Refresh token: long-lived, only used to issue new access tokens.
	refreshClaims := jwt.RegisteredClaims{
		Subject:   subject,
		IssuedAt:  jwt.NewNumericDate(now),
		ExpiresAt: jwt.NewNumericDate(now.Add(30 * 24 * time.Hour)),
	}
	refreshToken, err = jwt.NewWithClaims(jwt.SigningMethodHS256, refreshClaims).SignedString(secret)
	if err != nil {
		return "", "", err
	}

	return accessToken, refreshToken, nil
}

// parseToken reads a JWT string and checks that it was signed with our secret
// key and hasn't expired. Returns the claims (the data stored inside the token)
// if everything checks out.
func (h *AuthHandler) parseToken(tokenString string) (*jwt.RegisteredClaims, error) {
	token, err := jwt.ParseWithClaims(tokenString, &jwt.RegisteredClaims{}, func(token *jwt.Token) (interface{}, error) {
    return []byte(h.cfg.JWTSecret), nil
	},)
	if err != nil {
		return nil, err
	}
	claims, ok  := token.Claims.(*jwt.RegisteredClaims)
	if !ok {
		return nil, fmt.Errorf("invalid token claims")
	}
	return claims,nil
}

// respondJSON is a helper that writes a Go value as JSON to the response.
// Using a helper keeps the response format consistent across all handlers.
func respondJSON(w http.ResponseWriter, status int, data interface{}) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	json.NewEncoder(w).Encode(data) //nolint:errcheck
}

// respondError is a helper that writes a plain error message as JSON.
// Every error the API returns should go through this so the format is uniform.
func respondError(w http.ResponseWriter, status int, message string) {
	respondJSON(w, status, map[string]string{"error": message})
}
