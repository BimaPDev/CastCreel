/**
 * NavBar component.
 * The top navigation bar present on every protected page.
 * Shows the CastCreel logo/name, navigation links, and a notification bell
 * with an unread-count badge. Also has the user avatar and a logout option.
 */

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

// NavBar renders the persistent top bar. The active route is highlighted.
// The notification bell badge count comes from a background query that
// runs periodically rather than on every render, so it doesn't hammer the API.
export default function NavBar() {
  return null;
}

// Fetches the unread notification count to show on the bell badge.
// Returns 0 if the user has no unread notifications or the fetch fails.
function useUnreadCount(): number {
  return 0;
}
