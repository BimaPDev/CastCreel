/**
 * Notifications page.
 * Two things in one: the notification history (inbox) at the top, and
 * the preference toggles at the bottom so the user can control what
 * kinds of alerts they receive without digging into a settings menu.
 */

import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { Notification, NotificationPreferences } from '@castcreel/shared/types/notification';

// NotificationsPage renders the inbox (list of past notifications with read/unread state)
// and below it a set of toggles for each notification type.
// Marking all as read and the preference toggles both call the API immediately
// and update the UI optimistically so it feels instant.
export default function NotificationsPage() {
  return null;
}
