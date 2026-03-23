/**
 * Notifications API functions.
 * Manages the in-app notification inbox and preference settings.
 */

import type { ApiClient } from './client';
import type { Notification, NotificationPreferences } from '../types/notification';

// Fetches the user's current notification toggle settings.
// Used when loading the notification preferences screen.
export async function getNotificationPreferences(
  client: ApiClient,
): Promise<NotificationPreferences> {
  return client.get<NotificationPreferences>('/notifications/preferences');
}

// Saves the user's updated notification preferences.
// Each toggle (stocking alerts, regulation changes, etc.) can be
// independently turned on or off.
export async function updateNotificationPreferences(
  client: ApiClient,
  preferences: Partial<NotificationPreferences>,
): Promise<NotificationPreferences> {
  return client.put<NotificationPreferences>('/notifications/preferences', preferences);
}

// Fetches the user's notification history — all alerts sent to them,
// ordered newest first, with read/unread status on each.
export async function getNotificationHistory(
  client: ApiClient,
): Promise<Notification[]> {
  return client.get<Notification[]>('/notifications');
}

// Marks a single notification as read when the user taps on it.
export async function markNotificationRead(
  client: ApiClient,
  notificationId: number,
): Promise<void> {
  return client.post<void>(`/notifications/${notificationId}/read`);
}

// Marks every unread notification for the current user as read.
// The "clear all" action in the notification inbox.
export async function markAllNotificationsRead(client: ApiClient): Promise<void> {
  return client.post<void>('/notifications/read-all');
}
