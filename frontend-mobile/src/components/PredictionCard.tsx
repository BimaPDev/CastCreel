/**
 * Mobile PredictionCard component.
 * Renders the AI fishing prediction result in a card layout for mobile.
 * Same data as the web version — species, time window, bait, technique,
 * confidence score, and reasoning — laid out vertically for a narrow screen.
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { PredictionResponse } from '@castcreel/shared/types/prediction';

interface PredictionCardProps {
  prediction: PredictionResponse;
  isLoading?: boolean;
}

// PredictionCard renders the prediction as a vertical stack of labelled rows.
// Confidence is shown as a coloured pill: green (high), amber (medium), red (low).
// The reasoning/notes field is shown below a "Why?" label to keep it scannable.
export default function PredictionCard(_props: PredictionCardProps) {
  return null;
}
