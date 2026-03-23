/**
 * VisibilitySelector component.
 * A segmented control or dropdown that lets the user choose who can see a catch:
 * Private (only me), Friends, Group (specific groups), or Public (blurred world map).
 *
 * When the user selects Group, a secondary multi-select picker appears below the
 * main control so they can choose which of their groups to share the catch to.
 * A catch can be shared to multiple groups at once.
 *
 * Note: Layer 5 (wildlife data contribution) is always on and is not shown here —
 * it's explained once during onboarding and doesn't need a per-catch toggle.
 */

import React from 'react';
import { VisibilityLevel } from '@castcreel/shared/types/catch';
import type { Group } from '@castcreel/shared/types/group';

interface VisibilitySelectorProps {
  value: VisibilityLevel;
  onChange: (level: VisibilityLevel) => void;
  // The IDs of the groups currently selected when visibility is Group.
  selectedGroupIds: number[];
  // Called when the user changes the group selection in the secondary picker.
  onGroupsChange: (groupIds: number[]) => void;
  // The groups the current user belongs to. Used to populate the secondary picker.
  // Only needed when visibility can be Group; can be an empty array otherwise.
  userGroups: Group[];
  // If true the control is shown but not clickable.
  // Used when displaying a catch that can't be edited.
  disabled?: boolean;
}

// VisibilitySelector renders four clearly labelled options with icons.
// The selected option is highlighted. Each option has a short description
// so users understand what they're choosing — "Only you", "Your friends",
// "Specific groups", or "Everyone (location blurred)".
// When "Specific groups" is selected, a secondary multi-select list of the
// user's groups slides in below the main control.
export default function VisibilitySelector(_props: VisibilitySelectorProps) {
  return null;
}
