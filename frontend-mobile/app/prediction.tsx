/**
 * Prediction screen.
 * Lets the user ask for a fishing prediction before heading out.
 * Location pre-fills from GPS or the user's home area. Date defaults to today.
 * The prediction card shows species, time window, bait, technique, and confidence.
 */

import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import PredictionCard from '../src/components/PredictionCard';
import ConditionsDisplay from '../src/components/ConditionsDisplay';
import type { PredictionRequest } from '@castcreel/shared/types/prediction';

// PredictionScreen holds the location/date inputs and the prediction result.
// The request only fires when the user taps "Get Prediction" — not automatically
// on mount — because each prediction call touches the AI service.
export default function PredictionScreen() {
  return null;
}
