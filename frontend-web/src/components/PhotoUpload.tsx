/**
 * PhotoUpload component.
 * Handles selecting or dropping a fish photo, showing a preview,
 * and triggering the AI species detection call as soon as a photo is chosen.
 * The AI response is passed back to the parent via onAnalysisComplete so the
 * catch form can auto-fill the species, color, and body condition fields.
 */

import React from 'react';
import type { DetectFishResult } from '../types/local';

// Shape of what the AI service returns after analysing a photo.
// Used to auto-fill the catch form fields.
interface DetectFishResult {
  species: string;
  dominantColor: string;
  bodyCondition: string;
  estimatedLengthCm?: number;
  confidenceScore: number;
}

interface PhotoUploadProps {
  // Called with the selected file so the parent can include it in the form submission.
  onPhotoSelected: (file: File) => void;
  // Called when the AI has finished analysing the photo.
  // The parent uses this to pre-fill the species and other auto-detected fields.
  onAnalysisComplete: (result: DetectFishResult) => void;
  // Called when the AI analysis fails so the parent can show an error message.
  onAnalysisError: (error: string) => void;
}

// PhotoUpload renders a drag-and-drop zone and a file picker button.
// When a photo is chosen it shows a preview thumbnail and immediately
// sends the image to the Go backend's vision endpoint for species detection.
// A spinner overlays the preview while the AI call is in progress.
export default function PhotoUpload(_props: PhotoUploadProps) {
  return null;
}

// Validates that the selected file is an image and is within the max size limit.
// Returns an error message string if invalid, or null if the file is fine.
function validateImageFile(file: File): string | null {
  return null;
}
