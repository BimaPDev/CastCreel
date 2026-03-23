/**
 * Wildlife news API functions.
 * Fetches the events ingested from wildlife agencies that are relevant to the user.
 */

import type { ApiClient } from './client';
import type { WildlifeEvent } from '../types/wildlife';

// Fetches recent wildlife events filtered to what's relevant for this user:
// stocking events, regulation changes, water advisories, and invasive species alerts
// near their saved locations, and events involving their favorite species.
// Returns events sorted by most recent and closest first.
export async function getWildlifeNews(client: ApiClient): Promise<WildlifeEvent[]> {
  return client.get<WildlifeEvent[]>('/news');
}
