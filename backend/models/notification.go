package models

import "time"

// NotificationType describes what a push notification is about.
type NotificationType string

const (
	// NotificationStockingAlert means fish were recently stocked near one of
	// the user's saved locations. A great reason to go fishing soon.
	NotificationStockingAlert NotificationType = "stocking_alert"

	// NotificationRegulationChange means fishing rules have changed in an area
	// the user fishes. They should know before their next trip.
	NotificationRegulationChange NotificationType = "regulation_change"

	// NotificationWaterAdvisory means there is a water quality warning —
	// algae bloom, flooding, or other condition — near a saved location.
	NotificationWaterAdvisory NotificationType = "water_advisory"

	// NotificationFriendCatch means someone on the user's friends list
	// logged a catch that is visible to friends.
	NotificationFriendCatch NotificationType = "friend_catch"

	// NotificationInvasiveSpecies means an invasive species was detected
	// near one of the user's saved locations.
	NotificationInvasiveSpecies NotificationType = "invasive_species"
)

// Notification represents a single message sent (or queued to be sent) to a user.
// A record is created here before the push notification goes out, so we have
// a history the user can scroll through inside the app.
type Notification struct {
	// A unique identifier for this notification.
	ID int64 `db:"id" json:"id"`

	// The user this notification belongs to.
	UserID int64 `db:"user_id" json:"user_id"`

	// What kind of notification this is.
	Type NotificationType `db:"type" json:"type"`

	// The short headline shown at the top of the push notification.
	Title string `db:"title" json:"title"`

	// The full message body shown below the title.
	Body string `db:"body" json:"body"`

	// The ID of the wildlife event or catch that triggered this notification,
	// so the app can deep-link to the right detail screen when tapped.
	RelatedEventID *int64 `db:"related_event_id" json:"related_event_id,omitempty"`

	// Whether the user has tapped on or dismissed this notification in-app.
	IsRead bool `db:"is_read" json:"is_read"`

	// When this notification was created and sent.
	CreatedAt time.Time `db:"created_at" json:"created_at"`
}

// UserNotificationPreferences stores which types of alerts a user wants to receive.
// Users can toggle each type on or off independently from their settings screen.
type UserNotificationPreferences struct {
	// The user these preferences belong to.
	UserID int64 `db:"user_id" json:"user_id"`

	// Whether to send alerts when fish are stocked near a saved location.
	StockingAlerts bool `db:"stocking_alerts" json:"stocking_alerts"`

	// Whether to send alerts when fishing regulations change nearby.
	RegulationChanges bool `db:"regulation_changes" json:"regulation_changes"`

	// Whether to send alerts about algae blooms, flooding, or other water issues.
	WaterAdvisories bool `db:"water_advisories" json:"water_advisories"`

	// Whether to get notified when friends log new catches.
	FriendCatches bool `db:"friend_catches" json:"friend_catches"`

	// Whether to send alerts when an invasive species is spotted nearby.
	InvasiveSpecies bool `db:"invasive_species" json:"invasive_species"`

	UpdatedAt time.Time `db:"updated_at" json:"updated_at"`
}
