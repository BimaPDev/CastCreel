/**
 * CatchCard component.
 * Displays a summary of a single catch record in a card layout.
 * Used in the catch history list and on the dashboard.
 */

import React from 'react';
import type { Catch } from '@castcreel/shared/types/catch';
import { VisibilityLevel } from '@castcreel/shared/types/catch';

interface CatchCardProps {
  catch_: Catch;
  // Called when the user clicks the card — used to navigate to the full detail view.
  onClick?: (id: number) => void;
  // If true, shows edit and delete buttons. Used in the user's own catch list.
  // Not shown when viewing a friend's catch or a public catch.
  showActions?: boolean;
}

// CatchCard shows the fish photo thumbnail, species name, size (if available),
// the conditions at time of catch (temperature, pressure trend, moon phase),
// and a small badge indicating who can see this catch (private/friends/public).
export default function CatchCard(_props: CatchCardProps) {
  return null;
}

// Returns a human-readable label and color for the visibility level.
// Used to render the small badge on the card.
function getVisibilityLabel(level: VisibilityLevel): { label: string; color: string } {
  return { label: '', color: '' };
}
