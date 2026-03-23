package handlers

import (
	"net/http"
)

// WildlifePartnerHandler exposes read-only API endpoints for wildlife agency
// partners. These endpoints are not for regular app users — they are for
// the biologists and agencies who receive anonymized catch data back as
// structured reports in exchange for the data they share with us.
type WildlifePartnerHandler struct {
	db interface{} // will be *pgxpool.Pool once implemented
}

// NewWildlifePartnerHandler creates a new WildlifePartnerHandler ready to use.
func NewWildlifePartnerHandler(db interface{}) *WildlifePartnerHandler {
	return &WildlifePartnerHandler{db: db}
}

// GetAggregateStats returns high-level catch statistics aggregated across
// all users — total catches by species, average size, catch rates per body
// of water, and time trends. All data is fully anonymized: no user info,
// GPS coordinates snapped to a 1km grid.
func (h *WildlifePartnerHandler) GetAggregateStats(w http.ResponseWriter, r *http.Request) {
}

// GetStockingEffectiveness returns data that helps agencies understand how
// well a stocking event worked. For each stocking event on record, it shows
// how many user catches were logged in that area in the weeks after stocking,
// broken down by species. This helps agencies tune their stocking programs.
func (h *WildlifePartnerHandler) GetStockingEffectiveness(w http.ResponseWriter, r *http.Request) {
}

// GetSpeciesTrends returns time-series data showing whether catch rates for
// each species are going up, down, or staying flat over months or years.
// Useful for population monitoring without needing to run expensive surveys.
func (h *WildlifePartnerHandler) GetSpeciesTrends(w http.ResponseWriter, r *http.Request) {
}

// GetCatchRates returns how many fish per hour of effort are being caught
// in different regions and bodies of water, filtered by species and time range.
// "Effort" is estimated from session duration where available.
func (h *WildlifePartnerHandler) GetCatchRates(w http.ResponseWriter, r *http.Request) {
}
