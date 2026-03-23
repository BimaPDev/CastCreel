/**
 * Root layout.
 * The outermost wrapper for the entire mobile app.
 * This runs once when the app starts and sets up:
 *  - TanStack Query client (server state cache)
 *  - Auth state restoration from secure storage
 *  - Push notification permission request
 *  - The slot where child routes render
 *
 * Expo Router uses this file as the root of the navigation tree.
 * Every other screen is nested inside it.
 */

import React from 'react';
import { Slot } from 'expo-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StatusBar } from 'expo-status-bar';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 5 * 60 * 1000,
    },
  },
});

// RootLayout wraps the whole app with the necessary providers and handles
// any global startup work — restoring the auth session, registering for
// push notifications, and configuring the status bar.
export default function RootLayout() {
  return null;
}

// Checks whether the app has a stored auth token and, if so, restores
// the session so the user doesn't get logged out between app launches.
// Called once inside RootLayout's useEffect on mount.
async function restoreAuthSession(): Promise<void> {}

// Requests permission from the device to send push notifications and,
// if granted, registers the device token with the backend so the server
// can send stocking alerts and other notifications to this device.
async function registerForPushNotifications(): Promise<void> {}
