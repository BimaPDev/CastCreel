/**
 * User-related types.
 * These match the shapes the Go backend sends and receives for user accounts.
 */

// The full user record returned by the API.
// Mirrors the Go User struct in backend/models/user.go.
export interface User {
  id: number;
  email: string;
  username: string;
  home_latitude?: number;
  home_longitude?: number;
  favorite_species: string[];
  push_token?: string;
  created_at: string; // ISO 8601
  updated_at: string;
}

// What the server sends back after a successful login or registration.
// Contains both the short-lived access token and the longer-lived refresh token.
export interface AuthResponse {
  user: User;
  access_token: string;
  refresh_token: string;
}

// What you send to the server when logging in.
export interface LoginRequest {
  email: string;
  password: string;
}

// What you send to the server when creating a new account.
export interface RegisterRequest {
  email: string;
  username: string;
  password: string;
}

// What you send when updating your own profile settings.
export interface UpdateProfileRequest {
  username?: string;
  home_latitude?: number;
  home_longitude?: number;
  favorite_species?: string[];
  push_token?: string;
}
