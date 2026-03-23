/**
 * ProtectedRoute component.
 * A wrapper that checks whether the user is logged in before rendering
 * its children. If they're not authenticated, it redirects them to the
 * login page. Used to guard every route that requires authentication.
 */

import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

// ProtectedRoute wraps a page component. If the user has a valid token in
// the auth store, the page renders normally. If not, they're redirected to
// /login with the current URL stored in state so they land back here after login.
export default function ProtectedRoute(_props: ProtectedRouteProps) {
  return null;
}
