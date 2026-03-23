/**
 * Profile tab.
 * Shows the user's personal statistics (total catches, top species, personal bests)
 * and account settings (home location, favorite species). Also has the logout button.
 */

import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuthStore } from '../../src/store/authStore';
import { useCatchStore } from '../../src/store/catchStore';

// ProfileScreen shows catch stats at the top and settings below.
// Stats are computed from the local catch store. Settings edits call the API
// and update the store on success.
export default function ProfileScreen() {
  return null;
}
