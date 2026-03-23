/**
 * Auth API functions.
 * Handles everything related to logging in, out, and keeping the session alive.
 */

import type { ApiClient } from './client';
import type { AuthResponse, LoginRequest, RegisterRequest } from '../types/user';

// Sends email and password to the backend and returns the user record along
// with both the short-lived access token and the longer-lived refresh token.
// The caller is responsible for storing the tokens (in the auth store).
export async function login(
  client: ApiClient,
  credentials: LoginRequest,
): Promise<AuthResponse> {
  return client.post<AuthResponse>('/auth/login', credentials);
}

// Creates a new account. On success the server automatically returns tokens
// so the user is immediately logged in without a separate login step.
export async function register(
  client: ApiClient,
  data: RegisterRequest,
): Promise<AuthResponse> {
  return client.post<AuthResponse>('/auth/register', data);
}

// Tells the server to invalidate the user's refresh token.
// After this, the refresh token can no longer be used to get new access tokens.
// The client should also clear its locally stored tokens after calling this.
export async function logout(client: ApiClient): Promise<void> {
  return client.post<void>('/auth/logout');
}

// Exchanges a still-valid refresh token for a fresh access token.
// Called automatically when the access token is about to expire so the user
// doesn't get unexpectedly logged out mid-session.
export async function refreshToken(
  client: ApiClient,
  currentRefreshToken: string,
): Promise<AuthResponse> {
  return client.post<AuthResponse>('/auth/refresh', {
    refresh_token: currentRefreshToken,
  });
}
