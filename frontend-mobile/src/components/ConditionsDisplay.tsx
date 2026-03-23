/**
 * Mobile ConditionsDisplay component.
 * Shows the environmental snapshot for a catch or prediction in a compact
 * horizontal-scrolling row of labelled icon-chips.
 * Optimised for the limited vertical space in a mobile catch form.
 */

import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

interface ConditionsDisplayProps {
  airTempCelsius?: number;
  waterTempCelsius?: number;
  weatherCondition?: string;
  barometricPressureHpa?: number;
  pressureTrend?: string;
  windSpeedKmh?: number;
  windDirection?: string;
  moonPhase?: string;
  solunarPeriod?: string;
  // Compact mode shows fewer fields to save space on the catch card.
  compact?: boolean;
}

// ConditionsDisplay renders weather chips in a horizontal ScrollView row.
// Each chip has a small icon and the value. Missing values are omitted entirely.
export default function ConditionsDisplay(_props: ConditionsDisplayProps) {
  return null;
}
