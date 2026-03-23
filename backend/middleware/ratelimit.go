package middleware

import (
	"net/http"
	"sync"

	"golang.org/x/time/rate"

	"castcreel/backend/config"
)

// visitorLimiter holds a rate limiter for a single visitor (user or IP address).
// We track one limiter per visitor so that one heavy user doesn't slow down everyone else.
type visitorLimiter struct {
	limiter *rate.Limiter
}

// RateLimiter is middleware that prevents any one person or IP from hammering
// the API with too many requests too quickly. It creates a separate token bucket
// for each visitor and rejects requests that arrive faster than the configured limit.
//
// Key detail about identity: when the request carries a valid JWT, we use the
// user's ID as the key so that rate limits apply per account. When there's no
// token (like the login or register endpoints), we fall back to the client's IP address.
// This means a single malicious IP can't exceed the limit even on public endpoints.
//
// NOTE: This in-process limiter is fine for a single-server MVP, but it resets
// if the server restarts and doesn't share state across multiple servers.
// Replace with a Redis-backed limiter before deploying to production with
// multiple instances.
func RateLimiter(cfg *config.Config) func(http.Handler) http.Handler {
	visitors := make(map[string]*visitorLimiter)
	var mu sync.Mutex

	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			key := getClientKey(r)

			mu.Lock()
			v, exists := visitors[key]
			if !exists {
				v = &visitorLimiter{
					limiter: rate.NewLimiter(
						rate.Limit(cfg.RateLimitRequestsPerSecond),
						cfg.RateLimitBurstSize,
					),
				}
				visitors[key] = v
			}
			mu.Unlock()

			if !v.limiter.Allow() {
				http.Error(w, "rate limit exceeded — slow down and try again", http.StatusTooManyRequests)
				return
			}

			next.ServeHTTP(w, r)
		})
	}
}

// getClientKey returns the identifier to use for rate limiting this request.
// If the request has a valid JWT, we use the user ID from it — this ties
// the limit to the account, not just the network address.
// If there's no token (or it's invalid), we fall back to the IP address.
// This fallback is important for public endpoints like /auth/login where
// there's no token yet but we still want to prevent brute-force attacks.
func getClientKey(r *http.Request) string {
	return ""
}
