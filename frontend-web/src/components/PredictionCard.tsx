/**
 * PredictionCard component.
 * Displays the result of a fishing prediction in a readable, scannable layout.
 * Shows the top species, best time window, recommended bait, technique,
 * confidence level as a visual bar, and the plain-English reasoning.
 */

import React from 'react';
import type { PredictionResponse } from '@castcreel/shared/types/prediction';

interface PredictionCardProps {
  prediction: PredictionResponse;
  // True while the prediction is loading — shows a skeleton placeholder.
  isLoading?: boolean;
}

// PredictionCard renders the full prediction response in a card.
// The confidence score is shown as a coloured progress bar
// (green = high confidence, amber = moderate, red = low) so users can
// quickly gauge how much to trust the recommendation.
export default function PredictionCard(_props: PredictionCardProps) {
  return null;
}

// Maps a 0.0–1.0 confidence score to a colour name and label.
function confidenceColor(score: number): { color: string; label: string } {
  return { color: '', label: '' };
}
