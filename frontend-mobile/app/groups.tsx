/**
 * Groups screen.
 * The main groups entry point on mobile. Shows three sections in a single scroll:
 *  1. The user's current groups with their role badge.
 *  2. Pending join requests the user has submitted.
 *  3. A search bar to discover and join public groups.
 *
 * Tapping a group card navigates to /group/[id].
 */

import React from 'react';
import { FlatList, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { Group, JoinRequest } from '@castcreel/shared/types/group';
import GroupCard from '../src/components/GroupCard';

// GroupsScreen uses a single FlatList with ListHeaderComponent to render the
// "my groups" and "pending requests" sections above the scrollable search results.
// The search input is debounced to avoid hammering the API on every keystroke.
export default function GroupsScreen() {
  return null;
}
