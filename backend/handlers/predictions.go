package handlers

import (
	"net/http"

	"castcreel/backend/clients"
)

// PredictionHandler holds what it needs to fulfill prediction requests —
// a database connection (for context like the user's catch history) and the
// AI client interface (to forward the actual prediction work to the Python service).
type PredictionHandler struct {
	db       interface{} // will be *pgxpool.Pool once implemented
	aiClient clients.AIClient
}

// NewPredictionHandler creates a new PredictionHandler ready to use.
func NewPredictionHandler(db interface{}, aiClient clients.AIClient) *PredictionHandler {
	return &PredictionHandler{db: db, aiClient: aiClient}
}

// GetPrediction handles a request from a user who wants advice before going fishing.
// It reads the user's current or planned location and time window from the request,
// then calls the AI service — using whatever transport is configured (HTTP or gRPC) —
// to get back a prediction about what species to target, when the best window is,
// what bait or technique to use, and how confident the model is. The result is
// passed straight back to the user. This handler itself does no prediction math;
// it's purely a relay between the mobile app and the Python AI service.
func (h *PredictionHandler) GetPrediction(w http.ResponseWriter, r *http.Request) {
}
