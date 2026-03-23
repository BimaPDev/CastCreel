/**
 * Saved location types.
 * A saved location is a fishing spot the user has bookmarked.
 * When something happens nearby (stocking, advisory, etc.),
 * the app sends the user a push notification.
 */

// A saved location record as returned by the API.
export interface SavedLocation {
  id: number;
  user_id: number;
  // The friendly name the user gave this spot, e.g. "Dad's bass lake".
  name: string;
  latitude: number;
  longitude: number;
  // How wide an area around this point to monitor for alerts, in kilometers.
  radius_km: number;
  created_at: string; // ISO 8601
}

// What you send when saving a new location.
export interface SaveLocationRequest {
  name: string;
  latitude: number;
  longitude: number;
  radius_km: number;
}

// What you send when changing the monitoring radius on an existing location.
export interface UpdateLocationRadiusRequest {
  radius_km: number;
}
