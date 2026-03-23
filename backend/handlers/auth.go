package handlers

import (
	"encoding/json"
	"net/http"

	"github.com/golang-jwt/jwt/v5"

	"castcreel/backend/config"
)

// AuthHandler holds the things the auth functions need to do their job —
// a database connection for looking up users, and the app config for
// JWT signing settings.
type AuthHandler struct {
	db  interface{} // will be *pgxpool.Pool once implemented
	cfg *config.Config
}

// NewAuthHandler creates a new AuthHandler with the dependencies it needs.
func NewAuthHandler(db interface{}, cfg *config.Config) *AuthHandler {
	return &AuthHandler{db: db, cfg: cfg}
}

// Register handles a request from someone who wants to create a new account.
// It reads their chosen email and password, checks the email isn't already
// taken, hashes the password so we never store it in plain text, saves the
// new user to the database, and sends back a login token right away so they
// don't have to log in separately after signing up.
func (h *AuthHandler) Register(w http.ResponseWriter, r *http.Request) {
}

// Login handles a request from someone who already has an account.
// It checks that the email and password match what's in the database,
// and if they do, it sends back a short-lived access token and a longer-lived
// refresh token. The access token is used for normal requests; the refresh
// token is used to get a new access token when the old one expires.
func (h *AuthHandler) Login(w http.ResponseWriter, r *http.Request) {
}

// Logout handles a request to sign out. It invalidates the user's current
// refresh token so it can't be used to get new access tokens anymore.
// The access token itself will expire on its own schedule.
func (h *AuthHandler) Logout(w http.ResponseWriter, r *http.Request) {
}

// RefreshToken handles a request to swap an expired access token for a new one.
// The user sends their refresh token; if it's still valid, we send back a
// fresh access token without making them type their password again.
func (h *AuthHandler) RefreshToken(w http.ResponseWriter, r *http.Request) {
}

// generateTokenPair creates both an access token and a refresh token for a user.
// The access token is short-lived (e.g. 15 minutes) and used on every request.
// The refresh token lives much longer (e.g. 30 days) and is only used here.
func (h *AuthHandler) generateTokenPair(userID int64) (accessToken, refreshToken string, err error) {
	return "", "", nil
}

// parseToken reads a JWT string and checks that it was signed with our secret
// key and hasn't expired. Returns the claims (the data stored inside the token)
// if everything checks out.
func (h *AuthHandler) parseToken(tokenString string) (*jwt.RegisteredClaims, error) {
	return nil, nil
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
}
