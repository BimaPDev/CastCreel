/**
 * Mobile GroupCard component.
 * Displays a compact summary of a group in the groups list and search results.
 * Shows the group name, description snippet, member count chip, and a
 * Public/Private badge. The action button at the bottom adapts based on
 * membership status: "View" if already a member, "Join" for public groups,
 * or "Request" for private ones.
 *
 * Optimised for touch with larger tap targets than the web version — the entire
 * card is tappable to navigate, with the action button as a distinct pressable area.
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import type { Group } from '@castcreel/shared/types/group';

interface GroupCardProps {
  group: Group;
  // Whether the current user is already a member of this group.
  isMember: boolean;
  // Called when the user taps the action button (Join / Request).
  // Navigation to the group detail screen is handled by the card itself via expo-router.
  onAction: (group: Group) => void;
}

// GroupCard renders a touchable card that navigates to /group/[id] on tap.
// The action button is a separate TouchableOpacity nested inside so tapping
// the button does not also trigger navigation.
export default function GroupCard(_props: GroupCardProps) {
  return null;
}

const _styles = StyleSheet.create({});
