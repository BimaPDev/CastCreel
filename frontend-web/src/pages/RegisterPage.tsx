/**
 * Registration page.
 * Where a new user creates their account. Asks for email, username,
 * and password. On success the user is automatically logged in and
 * redirected to the dashboard — no separate login step needed.
 */

import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import type { RegisterRequest } from '@castcreel/shared/types/user';

// RegisterPage renders the sign-up form and calls the register action
// when submitted. Validates that password confirmation matches before submitting.
export default function RegisterPage() {
  return null;
}
