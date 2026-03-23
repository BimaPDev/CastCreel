/**
 * Prediction-related types.
 * Used when a user asks the app for fishing advice before a trip.
 */

// What you send when asking for a prediction.
// The app pre-fills location from GPS and the date from the calendar.
export interface PredictionRequest {
  latitude: number;
  longitude: number;
  // The date/time the user plans to go fishing. ISO 8601 string.
  target_date: string;
}

// The full prediction returned by the AI service via the Go backend.
export interface PredictionResponse {
  // The species the model thinks is most likely to be caught.
  top_species: string;
  // A human-readable window like "6am–9am" or "dusk".
  best_time_window: string;
  // What bait or lure the model recommends.
  recommended_bait: string;
  // The fishing technique suggested (e.g. "slow retrieve near cover").
  technique: string;
  // How sure the model is, from 0.0 (guessing) to 1.0 (very confident).
  confidence_score: number;
  // Other species worth targeting if the top pick isn't working.
  alternative_species: string[];
  // Plain-language explanation of why this prediction was made —
  // e.g. "Pressure has been falling all day, expect bass to feed shallow at dawn."
  notes: string;
}
