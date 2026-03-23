/**
 * Group detail screen.
 * Shows the full picture of a single group:
 *  - A catch feed for the group (infinite scroll, newest first)
 *  - Aggregate stats (total catches, top species, most active members, catch rate trend)
 *  - Member list with roles
 *  - Admin/moderator controls — manage members, update group settings, generate invite code —
 *    only visible to users with the admin or moderator role
 *
 * The group ID comes from the URL: /group/123
 */

import React from 'react';
import { ScrollView, View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { Group, GroupMember, GroupStats } from '@castcreel/shared/types/group';

// GroupDetailScreen fetches group details, the current user's membership role,
// the catch feed (paginated), and the stats in parallel.
// The admin controls section is rendered conditionally based on the user's role.
export default function GroupDetailScreen() {
  return null;
}
