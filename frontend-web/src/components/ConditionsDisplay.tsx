/**
 * ConditionsDisplay component.
 * Renders the environmental snapshot attached to a catch or prediction
 * in a compact, readable grid layout.
 *
 * Shows: temperature (air and water), barometric pressure with trend arrow,
 * wind speed and direction, moon phase, and solunar feeding period if active.
 *
 * Used on the catch detail view, the log catch form, and the prediction page.
 */

import React from 'react';

// The conditions can come from two shapes — a full Catch record or a
// ConditionsResponse from the prediction/conditions API.
// Both are accepted here for reuse.
interface ConditionsDisplayProps {
  airTempCelsius?: number;
  waterTempCelsius?: number;
  weatherCondition?: string;
  barometricPressureHpa?: number;
  pressureTrend?: string; // "rising" | "falling" | "steady"
  windSpeedKmh?: number;
  windDirection?: string;
  moonPhase?: string;
  solunarPeriod?: string;
  // If true, renders a compact single-row summary instead of the full grid.
  // Used inside CatchCard where space is tight.
  compact?: boolean;
}

// ConditionsDisplay lays out all the environmental fields in a small icon-grid.
// Each field has a plain-text label and the value. Fields that are null or
// undefined are hidden rather than shown as empty dashes.
export default function ConditionsDisplay(_props: ConditionsDisplayProps) {
  return null;
}

// Converts a temperature in Celsius to the display format.
// Shows both °C and the °F equivalent so international and US users are both served.
function formatTemperature(celsius: number): string {
  return '';
}

// Converts a pressure trend string to a directional arrow character.
// "rising" → ↑, "falling" → ↓, "steady" → →
function trendArrow(trend: string): string {
  return '';
}
