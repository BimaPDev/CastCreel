/**
 * Wildlife news page.
 * A feed of recent events from wildlife agencies — stocking reports,
 * regulation changes, water advisories, and invasive species alerts —
 * filtered to what's relevant for this user based on their saved locations
 * and favorite species.
 */

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import WildlifeNewsCard from '../components/WildlifeNewsCard';
import type { WildlifeEvent, EventType } from '@castcreel/shared/types/wildlife';

// NewsPage fetches the user's personalized news feed and renders a card for
// each event. Users can filter by event type (stocking, regulation, advisory).
// Events are already sorted by the server — most recent and nearest first.
export default function NewsPage() {
  return null;
}
