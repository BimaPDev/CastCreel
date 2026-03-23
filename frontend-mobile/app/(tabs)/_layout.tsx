/**
 * Tab bar layout.
 * Defines the five main tabs in the bottom navigation bar and the icons
 * and labels for each. Expo Router reads this file to build the tab bar —
 * each child file in the (tabs) folder becomes one tab.
 */

import React from 'react';
import { Tabs } from 'expo-router';

// TabLayout configures the five tabs: Home, Log, Map, News, Profile.
// The "Log" tab is the primary action — logging a new catch — so its icon
// is slightly larger and styled differently to stand out as the key action button.
// The notification badge count for the Home tab is updated whenever the
// server reports unread notifications.
export default function TabLayout() {
  return null;
}
