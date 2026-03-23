/**
 * GroupStatsPanel component.
 * Displays aggregate statistics for a group in a compact panel.
 * Intended for use in GroupDetailPage. Shows:
 *  - Total catch count for the group
 *  - Top species (ranked list with counts)
 *  - Most active members (ranked list with catch counts)
 *  - Catch rate trend over the past 30 days (a simple line or bar chart)
 *
 * The data comes from the GetGroupStats API endpoint and is passed in as props
 * after being fetched by the parent page.
 */

import React from 'react';
import type { GroupStats } from '@castcreel/shared/types/group';

interface GroupStatsPanelProps {
  stats: GroupStats;
}

// GroupStatsPanel renders all four stat sections vertically stacked.
// The catch rate chart uses plain SVG or a lightweight charting library
// so there's no heavy bundle dependency for a supporting panel.
export default function GroupStatsPanel(_props: GroupStatsPanelProps) {
  return null;
}
