/**
 * MapMarker component.
 * A custom Leaflet marker used on the world map to represent a single public catch.
 * Clicking a marker shows a small popup with the species and the (approximate) date.
 * The marker icon changes shape or colour based on the species family to make
 * clusters visually scannable.
 */

import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import type { PublicMapCatch } from '@castcreel/shared/types/catch';

interface MapMarkerProps {
  catch_: PublicMapCatch;
}

// MapMarker places a clickable marker on the Leaflet map for one public catch.
// The popup shows the species and approximate catch date.
// The exact location is already blurred server-side — we display exactly what
// the server sent without any further modification.
export default function MapMarker(_props: MapMarkerProps) {
  return null;
}

// Returns the Leaflet icon to use for a given species.
// Fish from the same family (bass, trout, pike, etc.) share an icon style
// so heavy-catch areas are scannable by family at a glance.
function getSpeciesIcon(species: string) {
  return null;
}
