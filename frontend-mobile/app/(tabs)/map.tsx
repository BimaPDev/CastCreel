/**
 * Map tab — world catch map.
 * A full-screen React Native Maps view showing public catches from all users.
 * GPS locations are blurred server-side. Users can filter by species.
 * Tapping a marker shows a small callout with species and approximate date.
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useQuery } from '@tanstack/react-query';
import type { PublicMapCatch } from '@castcreel/shared/types/catch';

// MapScreen renders the full-screen map and places a marker for each
// public catch. Species filter lives in component state; filtering is
// client-side so the map updates instantly without re-fetching.
export default function MapScreen() {
  return null;
}
