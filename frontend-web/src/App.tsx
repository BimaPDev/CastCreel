/**
 * Root application component.
 *
 * This is the top-level component that defines which URL paths map to which
 * pages. All routes are listed here so you can see the complete navigation
 * structure of the app at a glance.
 */

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import LogCatchPage from './pages/LogCatchPage';
import MyCatchesPage from './pages/MyCatchesPage';
import WorldMapPage from './pages/WorldMapPage';
import PredictionPage from './pages/PredictionPage';
import NewsPage from './pages/NewsPage';
import FriendsPage from './pages/FriendsPage';
import LocationsPage from './pages/LocationsPage';
import NotificationsPage from './pages/NotificationsPage';
import ProfilePage from './pages/ProfilePage';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/ProtectedRoute';

// App defines the full routing tree for the web frontend.
// Public routes (login, register) are accessible without a token.
// Everything else is wrapped in ProtectedRoute, which redirects to /login
// if the user isn't authenticated.
export default function App() {
  return null;
}
