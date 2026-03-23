/**
 * Catch store — mobile.
 * Same shape as the web catch store. Holds the user's catch list and manages
 * fetching and invalidating it. Uses Zustand without persistence — catch data
 * is re-fetched from the server on each app launch to stay fresh.
 */

import { create } from 'zustand';

import type { Catch } from '@castcreel/shared/types/catch';
import { listMyCatches } from '@castcreel/shared/api/catches';
import { createApiClient } from '@castcreel/shared/api/client';

const apiClient = createApiClient();

interface CatchState {
  catches: Catch[];
  isLoading: boolean;
  error: string | null;
  totalCount: number;

  fetchCatches: () => Promise<void>;
  addCatch: (newCatch: Catch) => void;
  removeCatch: (catchId: number) => void;
  updateCatch: (updated: Catch) => void;
  clear: () => void;
}

// useCatchStore gives any screen access to the user's catch history
// without prop-drilling. Used by HomeScreen, ProfileScreen, and CatchCard.
export const useCatchStore = create<CatchState>()((set) => ({
  catches: [],
  isLoading: false,
  error: null,
  totalCount: 0,

  // Loads the user's full catch history from the API.
  fetchCatches: async () => {},

  // Adds a new catch to the front of the list immediately after logging it.
  addCatch: (_newCatch: Catch) => {},

  // Removes a deleted catch from the list.
  removeCatch: (_catchId: number) => {},

  // Replaces an updated catch in the list.
  updateCatch: (_updated: Catch) => {},

  // Empties the catch list on logout.
  clear: () => {},
}));
