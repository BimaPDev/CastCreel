package clients

import (
	"context"

	"castcreel/backend/config"
)

// PredictionRequest is what we send to the Python AI service when a user
// asks for fishing advice. It describes the location, time window, and
// how many catches this user has on record (used to decide community vs
// personal model weighting).
type PredictionRequest struct {
	Latitude    float64 `json:"latitude"`
	Longitude   float64 `json:"longitude"`
	TargetDate  string  `json:"target_date"`  // ISO 8601 date string
	UserID      int64   `json:"user_id"`
	UserCatchCount int  `json:"user_catch_count"` // determines personal vs community blend
}

// PredictionResponse is what comes back from the Python AI service.
type PredictionResponse struct {
	TopSpecies       string   `json:"top_species"`
	BestTimeWindow   string   `json:"best_time_window"`
	RecommendedBait  string   `json:"recommended_bait"`
	Technique        string   `json:"technique"`
	ConfidenceScore  float64  `json:"confidence_score"`  // 0.0 to 1.0
	AlternativeSpecies []string `json:"alternative_species"`
	Notes            string   `json:"notes"`
}

// DetectFishRequest is what we send to the vision endpoint when a user uploads
// a photo of their catch. The photo is sent as raw bytes.
type DetectFishRequest struct {
	ImageData []byte `json:"image_data"`
	UserID    int64  `json:"user_id"`
}

// DetectFishResponse is what comes back from the vision endpoint.
type DetectFishResponse struct {
	Species       string  `json:"species"`
	DominantColor string  `json:"dominant_color"`
	BodyCondition string  `json:"body_condition"`
	EstimatedLengthCm *float64 `json:"estimated_length_cm,omitempty"`
	ConfidenceScore float64 `json:"confidence_score"`
}

// ConditionsRequest is what we send when we want to fetch environmental data
// for a specific location and time.
type ConditionsRequest struct {
	Latitude  float64 `json:"latitude"`
	Longitude float64 `json:"longitude"`
	Timestamp string  `json:"timestamp"` // ISO 8601
}

// ConditionsResponse holds all the environmental data for a location and time.
type ConditionsResponse struct {
	WeatherCondition      string  `json:"weather_condition"`
	AirTempCelsius        float64 `json:"air_temp_celsius"`
	WaterTempCelsius      *float64 `json:"water_temp_celsius,omitempty"`
	BarometricPressureHPa float64 `json:"barometric_pressure_hpa"`
	PressureTrend         string  `json:"pressure_trend"`
	WindSpeedKmh          float64 `json:"wind_speed_kmh"`
	WindDirection         string  `json:"wind_direction"`
	MoonPhase             string  `json:"moon_phase"`
	SolunarPeriod         *string `json:"solunar_period,omitempty"`
}

// AIClient is the interface that all code in the Go backend uses to talk
// to the Python AI service. The actual transport (HTTP REST or gRPC) is
// hidden behind this interface — handlers don't know or care which one is active.
// This makes it easy to swap transports without changing any handler code.
type AIClient interface {
	// Predict sends a prediction request to the Python service and returns
	// its recommendation about what to fish for, when, and how.
	Predict(ctx context.Context, req *PredictionRequest) (*PredictionResponse, error)

	// DetectFish sends a fish photo to the Python vision service and returns
	// the identified species, color, and body condition.
	DetectFish(ctx context.Context, req *DetectFishRequest) (*DetectFishResponse, error)

	// FetchConditions asks the Python service to look up all the environmental
	// data for a given location and time — weather, pressure, moon phase, etc.
	FetchConditions(ctx context.Context, req *ConditionsRequest) (*ConditionsResponse, error)
}

// NewAIClient reads the AI_TRANSPORT config value and returns the right
// concrete implementation — either the HTTP REST client or the gRPC client.
// All code that calls this gets an AIClient interface back, so it never needs
// to know which transport was chosen.
func NewAIClient(cfg *config.Config) (AIClient, error) {
	return nil, nil
}
