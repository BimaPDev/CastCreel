package models

import "time"

// EventType describes what kind of news or update a wildlife event represents.
type EventType string

const (
	// EventStocking means a wildlife agency has added fish to a body of water.
	// This affects the data quality weight of nearby catches.
	EventStocking EventType = "stocking"

	// EventRegulationChange means fishing rules have changed — season dates,
	// size limits, bag limits, or new closures.
	EventRegulationChange EventType = "regulation_change"

	// EventWaterAdvisory means there is a condition warning for a waterway,
	// like a harmful algae bloom, flooding, or a pollution spill.
	EventWaterAdvisory EventType = "water_advisory"

	// EventPopulationSurvey means an agency has published results from a fish
	// population count, which gives us data about species abundance.
	EventPopulationSurvey EventType = "population_survey"

	// EventInvasiveSpecies means a new invasive species has been detected
	// in a body of water — an alert worth surfacing to nearby users.
	EventInvasiveSpecies EventType = "invasive_species"
)

// WildlifeEvent is the normalized form of any piece of news or data that comes
// in from a wildlife agency, regardless of whether it arrived via API, RSS feed,
// web scraper, or PDF. Everything gets converted to this shape so the rest of
// the system only has to deal with one format.
type WildlifeEvent struct {
	// A unique identifier for this event.
	ID int64 `db:"id" json:"id"`

	// What kind of event this is.
	Type EventType `db:"event_type" json:"event_type"`

	// A short human-readable title (e.g. "Lake Erie Walleye Stocking — April 2026").
	Title string `db:"title" json:"title"`

	// The full details of the event in plain text.
	Description string `db:"description" json:"description"`

	// The name of the agency that published this information.
	SourceAgency string `db:"source_agency" json:"source_agency"`

	// The original URL or file path this data came from, so we can trace it back.
	SourceURL string `db:"source_url" json:"source_url"`

	// The center latitude of the area this event affects.
	Latitude float64 `db:"latitude" json:"latitude"`

	// The center longitude of the area this event affects.
	Longitude float64 `db:"longitude" json:"longitude"`

	// How large an area this event covers, in kilometers radius.
	// A single-lake stocking might be 2km; a regulation change might cover 50km.
	RadiusKm float64 `db:"radius_km" json:"radius_km"`

	// For stocking events: the name of the water body that was stocked.
	WaterBodyName *string `db:"water_body_name" json:"water_body_name,omitempty"`

	// For stocking events: which species was stocked.
	StockedSpecies *string `db:"stocked_species" json:"stocked_species,omitempty"`

	// For stocking events: how many fish were added.
	StockedCount *int64 `db:"stocked_count" json:"stocked_count,omitempty"`

	// When the event actually happened (not when we ingested it).
	OccurredAt time.Time `db:"occurred_at" json:"occurred_at"`

	// When our system first picked up this event.
	IngestedAt time.Time `db:"ingested_at" json:"ingested_at"`
}
