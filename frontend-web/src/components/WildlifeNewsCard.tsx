/**
 * WildlifeNewsCard component.
 * Renders a single wildlife event from the news feed.
 * Shows the event type as a coloured badge (blue for stocking, orange for
 * advisories, red for invasive species, etc.), the title, the affected area,
 * the source agency, and the date.
 */

import React from 'react';
import type { WildlifeEvent } from '@castcreel/shared/types/wildlife';
import { EventType } from '@castcreel/shared/types/wildlife';

interface WildlifeNewsCardProps {
  event: WildlifeEvent;
  // Called when the user clicks to read the full description.
  onExpand?: (id: number) => void;
}

// WildlifeNewsCard shows enough information to understand what happened and
// where, without expanding. Clicking expands to show the full description
// and the source link. The event type badge uses a distinct colour per type
// so users can scan the feed quickly without reading every title.
export default function WildlifeNewsCard(_props: WildlifeNewsCardProps) {
  return null;
}

// Returns a colour and icon for each event type to make the badge visually distinct.
function getEventTypeBadge(type: EventType): { color: string; label: string } {
  return { color: '', label: '' };
}
