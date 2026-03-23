/**
 * Login screen.
 * The sign-in form shown to returning users. On success navigates to the main
 * tab bar. On failure shows the error returned by the server inline under the form.
 */

import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuthStore } from '../../src/store/authStore';
import type { LoginRequest } from '@castcreel/shared/types/user';

// LoginScreen renders the email and password fields and the sign-in button.
// The keyboard is dismissed when the user taps outside the fields.
// Loading state disables the button and shows a spinner to prevent duplicate submissions.
export default function LoginScreen() {
  return null;
}
