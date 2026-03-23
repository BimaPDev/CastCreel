/**
 * Locations screen.
 * Manage saved fishing spots. Shows all saved locations with their names,
 * coordinates, and alert radii. The user can add a new spot (using their
 * current GPS or by entering coordinates), adjust the radius on an existing
 * spot, or remove a spot entirely.
 */

import React from 'react';
import { FlatList, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { SavedLocation } from '@castcreel/shared/types/location';

// LocationsScreen shows the list of saved spots and an "Add Spot" button.
// Tapping a spot opens a bottom sheet with radius editing and a delete option.
// The "Add Spot" flow captures current GPS coordinates automatically.
export default function LocationsScreen() {
  return null;
}
