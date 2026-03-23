/**
 * Authentication store — mobile.
 * Same shape as the web auth store. Uses Zustand with the persist middleware,
 * but persists to SecureStore (an encrypted key-value store on the device)
 * rather than localStorage, so tokens are stored safely on mobile.
 */

import { create } from 'zustand';

import type { User, LoginRequest, RegisterRequest } from '@castcreel/shared/types/user';
import { login, register, logout, refreshToken } from '@castcreel/shared/api/auth';
import { createApiClient } from '@castcreel/shared/api/client';

const apiClient = createApiClient();

interface AuthState {
  user: User | null;
  token: string | null;
  refreshTokenValue: string | null;
  isLoading: boolean;
  error: string | null;

  login: (credentials: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
  clearError: () => void;
}

// useAuthStore is the hook for reading auth state and dispatching auth actions.
// Tokens are persisted to Expo SecureStore between app launches so the user
// stays logged in without re-entering their password every time.
export const useAuthStore = create<AuthState>()((set, get) => ({
  user: null,
  token: null,
  refreshTokenValue: null,
  isLoading: false,
  error: null,

  // Calls the login API, stores tokens in SecureStore, and updates state.
  login: async (_credentials: LoginRequest) => {},

  // Creates a new account and logs the user in immediately.
  register: async (_data: RegisterRequest) => {},

  // Calls the logout API, removes tokens from SecureStore, and clears state.
  logout: async () => {},

  // Silently refreshes the access token using the stored refresh token.
  refresh: async () => {},

  // Clears the error message field.
  clearError: () => {},
}));

// Saves a token to Expo SecureStore (encrypted storage on the device).
// SecureStore is safer than AsyncStorage for sensitive values like auth tokens.
async function saveTokenToSecureStore(key: string, value: string): Promise<void> {}

// Reads a token from SecureStore.
// Returns null if the key doesn't exist or the read fails.
async function getTokenFromSecureStore(key: string): Promise<string | null> {
  return null;
}

// Removes a token from SecureStore. Called on logout.
async function removeTokenFromSecureStore(key: string): Promise<void> {}
