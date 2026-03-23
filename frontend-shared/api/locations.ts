/**
 * Saved locations API functions.
 * Manages the fishing spots a user has bookmarked for monitoring.
 */

import type { ApiClient } from './client';
import type {
  SavedLocation,
  SaveLocationRequest,
  UpdateLocationRadiusRequest,
} from '../types/location';

// Saves a new fishing spot for the user to monitor.
// After saving, new wildlife events within the location's radius will
// trigger push notifications.
export async function saveLocation(
  client: ApiClient,
  data: SaveLocationRequest,
): Promise<SavedLocation> {
  return client.post<SavedLocation>('/locations', data);
}

// Returns all the fishing spots the current user has saved.
// Used to populate the "My Spots" screen and the notification settings context.
export async function getUserLocations(
  client: ApiClient,
): Promise<SavedLocation[]> {
  return client.get<SavedLocation[]>('/locations');
}

// Removes a saved location. The user will no longer receive alerts
// based on this spot after deletion.
export async function deleteLocation(
  client: ApiClient,
  locationId: number,
): Promise<void> {
  return client.delete<void>(`/locations/${locationId}`);
}

// Updates the alert radius for an existing saved location.
// A larger radius casts a wider net for alerts; smaller means only very local events.
export async function updateLocationRadius(
  client: ApiClient,
  locationId: number,
  data: UpdateLocationRadiusRequest,
): Promise<SavedLocation> {
  return client.put<SavedLocation>(`/locations/${locationId}/radius`, data);
}
