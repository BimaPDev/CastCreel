/**
 * Catch detail screen.
 * Shows the full record for a single catch — full-size photo, all the
 * auto-detected fields, the complete environmental conditions, and the
 * visibility setting. If the user owns this catch, shows edit and delete buttons.
 *
 * Accessed by tapping a CatchCard anywhere in the app.
 * The catch ID comes from the URL: /catch/123
 */

import React from 'react';
import { ScrollView, View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import ConditionsDisplay from '../../src/components/ConditionsDisplay';
import VisibilitySelector from '../../src/components/VisibilitySelector';
import type { Catch } from '@castcreel/shared/types/catch';

// CatchDetailScreen fetches the full catch record and displays it.
// The edit flow navigates to a separate edit form (not shown here yet).
// The delete action shows a confirmation dialog before calling the API.
export default function CatchDetailScreen() {
  return null;
}
