/**
 * Wildlife event types.
 * Matches the Go WildlifeEvent model in backend/models/wildlife_event.go.
 * These are the news items ingested from wildlife agencies.
 */

// The category of a wildlife event.
export enum EventType {
  // Fish were added to a body of water by an agency.
  Stocking = 'stocking',
  // Fishing rules changed — seasons, size limits, closures, etc.
  RegulationChange = 'regulation_change',
  // Water quality issue — algae bloom, flooding, pollution.
  WaterAdvisory = 'water_advisory',
  // An agency published results from a fish population count.
  PopulationSurvey = 'population_survey',
  // A new invasive species was detected.
  InvasiveSpecies = 'invasive_species',
}

// A wildlife event record as returned by the API news feed.
export interface WildlifeEvent {
  id: number;
  event_type: EventType;
  title: string;
  description: string;
  source_agency: string;
  source_url: string;
  // Center of the affected area.
  latitude: number;
  longitude: number;
  // How large the affected area is, in kilometers radius.
  radius_km: number;
  // For stocking events — which body of water was stocked.
  water_body_name?: string;
  // For stocking events — which species was added.
  stocked_species?: string;
  // For stocking events — how many fish were added.
  stocked_count?: number;
  // When the event actually happened.
  occurred_at: string; // ISO 8601
  // When our system first picked it up.
  ingested_at: string;
}
