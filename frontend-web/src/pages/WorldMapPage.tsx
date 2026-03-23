/**
 * World map page.
 * Shows a Leaflet map populated with public catches from all users.
 * Locations are deliberately blurred by the server to protect exact fishing spots.
 * Users can filter by species to see where a particular fish is being caught.
 *
 * This is a read-only, publicly visible view — even logged-out users can see it
 * (though they need to log in to see who caught what).
 */

import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { useQuery } from '@tanstack/react-query';
import MapMarker from '../components/MapMarker';
import type { PublicMapCatch } from '@castcreel/shared/types/catch';

// WorldMapPage renders the Leaflet map, fetches public catch data,
// and places a MapMarker for each catch. Species filter lives in component
// state and filters the markers client-side without re-fetching.
export default function WorldMapPage() {
  return null;
}
