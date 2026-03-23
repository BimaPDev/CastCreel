package middleware

import (
	"context"
	"net/http"
	"strings"

	"github.com/golang-jwt/jwt/v5"

	"castcreel/backend/config"
)

// contextKey is a private type used to store values in request context.
// Using a custom type prevents key collisions with other middleware.
type contextKey string

const userIDKey contextKey = "userID"

// RequireAuth is middleware that checks whether the person making a request
// is logged in before letting them through to the actual handler.
// It looks for a JWT token in the Authorization header (format: "Bearer <token>"),
// verifies the token is valid and hasn't expired, and then attaches the user's
// ID to the request context so downstream handlers can see who's asking.
// If no valid token is present, the request is rejected with a 401 error.
func RequireAuth(cfg *config.Config) func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		})
	}
}

// RequirePartnerKey is middleware that checks for a valid wildlife partner API key.
// Partner endpoints are not for regular users — they're for agency systems that
// pull aggregate data. Authentication works by checking a secret key in the
// X-Partner-Key header rather than a user JWT.
func RequirePartnerKey(cfg *config.Config) func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		})
	}
}

// extractUserID pulls the user's ID from the request context.
// The ID was put there by the RequireAuth middleware. Handlers call this
// when they need to know who the logged-in user is.
func extractUserID(r *http.Request) (int64, bool) {
	return 0, false
}

// GetUserID is the exported version of extractUserID for use in handlers.
func GetUserID(r *http.Request) (int64, bool) {
	return extractUserID(r)
}

// extractBearerToken pulls the token string out of an "Authorization: Bearer <token>"
// header. Returns empty string if the header is missing or formatted wrong.
func extractBearerToken(r *http.Request) string {
	header := r.Header.Get("Authorization")
	if !strings.HasPrefix(header, "Bearer ") {
		return ""
	}
	return strings.TrimPrefix(header, "Bearer ")
}

// verifyToken parses a JWT string, checks the signature against the secret key,
// and makes sure the token hasn't expired. Returns the claims if valid.
func verifyToken(tokenString, secret string) (*jwt.RegisteredClaims, error) {
	return nil, nil
}

// setUserIDInContext stores the user ID in the request context so it can be
// read by handlers further down the chain without needing to re-parse the token.
func setUserIDInContext(r *http.Request, userID int64) *http.Request {
	return r.WithContext(context.WithValue(r.Context(), userIDKey, userID))
}
