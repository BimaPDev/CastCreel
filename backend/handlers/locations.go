package handlers

import (
	"net/http"
)

// LocationHandler manages the fishing spots a user has saved for monitoring.
// Saved locations are what the notification job checks against when new
// wildlife events come in — if an event is within the radius of a saved spot,
// the user gets a push notification.
type LocationHandler struct {
	db interface{} // will be *pgxpool.Pool once implemented
}

// NewLocationHandler creates a new LocationHandler ready to use.
func NewLocationHandler(db interface{}) *LocationHandler {
	return &LocationHandler{db: db}
}

// SaveLocation stores a new fishing spot for the user.
// The user provides a name, GPS coordinates, and a radius in kilometers.
// After saving, the notification job will start checking this spot
// on every ingest cycle.
func (h *LocationHandler) SaveLocation(w http.ResponseWriter, r *http.Request) {
}

// GetUserLocations returns all the saved spots belonging to the logged-in user.
// This is what the "My Spots" screen reads to show the list of monitored locations.
func (h *LocationHandler) GetUserLocations(w http.ResponseWriter, r *http.Request) {
}

// DeleteLocation removes a saved spot. After deletion, the user will no longer
// receive alerts based on that location. Notifications already sent are not affected.
func (h *LocationHandler) DeleteLocation(w http.ResponseWriter, r *http.Request) {
}

// UpdateLocationRadius lets the user change how large an area around their saved
// spot they want to monitor. A smaller radius means only very local events trigger
// an alert; a larger one casts a wider net.
func (h *LocationHandler) UpdateLocationRadius(w http.ResponseWriter, r *http.Request) {
}
