/**
 * Login page.
 * The first screen a returning user sees. Contains the email/password form
 * and a link to the registration page for new users.
 */

import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import type { LoginRequest } from '@castcreel/shared/types/user';

// LoginPage renders the sign-in form and handles submitting credentials.
// On success it redirects to the dashboard. On failure it shows the error message
// returned by the server (e.g., "incorrect password" or "account not found").
export default function LoginPage() {
  return null;
}
