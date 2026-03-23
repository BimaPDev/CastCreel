package models

import "time"

// VisibilityLevel controls who can see a catch record.
// These are the four layers described in the app design.
type VisibilityLevel int

const (
	// VisibilityPrivate means only the person who logged the catch can see it.
	VisibilityPrivate VisibilityLevel = 1

	// VisibilityFriends means the user's approved friends and family can see it.
	VisibilityFriends VisibilityLevel = 2

	// VisibilityGroup means the catch is shared to one or more specific groups
	// the user belongs to. Only members of those groups can see the catch.
	// group_ids must contain at least one group ID when this level is used.
	VisibilityGroup VisibilityLevel = 3

	// VisibilityPublic means the catch shows up on the world map for all users,
	// but the exact GPS location is slightly blurred to protect the fishing spot.
	VisibilityPublic VisibilityLevel = 4

	// VisibilityWildlife is not a social setting — it's a separate always-on flag.
	// Anonymized data from this catch is always sent to the wildlife data pipeline
	// regardless of the social visibility the user chose above.
	VisibilityWildlife VisibilityLevel = 5
)

// Catch represents a single fishing catch that a user has logged.
// This is the core data record in the whole app.
type Catch struct {
	// A unique number that identifies this catch.
	ID int64 `db:"id" json:"id"`

	// The ID of the user who logged this catch.
	UserID int64 `db:"user_id" json:"user_id"`

	// The fish species identified from the photo (e.g. "Largemouth Bass").
	// Filled in automatically by the AI vision system.
	Species string `db:"species" json:"species"`

	// The estimated length of the fish in centimeters.
	// Filled in automatically when possible; the user can also enter it manually.
	LengthCm *float64 `db:"length_cm" json:"length_cm,omitempty"`

	// The dominant color of the fish as detected from the photo.
	// Used as an extra data point for species identification confidence.
	DominantColor string `db:"dominant_color" json:"dominant_color"`

	// A rough assessment of how healthy the fish looked (e.g. "good", "thin").
	// Detected by the AI vision system from the photo.
	BodyCondition string `db:"body_condition" json:"body_condition"`

	// The path or URL to the photo of the catch stored in the file system or object storage.
	PhotoURL string `db:"photo_url" json:"photo_url"`

	// The exact GPS coordinates where the fish was caught.
	Latitude  float64 `db:"latitude" json:"latitude"`
	Longitude float64 `db:"longitude" json:"longitude"`

	// Any notes the user typed in manually about the catch.
	Notes *string `db:"notes" json:"notes,omitempty"`

	// The bait or technique the user was using when they caught this fish.
	BaitOrTechnique *string `db:"bait_or_technique" json:"bait_or_technique,omitempty"`

	// Who can see this catch on the social side of the app.
	// Does not affect wildlife data contribution, which is always on separately.
	Visibility VisibilityLevel `db:"visibility" json:"visibility"`

	// The IDs of the groups this catch has been shared to.
	// Only relevant when Visibility is VisibilityGroup. Must contain at least one
	// group ID in that case. A catch can be shared to multiple groups simultaneously —
	// for example, a user might post a bass catch to both "Lake Erie Crew" and
	// "Tournament Prep Group" at the same time.
	GroupIDs []int64 `db:"group_ids" json:"group_ids,omitempty"`

	// A score from 0.0 to 1.0 that reflects how scientifically useful this catch
	// is as a data point. A catch during a recent stocking event scores lower
	// because the fish didn't naturally end up there. The AI uses this weight
	// when training so noisy catches don't pollute the model.
	DataQualityWeight float64 `db:"data_quality_weight" json:"data_quality_weight"`

	// --- Environmental conditions at the time of the catch ---
	// These are all pulled automatically from external APIs based on GPS and time.

	WeatherCondition    *string  `db:"weather_condition" json:"weather_condition,omitempty"`
	AirTempCelsius      *float64 `db:"air_temp_celsius" json:"air_temp_celsius,omitempty"`
	WaterTempCelsius    *float64 `db:"water_temp_celsius" json:"water_temp_celsius,omitempty"`
	BarometricPressureHPa *float64 `db:"barometric_pressure_hpa" json:"barometric_pressure_hpa,omitempty"`

	// Whether pressure was rising, falling, or steady at the time.
	// Anglers often find fish feed differently depending on pressure trend.
	PressureTrend *string `db:"pressure_trend" json:"pressure_trend,omitempty"`

	WindSpeedKmh *float64 `db:"wind_speed_kmh" json:"wind_speed_kmh,omitempty"`
	WindDirection *string  `db:"wind_direction" json:"wind_direction,omitempty"`

	// The current moon phase (e.g. "full moon", "new moon", "waxing crescent").
	MoonPhase *string `db:"moon_phase" json:"moon_phase,omitempty"`

	// The solunar feeding period active at this time, if any.
	// Solunar theory predicts that fish feed more actively during certain
	// windows related to moon and sun positions.
	SolunarPeriod *string `db:"solunar_period" json:"solunar_period,omitempty"`

	// When the user logged this catch.
	CaughtAt  time.Time `db:"caught_at" json:"caught_at"`
	CreatedAt time.Time `db:"created_at" json:"created_at"`
	UpdatedAt time.Time `db:"updated_at" json:"updated_at"`
}
