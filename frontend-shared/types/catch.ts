/**
 * Catch-related types.
 * These match the shapes the Go backend sends and receives for catch records.
 */

// The social visibility levels a user can choose for their catch.
// Matches the VisibilityLevel constants in backend/models/catch.go.
export enum VisibilityLevel {
  // Only you can see this catch.
  Private = 1,
  // People you've approved as friends can see this catch.
  Friends = 2,
  // Only members of the groups you select can see this catch.
  // group_ids on the Catch must contain at least one group ID when this is chosen.
  Group = 3,
  // Anyone using the app can see this on the world map.
  // The exact GPS location is blurred before it's shown publicly.
  Public = 4,
}

// The full catch record as it comes back from the API.
// Mirrors the Go Catch struct in backend/models/catch.go.
export interface Catch {
  id: number;
  user_id: number;
  species: string;
  length_cm?: number;
  dominant_color: string;
  body_condition: string;
  photo_url: string;
  latitude: number;
  longitude: number;
  notes?: string;
  bait_or_technique?: string;
  visibility: VisibilityLevel;
  // The IDs of the groups this catch has been shared to.
  // Only present when visibility is Group. Must contain at least one entry in that case.
  // A catch can be shared to multiple groups at once — e.g. "Lake Erie Crew" and
  // "Tournament Prep" simultaneously.
  group_ids?: number[];
  // How scientifically useful this catch is as a training data point.
  // 0.0 = very low signal (e.g., right after a stocking), 1.0 = high quality data.
  data_quality_weight: number;
  // Environmental conditions recorded at the time of the catch.
  weather_condition?: string;
  air_temp_celsius?: number;
  water_temp_celsius?: number;
  barometric_pressure_hpa?: number;
  pressure_trend?: string; // "rising" | "falling" | "steady"
  wind_speed_kmh?: number;
  wind_direction?: string;
  moon_phase?: string;
  solunar_period?: string;
  caught_at: string; // ISO 8601
  created_at: string;
  updated_at: string;
}

// What you send to the server when logging a new catch.
// The photo is sent as a File (web) or Blob (mobile). Everything else
// is auto-filled by the server using the AI service, but can be overridden.
export interface CreateCatchRequest {
  photo: File | Blob;
  latitude: number;
  longitude: number;
  visibility: VisibilityLevel;
  // Required when visibility is Group. IDs of the groups to share this catch to.
  group_ids?: number[];
  notes?: string;
  bait_or_technique?: string;
  // Defaults to now if omitted.
  caught_at?: string;
}

// What you send when correcting a catch you've already logged.
export interface UpdateCatchRequest {
  species?: string;
  length_cm?: number;
  notes?: string;
  bait_or_technique?: string;
  visibility?: VisibilityLevel;
  // Required when changing visibility to Group. Replaces the existing group list entirely.
  group_ids?: number[];
}

// The lightweight version of a catch used on the world map.
// GPS coordinates are fuzzed server-side before being sent —
// the exact fishing spot is never exposed to other users.
export interface PublicMapCatch {
  id: number;
  species: string;
  latitude: number;  // slightly blurred from the real location
  longitude: number; // slightly blurred from the real location
  caught_at: string;
}
