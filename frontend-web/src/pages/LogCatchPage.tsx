/**
 * Log catch page.
 * The main catch entry form. This is one of the most important screens
 * in the whole app — it should feel fast and low-friction.
 *
 * Flow:
 *  1. User picks or takes a photo.
 *  2. The photo is sent to the AI service, which identifies species,
 *     color, and body condition. A spinner shows while this happens.
 *  3. GPS is captured automatically.
 *  4. Environmental conditions are fetched automatically in the background.
 *  5. The form shows pre-filled fields the user can review and correct.
 *  6. User sets visibility and submits.
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import PhotoUpload from '../components/PhotoUpload';
import ConditionsDisplay from '../components/ConditionsDisplay';
import VisibilitySelector from '../components/VisibilitySelector';
import type { CreateCatchRequest } from '@castcreel/shared/types/catch';

// LogCatchPage manages the full catch logging flow — photo selection,
// AI auto-fill, location capture, and final form submission.
// All the heavy lifting (AI call, conditions fetch) is triggered
// by PhotoUpload and happens in the background while the user fills in notes.
export default function LogCatchPage() {
  return null;
}
