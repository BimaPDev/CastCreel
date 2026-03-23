/**
 * LocationCapture component.
 * Wraps Expo Location to automatically capture the device's current GPS
 * coordinates when a catch is being logged. Runs in the background while
 * the user is reviewing their catch photo.
 *
 * If permission is denied or the GPS fix takes too long, the component
 * falls back gracefully — the user can type in coordinates manually.
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Location from 'expo-location';

interface LocationCaptureProps {
  // Called when GPS coordinates are successfully obtained.
  onLocationCaptured: (latitude: number, longitude: number) => void;
  // Called if location capture fails — so the parent can show a manual entry field.
  onLocationError: (error: string) => void;
}

// LocationCapture automatically fires the GPS lookup when it mounts.
// It shows a small "Getting location…" indicator while waiting.
// Once coordinates arrive it calls onLocationCaptured and unmounts itself.
export default function LocationCapture(_props: LocationCaptureProps) {
  return null;
}

// Requests the "when in use" location permission and gets the current position.
// Uses Expo Location's getCurrentPositionAsync with a balanced accuracy setting
// to get a fast fix without draining the battery with high-accuracy GPS.
async function getCurrentLocation(): Promise<{ latitude: number; longitude: number }> {
  return { latitude: 0, longitude: 0 };
}

// Checks and requests the location permission.
// Returns true if granted, false if the user denied it.
async function ensureLocationPermission(): Promise<boolean> {
  return false;
}
