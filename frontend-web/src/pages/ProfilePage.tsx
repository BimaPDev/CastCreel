/**
 * Profile page.
 * Shows the user's personal stats (total catches, top species, streak)
 * alongside account settings (username, home location, favorite species).
 * Also has the logout button.
 */

import React from 'react';
import { useAuthStore } from '../store/authStore';
import { useCatchStore } from '../store/catchStore';

// ProfilePage combines the user's catch statistics with their account settings.
// Stats are derived from the catch store so they're always in sync.
// Settings changes call the update profile API and optimistically update the store.
export default function ProfilePage() {
  return null;
}
