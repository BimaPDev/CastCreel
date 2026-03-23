package models

import "time"

// User represents a person who has an account in the app.
// This is what gets stored in the database for each registered user.
type User struct {
	// A unique number that identifies this user internally.
	ID int64 `db:"id" json:"id"`

	// The email address the user signed up with. Must be unique — no two
	// accounts can share the same email.
	Email string `db:"email" json:"email"`

	// The display name the user chose. Shown to friends and on the public map.
	Username string `db:"username" json:"username"`

	// The hashed version of the user's password. We never store the real
	// password — only this scrambled version so that even if the database
	// is stolen, passwords can't be recovered.
	PasswordHash string `db:"password_hash" json:"-"`

	// The GPS coordinates of the user's home area. Used to show them relevant
	// local news and stocking alerts by default.
	HomeLatitude  *float64 `db:"home_latitude" json:"home_latitude,omitempty"`
	HomeLongitude *float64 `db:"home_longitude" json:"home_longitude,omitempty"`

	// The fish species the user cares about most. Used to filter news and
	// personalize prediction results.
	FavoriteSpecies []string `db:"favorite_species" json:"favorite_species"`

	// The device token used to send push notifications to this user's phone.
	// Null if the user hasn't granted notification permission yet.
	PushToken *string `db:"push_token" json:"push_token,omitempty"`

	// When the account was first created.
	CreatedAt time.Time `db:"created_at" json:"created_at"`

	// When the account details were last changed.
	UpdatedAt time.Time `db:"updated_at" json:"updated_at"`
}
