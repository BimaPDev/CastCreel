/**
 * Log tab — catch logging screen.
 * The core feature of the whole app. This screen opens the camera first,
 * then auto-fills as much of the catch form as possible from the photo,
 * GPS, and environmental conditions. The user just reviews and confirms.
 *
 * Flow on this screen:
 *  1. CameraCapture opens immediately — user takes a photo.
 *  2. Photo is sent to AI service; loading indicator shown.
 *  3. LocationCapture fires in parallel to get GPS.
 *  4. AI results pre-fill species, color, body condition, estimated size.
 *  5. Conditions are fetched automatically in the background.
 *  6. User reviews, picks visibility, adds optional notes, and submits.
 */

import React from 'react';
import { ScrollView, View, Text, TextInput, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import CameraCapture from '../../src/components/CameraCapture';
import LocationCapture from '../../src/components/LocationCapture';
import ConditionsDisplay from '../../src/components/ConditionsDisplay';
import VisibilitySelector from '../../src/components/VisibilitySelector';
import type { CreateCatchRequest } from '@castcreel/shared/types/catch';

// LogScreen manages the full catch logging flow on mobile.
// State machine: idle → camera_open → analyzing → form_ready → submitting → done.
export default function LogScreen() {
  return null;
}
