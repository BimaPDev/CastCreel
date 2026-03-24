package config

import (
	"os"
	"strconv"
	"time"
)

// Config holds every setting the application needs to run.
// All values come from environment variables so that nothing sensitive
// is ever baked into the code itself.
type Config struct {
	// Which port the HTTP server listens on (e.g. "8080").
	ServerPort string

	// Whether we're in "development" or "production" mode.
	// Some behavior (like detailed error messages) changes between them.
	AppEnv string

	// The full connection string for the PostgreSQL database.
	DatabaseURL string

	// The secret key used to sign and verify login tokens.
	// This must stay private — if it leaks, anyone can forge a login.
	JWTSecret string

	// How long a login token is valid before the user needs to log in again.
	JWTExpiryDuration time.Duration

	// Which transport to use when talking to the Python AI service.
	// Valid values: "http" (default) or "grpc".
	AITransport string

	// The base URL for the Python service's REST API (e.g. "http://ai-service:8000").
	AIServiceHTTPURL string

	// The address for the Python service's gRPC server (e.g. "ai-service:50051").
	AIServiceGRPCURL string

	// API key for the weather data provider.
	WeatherAPIKey string

	// API key for the barometric pressure data provider.
	BarometricPressureAPIKey string

	// API key for water temperature data.
	WaterTempAPIKey string

	// API key for solunar feeding period data.
	SolunarAPIKey string

	// Secret key used to authenticate wildlife agency partner requests.
	WildlifePartnerAPIKey string

	// Credential for the push notification service (e.g. Firebase FCM key).
	PushNotificationServiceKey string

	// How many requests per second a single user or IP is allowed to make.
	RateLimitRequestsPerSecond float64

	// The burst size allows a short spike of requests above the per-second limit.
	// For example, a burst of 10 means a user can send 10 requests at once
	// even if they've been quiet, but they'll be throttled after that.
	RateLimitBurstSize int
}

// Load reads all configuration values from environment variables and returns
// a filled-in Config struct. If a required value is missing, it logs a warning
// and uses a safe default so the app can still start in development.
func Load() *Config {
	return &Config{
		ServerPort:                 getEnv("SERVER_PORT", "8080"),
		AppEnv:                     getEnv("APP_ENV", "development"),
		DatabaseURL:                getEnv("DATABASE_URL", ""),
		JWTSecret:                  getEnv("JWT_SECRET", ""),
		JWTExpiryDuration:          getEnvDuration("JWT_EXPIRY_DURATION", 24*time.Hour),
		AITransport:                getEnv("AI_TRANSPORT", "http"),
		AIServiceHTTPURL:           getEnv("AI_SERVICE_HTTP_URL", "http://localhost:8000"),
		AIServiceGRPCURL:           getEnv("AI_SERVICE_GRPC_URL", "localhost:50051"),
		WeatherAPIKey:              getEnv("WEATHER_API_KEY", ""),
		BarometricPressureAPIKey:   getEnv("BAROMETRIC_PRESSURE_API_KEY", ""),
		WaterTempAPIKey:            getEnv("WATER_TEMP_API_KEY", ""),
		SolunarAPIKey:              getEnv("SOLUNAR_API_KEY", ""),
		WildlifePartnerAPIKey:      getEnv("WILDLIFE_PARTNER_API_KEY", ""),
		PushNotificationServiceKey: getEnv("PUSH_NOTIFICATION_SERVICE_KEY", ""),
		RateLimitRequestsPerSecond: getEnvFloat("RATE_LIMIT_REQUESTS_PER_SECOND", 10),
		RateLimitBurstSize:         getEnvInt("RATE_LIMIT_BURST_SIZE", 30),
	}
}

// getEnv is a small helper that reads an environment variable by name.
// If the variable isn't set, it returns the provided fallback value.
// This way we always have a working default in development.
func getEnv(key, fallback string) string {
	if v := os.Getenv(key); v != "" {
		return v
	}
	return fallback
}

// getEnvDuration reads an environment variable and parses it as a Go duration
// string (e.g. "24h" or "30m"). Falls back to the provided default if missing
// or unparseable.
func getEnvDuration(key string, fallback time.Duration) time.Duration {
	// Grab the value from the .env
	val := os.Getenv(key)
	// check if exist
	if val == "" {
		return fallback
	}
	// set D as the time duration using the value of "val"
	d, err := time.ParseDuration(val)
	//check if exist and fallback if not
	if err != nil {
		return fallback
	}
	return d
}

// getEnvFloat reads an environment variable and parses it as a decimal number.
// Used for the rate limit setting. Falls back to the provided default.
func getEnvFloat(key string, fallback float64) float64 {
	if v := os.Getenv(key); v != "" {
		if f, err := strconv.ParseFloat(v, 64); err == nil {
			return f
		}
	}
	return fallback
}

// getEnvInt reads an environment variable and parses it as a whole number.
// Used for burst size. Falls back to the provided default.
func getEnvInt(key string, fallback int) int {
	if v := os.Getenv(key); v != "" {
		if i, err := strconv.Atoi(v); err == nil {
			return i
		}
	}
	return fallback
}
