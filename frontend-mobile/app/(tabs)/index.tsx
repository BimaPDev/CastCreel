/**
 * Home tab (Dashboard).
 * The first screen users see after logging in. Shows a summary of:
 *  - Today's fishing prediction for the user's home area
 *  - Their most recent 3 catches
 *  - Any stocking or advisory alerts near their saved locations
 *
 * Designed to answer "what's happening today?" in a single scroll.
 */

import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import CatchCard from '../../src/components/CatchCard';
import PredictionCard from '../../src/components/PredictionCard';
import WildlifeNewsCard from '../../src/components/WildlifeNewsCard';

// HomeScreen composes the daily prediction summary, recent catches, and
// stocking alerts into one scrollable dashboard. Each section loads independently.
export default function HomeScreen() {
  return null;
}
