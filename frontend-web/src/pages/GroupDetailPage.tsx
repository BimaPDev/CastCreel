/**
 * Group detail page.
 * Shows everything about a single group in one place:
 *  - The group's catch feed (paginated, newest first)
 *  - The GroupStatsPanel with aggregate stats
 *  - The member list with roles
 *  - Admin/moderator controls (manage members, update settings, generate invite code)
 *    rendered only when the current user has the admin or moderator role
 *
 * The group ID comes from the URL parameter (:groupId).
 */

import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { Group, GroupMember, GroupStats } from '@castcreel/shared/types/group';
import GroupStatsPanel from '../components/GroupStatsPanel';

// GroupDetailPage fetches the group, the current user's membership role,
// the catch feed, and the stats in parallel. The admin controls section is
// conditionally rendered based on whether the current user is admin or moderator.
export default function GroupDetailPage() {
  return null;
}
