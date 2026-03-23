/**
 * Saved locations page.
 * Shows all the fishing spots the user has bookmarked for wildlife monitoring.
 * Each location has a name, its coordinates, and the alert radius. The user
 * can adjust the radius per location, add new spots, or remove old ones.
 */

import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { SavedLocation } from '@castcreel/shared/types/location';

// LocationsPage renders the list of saved spots and a form to add a new one.
// Radius editing is done inline — clicking the radius value on an existing
// location opens a small input field without navigating away.
export default function LocationsPage() {
  return null;
}
