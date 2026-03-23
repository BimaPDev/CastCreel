/**
 * Mobile VisibilitySelector component.
 * A bottom sheet picker that lets the user choose who can see a catch:
 * Private, Friends, Group, or Public. On mobile a bottom sheet is more natural
 * than a dropdown for selecting between a small number of options.
 *
 * When the user selects Group, a second bottom sheet opens immediately on top,
 * showing all the groups the user belongs to as a multi-select list so they can
 * pick one or more groups to share the catch to.
 */

import React from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList, StyleSheet } from 'react-native';
import { VisibilityLevel } from '@castcreel/shared/types/catch';
import type { Group } from '@castcreel/shared/types/group';

interface VisibilitySelectorProps {
  value: VisibilityLevel;
  onChange: (level: VisibilityLevel) => void;
  // The IDs of the groups currently selected when visibility is Group.
  selectedGroupIds: number[];
  // Called when the user confirms their group selection in the second bottom sheet.
  onGroupsChange: (groupIds: number[]) => void;
  // The groups the current user belongs to. Populates the second bottom sheet.
  userGroups: Group[];
  disabled?: boolean;
}

// VisibilitySelector shows the current visibility value as a tappable row.
// Tapping it opens a first modal bottom sheet with four options (Private, Friends,
// Group, Public), each with a label, short explanation, and a checkmark on the
// currently selected one. Selecting Group dismisses the first sheet and immediately
// opens a second bottom sheet listing the user's groups with multi-select checkboxes.
export default function VisibilitySelector(_props: VisibilitySelectorProps) {
  return null;
}

const _styles = StyleSheet.create({});
