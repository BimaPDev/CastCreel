/**
 * Catch API functions.
 * All the ways to create, read, update, and delete catch records.
 */

import type { ApiClient } from './client';
import type {
  Catch,
  CreateCatchRequest,
  UpdateCatchRequest,
  PublicMapCatch,
} from '../types/catch';

// Posts a new catch to the server. The photo is sent as multipart form data
// alongside the location and visibility setting. The server calls the AI service
// to identify the species and environmental conditions automatically.
export async function createCatch(
  client: ApiClient,
  data: CreateCatchRequest,
): Promise<Catch> {
  const formData = new FormData();
  formData.append('photo', data.photo);
  formData.append('latitude', String(data.latitude));
  formData.append('longitude', String(data.longitude));
  formData.append('visibility', String(data.visibility));
  if (data.notes) formData.append('notes', data.notes);
  if (data.bait_or_technique) formData.append('bait_or_technique', data.bait_or_technique);
  if (data.caught_at) formData.append('caught_at', data.caught_at);

  return client.upload<Catch>('/catches', formData);
}

// Fetches a single catch by its numeric ID.
// The server checks visibility rules — you can only read a catch if you own it,
// are friends with the owner and it's friend-visible, or it's public.
export async function getCatch(client: ApiClient, id: number): Promise<Catch> {
  return client.get<Catch>(`/catches/${id}`);
}

// Fetches all catches belonging to the currently logged-in user.
// Used to populate the "My Catches" history screen.
export async function listMyCatches(client: ApiClient): Promise<Catch[]> {
  return client.get<Catch[]>('/catches');
}

// Sends corrections or updates to an existing catch.
// Only the owner can update their own catches.
export async function updateCatch(
  client: ApiClient,
  id: number,
  data: UpdateCatchRequest,
): Promise<Catch> {
  return client.put<Catch>(`/catches/${id}`, data);
}

// Permanently removes a catch record.
// Only the owner can delete their own catches.
export async function deleteCatch(client: ApiClient, id: number): Promise<void> {
  return client.delete<void>(`/catches/${id}`);
}

// Fetches public catches for display on the world map.
// GPS coordinates are deliberately blurred server-side before being sent —
// the exact fishing location is never exposed to other users.
export async function getPublicMapCatches(
  client: ApiClient,
): Promise<PublicMapCatch[]> {
  return client.get<PublicMapCatch[]>('/map/catches');
}
