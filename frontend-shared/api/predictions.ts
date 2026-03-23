/**
 * Prediction API functions.
 * Sends the user's upcoming fishing context to the backend and returns
 * an AI-generated recommendation.
 */

import type { ApiClient } from './client';
import type { PredictionRequest, PredictionResponse } from '../types/prediction';

// Asks the backend for a fishing prediction based on where and when the user
// plans to fish. The backend forwards this to the Python AI service, which
// blends community patterns with the user's personal catch history to produce
// a recommendation about species, timing, and technique.
export async function getPrediction(
  client: ApiClient,
  request: PredictionRequest,
): Promise<PredictionResponse> {
  return client.get<PredictionResponse>(
    `/predictions?lat=${request.latitude}&lng=${request.longitude}&date=${request.target_date}`,
  );
}
