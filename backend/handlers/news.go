package handlers

import (
	"net/http"
)

// NewsHandler handles requests for wildlife news and agency updates.
// It reads events that have been ingested and stored by the Python AI service
// and surfaces the ones most relevant to the requesting user.
type NewsHandler struct {
	db interface{} // will be *pgxpool.Pool once implemented
}

// NewNewsHandler creates a new NewsHandler ready to use.
func NewNewsHandler(db interface{}) *NewsHandler {
	return &NewsHandler{db: db}
}

// GetWildlifeNews returns a list of recent wildlife events — things like
// new stocking reports, regulation changes, water quality advisories, and
// invasive species alerts — filtered to what's relevant to this user.
// Relevance is determined by their saved locations and favorite species.
// Events are sorted with the most recent and nearest first.
func (h *NewsHandler) GetWildlifeNews(w http.ResponseWriter, r *http.Request) {
}
