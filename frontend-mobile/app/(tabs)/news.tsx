/**
 * News tab — wildlife news feed.
 * A scrollable list of recent wildlife events near the user's saved locations.
 * Stocking events, regulation changes, water advisories, invasive species alerts.
 * Filtered by the server to what's relevant for this specific user.
 */

import React from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import WildlifeNewsCard from '../../src/components/WildlifeNewsCard';
import type { WildlifeEvent, EventType } from '@castcreel/shared/types/wildlife';

// NewsScreen fetches the personalized wildlife news feed and renders it
// as a FlatList for efficient scrolling through potentially long feeds.
// Pull-to-refresh triggers a manual re-fetch.
export default function NewsScreen() {
  return null;
}
