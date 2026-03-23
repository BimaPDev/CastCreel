/**
 * Mobile CatchCard component.
 * Displays a single catch record in a card layout optimised for touch and
 * smaller screens. The tap target is the whole card, not a small link.
 * Same purpose as the web version but styled for React Native with
 * TouchableOpacity instead of an anchor tag.
 */

import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import type { Catch } from '@castcreel/shared/types/catch';
import { VisibilityLevel } from '@castcreel/shared/types/catch';

interface CatchCardProps {
  catch_: Catch;
  // Called when the user taps the card — navigates to the detail screen.
  onPress?: (id: number) => void;
}

// CatchCard shows the photo thumbnail, species, estimated size, and a
// compact conditions summary. The visibility badge is shown as a small
// coloured pill in the top-right corner of the photo.
export default function CatchCard(_props: CatchCardProps) {
  return null;
}
