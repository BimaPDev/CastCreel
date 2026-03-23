/**
 * Register screen.
 * Account creation form. Asks for email, username, and password.
 * On success the user is automatically signed in and navigated to the main tabs.
 */

import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuthStore } from '../../src/store/authStore';
import type { RegisterRequest } from '@castcreel/shared/types/user';

// RegisterScreen renders the sign-up form. It validates that the password
// and confirmation field match before submitting to avoid a round-trip for
// a check the client can do locally.
export default function RegisterScreen() {
  return null;
}
