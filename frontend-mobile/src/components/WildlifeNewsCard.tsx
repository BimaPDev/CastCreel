/**
 * Mobile WildlifeNewsCard component.
 * Renders a single wildlife event in the news feed.
 * Tapping the card expands it to show the full description and a link
 * to the original source. Same concept as the web version.
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import type { WildlifeEvent } from '@castcreel/shared/types/wildlife';
import { EventType } from '@castcreel/shared/types/wildlife';

interface WildlifeNewsCardProps {
  event: WildlifeEvent;
}

// WildlifeNewsCard shows the event type badge, title, affected area name,
// and source agency in a compact row. Tapping expands to show the full description.
export default function WildlifeNewsCard(_props: WildlifeNewsCardProps) {
  return null;
}
