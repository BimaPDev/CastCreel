/**
 * Prediction page.
 * Lets a user ask the AI for fishing advice before they head out.
 * They set their target location (pre-filled from their home location or GPS)
 * and the date they plan to fish. The page sends the request and displays
 * the result — species recommendation, best time window, bait suggestion,
 * and how confident the model is, plus the plain-English reasoning.
 */

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import PredictionCard from '../components/PredictionCard';
import ConditionsDisplay from '../components/ConditionsDisplay';
import type { PredictionRequest } from '@castcreel/shared/types/prediction';

// PredictionPage manages the request form and displays the prediction result.
// The request is only sent when the user explicitly submits — not on every
// keystroke — because the prediction call is relatively expensive.
export default function PredictionPage() {
  return null;
}
