package models

import "time"

// SavedLocation is a fishing spot a user has bookmarked and wants to monitor.
// When a new stocking event, regulation change, or water advisory happens
// within this location's radius, the user gets a notification about it.
type SavedLocation struct {
	// A unique identifier for this saved spot.
	ID int64 `db:"id" json:"id"`

	// The user who saved this location.
	UserID int64 `db:"user_id" json:"user_id"`

	// A friendly name the user gave this spot, like "Dad's secret bass hole"
	// or "Riverside Park launch ramp". Only visible to the user themselves.
	Name string `db:"name" json:"name"`

	// The GPS coordinates of this spot.
	Latitude  float64 `db:"latitude" json:"latitude"`
	Longitude float64 `db:"longitude" json:"longitude"`

	// How far around this point the user wants to receive alerts for,
	// measured in kilometers. For example, 10.0 means "notify me if anything
	// happens within 10km of this spot."
	RadiusKm float64 `db:"radius_km" json:"radius_km"`

	// When the user saved this location.
	CreatedAt time.Time `db:"created_at" json:"created_at"`
}
