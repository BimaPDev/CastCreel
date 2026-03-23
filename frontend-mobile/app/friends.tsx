/**
 * Friends screen.
 * Manage social connections: see the current friends list, respond to
 * pending incoming requests, and search for new people to add by username.
 */

import React from 'react';
import { FlatList, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { FriendSummary, PendingRequest } from '@castcreel/shared/types/friend';

// FriendsScreen has three sections rendered top to bottom:
//  1. Pending requests with Accept / Decline buttons
//  2. Current friends list with a Remove button per friend
//  3. Search bar to find and add new friends
export default function FriendsScreen() {
  return null;
}
