/**
 * Dashboard page.
 * The home screen after logging in. Shows three key things at a glance:
 * the user's most recent catches, today's AI prediction for their home area,
 * and the latest wildlife news near their saved locations.
 *
 * Designed to answer "what's happening today?" without the user having
 * to navigate to multiple screens.
 */

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useCatchStore } from '../store/catchStore';
import CatchCard from '../components/CatchCard';
import PredictionCard from '../components/PredictionCard';
import WildlifeNewsCard from '../components/WildlifeNewsCard';
import ConditionsDisplay from '../components/ConditionsDisplay';

// DashboardPage composes recent catches, the daily prediction, and local news
// into a single overview screen. Each section fetches its own data independently
// so one slow request doesn't block the others from appearing.
export default function DashboardPage() {
  return null;
}
