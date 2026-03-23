/**
 * Catch store.
 *
 * Holds the current user's catch list and manages fetching and invalidating it.
 * Most server data goes through TanStack Query, but catches are also kept here
 * so that non-query parts of the UI (like the navigation badge count) can
 * access them without triggering a re-fetch.
 */

import { create } from 'zustand';

import type { Catch } from '@castcreel/shared/types/catch';
import { listMyCatches } from '@castcreel/shared/api/catches';
import { createApiClient } from '@castcreel/shared/api/client';

const apiClient = createApiClient();

interface CatchState {
  // The user's full catch history, sorted newest first.
  catches: Catch[];
  // True while the initial catch list is loading.
  isLoading: boolean;
  // Any error from the last fetch attempt.
  error: string | null;
  // Total number of catches. Used for the personal model weighting threshold.
  totalCount: number;

  // --- Actions ---

  // Loads the user's full catch history from the server.
  // Called once when the app loads and after a new catch is logged.
  fetchCatches: () => Promise<void>;

  // Adds a newly logged catch to the front of the list without re-fetching everything.
  // Called immediately after createCatch() succeeds for instant UI feedback.
  addCatch: (newCatch: Catch) => void;

  // Removes a catch from the local list. Called after deleteCatch() succeeds.
  removeCatch: (catchId: number) => void;

  // Replaces an existing catch in the list with updated data.
  // Called after updateCatch() succeeds.
  updateCatch: (updated: Catch) => void;

  // Clears the catch list from memory. Called on logout so one user's data
  // doesn't linger when a different user logs in on the same device.
  clear: () => void;
}

// useCatchStore is the hook components call to access the catch list or dispatch actions.
export const useCatchStore = create<CatchState>()((set) => ({
  catches: [],
  isLoading: false,
  error: null,
  totalCount: 0,

  // Fetches the full catch history from the server and stores it.
  fetchCatches: async () => {},

  // Prepends a catch to the list and increments the count.
  addCatch: (_newCatch: Catch) => {},

  // Filters the deleted catch out of the list.
  removeCatch: (_catchId: number) => {},

  // Swaps the old version of a catch with the updated version.
  updateCatch: (_updated: Catch) => {},

  // Resets everything back to initial state.
  clear: () => {},
}));
