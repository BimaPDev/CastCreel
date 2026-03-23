package handlers

import (
	"net/http"

	"castcreel/backend/clients"
)

// CatchHandler holds what the catch functions need — a way to talk to the
// database and a way to call the AI service for vision analysis.
type CatchHandler struct {
	db       interface{} // will be *pgxpool.Pool once implemented
	aiClient clients.AIClient
}

// NewCatchHandler creates a new CatchHandler ready to use.
func NewCatchHandler(db interface{}, aiClient clients.AIClient) *CatchHandler {
	return &CatchHandler{db: db, aiClient: aiClient}
}

// CreateCatch handles the request when a user logs a new catch.
// The user sends a photo and their GPS location. This handler calls the AI
// service to identify the species, color, and body condition from the photo,
// then calls out again to fetch the environmental conditions for that location
// at this moment in time. It assembles everything into a single catch record
// and saves it to the database.
func (h *CatchHandler) CreateCatch(w http.ResponseWriter, r *http.Request) {
}

// GetCatch handles fetching a single catch by its ID.
// It checks that the person asking is allowed to see it — either it's their
// own catch, or they are friends with the owner and the catch is set to
// friends-visible, or the catch is public.
func (h *CatchHandler) GetCatch(w http.ResponseWriter, r *http.Request) {
}

// ListUserCatches returns all the catches belonging to the logged-in user.
// It supports filtering by species and sorting by date so they can browse
// their history. Only the requesting user's own catches are returned here.
func (h *CatchHandler) ListUserCatches(w http.ResponseWriter, r *http.Request) {
}

// UpdateCatch lets the user correct a catch record they've already saved —
// for example to add notes, fix the species if the AI got it wrong, or change
// who can see it. Only the user who owns the catch can update it.
func (h *CatchHandler) UpdateCatch(w http.ResponseWriter, r *http.Request) {
}

// DeleteCatch removes a catch record from the database.
// Only the user who owns the catch can delete it. Once deleted, the data
// is gone from the social layer, but the anonymized wildlife contribution
// snapshot has already been sent and cannot be recalled.
func (h *CatchHandler) DeleteCatch(w http.ResponseWriter, r *http.Request) {
}

// GetPublicMapCatches returns catch records set to public visibility,
// formatted for display on the world map. The exact GPS coordinates are
// intentionally blurred — each location is shifted by a small random amount
// so that the general area is shown but the precise fishing spot is hidden.
// No user identity is included in this response.
func (h *CatchHandler) GetPublicMapCatches(w http.ResponseWriter, r *http.Request) {
}

// fuzzLocation shifts a GPS coordinate by a small random amount so that the
// general area is correct but the exact spot cannot be reverse-engineered.
// Called before any public-facing map data is sent out.
func fuzzLocation(lat, lng float64) (fuzzedLat, fuzzedLng float64) {
	return lat, lng
}
