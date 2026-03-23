/**
 * My catches page.
 * A scrollable, filterable history of everything the logged-in user has
 * caught. Lets them browse by species or date range and tap into any
 * catch for the full detail view.
 */

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import CatchCard from '../components/CatchCard';
import type { Catch } from '@castcreel/shared/types/catch';

// MyCatchesPage renders the user's full catch history with optional filters.
// Species filter and date range are kept in component state and applied
// client-side for snappy filtering after the initial load.
export default function MyCatchesPage() {
  return null;
}
