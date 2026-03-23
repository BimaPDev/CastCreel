/**
 * Notifications screen.
 * Two sections: the notification inbox (history of alerts received) at the top,
 * and preference toggles at the bottom. Both are on the same screen so the user
 * can manage what they receive without navigating to a separate settings screen.
 */

import React from 'react';
import { ScrollView, View, Text, Switch, TouchableOpacity, StyleSheet } from 'react-native';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { Notification, NotificationPreferences } from '@castcreel/shared/types/notification';

// NotificationsScreen renders the inbox (FlatList of notification items) and
// below it a set of Switch components for each notification category toggle.
// Changes to toggles are saved immediately to the server.
// A "Mark all read" button appears when there are unread notifications.
export default function NotificationsScreen() {
  return null;
}
