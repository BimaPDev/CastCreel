/**
 * CameraCapture component.
 * Wraps Expo Camera to handle the entire photo-taking flow:
 *  1. Request camera permission (first time only)
 *  2. Show the live camera preview
 *  3. Capture the photo when the user taps the shutter button
 *  4. Show a preview of the captured photo with "Use this" / "Retake" options
 *  5. Call onPhotoCaptured with the image file when the user confirms
 *
 * This is the first step of the catch logging flow on mobile.
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';

interface CameraCaptureProps {
  // Called with the captured image as a blob when the user confirms the photo.
  onPhotoCaptured: (imageBlob: Blob, uri: string) => void;
  // Called if the user cancels the camera flow without taking a photo.
  onCancel: () => void;
}

// CameraCapture manages the full camera permission and capture sequence.
// It handles the case where the user denies camera permission by showing
// a friendly message with a button to open system settings.
export default function CameraCapture(_props: CameraCaptureProps) {
  return null;
}

// Checks the current camera permission status and requests it if not granted.
// Returns true if permission was granted, false if denied.
async function ensureCameraPermission(): Promise<boolean> {
  return false;
}

// Converts the Expo photo result (a URI) to a Blob so it can be sent
// to the backend as part of the multipart form upload.
async function uriToBlob(uri: string): Promise<Blob> {
  return new Blob();
}
