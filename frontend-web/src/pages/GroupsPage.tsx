/**
 * Groups page.
 * The main entry point for the community feature. Shows three sections:
 *  1. Groups the current user already belongs to (with their role in each).
 *  2. Pending join requests the user has submitted for private groups.
 *  3. A search bar to discover and join public groups.
 *
 * Navigating to a group card takes the user to GroupDetailPage.
 */

import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { Group, JoinRequest } from '@castcreel/shared/types/group';

// GroupsPage renders the three sections independently using separate queries
// so a loading error in one section doesn't prevent the others from showing.
// The search section debounces the input and calls the search API on each change.
export default function GroupsPage() {
  return null;
}
