/**
 * GroupCard component.
 * Displays a compact summary of a group for use in lists on GroupsPage
 * and in search results. Shows the group's name, description snippet,
 * member count, and a privacy badge (Public or Private). The action
 * button at the bottom right changes depending on whether the user is
 * already a member ("View") or not ("Join" for public, "Request" for private).
 */

import React from 'react';
import type { Group } from '@castcreel/shared/types/group';

interface GroupCardProps {
  group: Group;
  // Whether the current user is already a member of this group.
  // Determines which action button to show.
  isMember: boolean;
  // Called when the user clicks the action button.
  // The parent page owns the join/request mutation logic.
  onAction: (group: Group) => void;
}

// GroupCard renders a card with name, description (truncated to two lines),
// a member count chip, a Public/Private badge, and the contextual action button.
export default function GroupCard(_props: GroupCardProps) {
  return null;
}
