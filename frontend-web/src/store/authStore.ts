/**
 * Authentication store.
 *
 * The single source of truth for who is currently logged in.
 * Any component that needs to know the current user, check if someone is
 * logged in, or trigger a login or logout should use this store.
 *
 * Built with Zustand — a lightweight state manager that doesn't require
 * wrapping the whole app in a context provider.
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { User, LoginRequest, RegisterRequest } from '@castcreel/shared/types/user';
import { login, register, logout, refreshToken } from '@castcreel/shared/api/auth';
import { createApiClient } from '@castcreel/shared/api/client';

const apiClient = createApiClient();

interface AuthState {
  // The logged-in user's profile, or null if nobody is logged in.
  user: User | null;
  // The short-lived JWT used to authenticate API requests.
  token: string | null;
  // The longer-lived token used to get a new access token when the old one expires.
  refreshTokenValue: string | null;
  // True when a login or register request is in flight.
  isLoading: boolean;
  // Any error message from the last auth operation.
  error: string | null;

  // --- Actions ---

  // Sends credentials to the server, stores the returned tokens, and
  // updates the user. Throws on incorrect credentials.
  login: (credentials: LoginRequest) => Promise<void>;

  // Creates a new account, then logs the user in automatically.
  register: (data: RegisterRequest) => Promise<void>;

  // Tells the server to invalidate the refresh token, then clears
  // all local auth state so the user is fully signed out.
  logout: () => Promise<void>;

  // Exchanges the stored refresh token for a new access token.
  // Called automatically by the API client when a request returns 401.
  refresh: () => Promise<void>;

  // Clears any error message (called when the user starts typing again after an error).
  clearError: () => void;
}

// useAuthStore is the hook components call to read auth state or dispatch auth actions.
// Example: const { user, login } = useAuthStore();
export const useAuthStore = create<AuthState>()(
  // persist saves the auth state to localStorage so the user stays logged in
  // across page refreshes. Only the tokens and user are persisted — not loading state.
  persist(
    (set, get) => ({
      user: null,
      token: null,
      refreshTokenValue: null,
      isLoading: false,
      error: null,

      // Calls the login API, stores tokens, and updates the user in state.
      login: async (_credentials: LoginRequest) => {},

      // Calls the register API and immediately logs the new user in.
      register: async (_data: RegisterRequest) => {},

      // Calls logout API and wipes all auth state.
      logout: async () => {},

      // Silently gets a new access token using the stored refresh token.
      refresh: async () => {},

      // Clears the error field so a fresh attempt can be shown cleanly.
      clearError: () => {},
    }),
    {
      name: 'castcreel-auth',
      // Only persist these fields — don't save loading state or errors.
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        refreshTokenValue: state.refreshTokenValue,
      }),
    },
  ),
);
