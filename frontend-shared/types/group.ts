/**
 * Group and community types.
 * These match the shapes the Go backend sends and receives for group-related records.
 * Groups sit between friends and public visibility — members can see catches shared
 * to a group even if they are not personal friends with the person who caught it.
 */

import type { Catch } from './catch';

// The role a member holds within a group.
// Matches the GroupRole constants in backend/models/group.go.
export enum GroupRole {
  Admin = 'admin',
  Moderator = 'moderator',
  Member = 'member',
}

// A community group that users can create, join, and share catches to.
// Mirrors the Go Group struct in backend/models/group.go.
export interface Group {
  id: number;
  name: string;
  description: string;
  created_by: number;
  is_private: boolean;
  // Only present when the current user is an admin and an invite code exists.
  invite_code?: string;
  member_count: number;
  created_at: string; // ISO 8601
  updated_at: string;
}

// A single member of a group with their assigned role.
// Mirrors the Go GroupMember struct in backend/models/group.go.
export interface GroupMember {
  group_id: number;
  user_id: number;
  // The member's username, joined from the users table for display purposes.
  username: string;
  role: GroupRole;
  joined_at: string; // ISO 8601
}

// A pending request from a user to join a private group.
// Mirrors the Go JoinRequest struct in backend/models/group.go.
export interface JoinRequest {
  id: number;
  group_id: number;
  user_id: number;
  // The requester's username, included so admins can review without extra lookups.
  username: string;
  // "pending" | "accepted" | "declined"
  status: string;
  requested_at: string; // ISO 8601
}

// What you send when creating a new group.
export interface CreateGroupRequest {
  name: string;
  description: string;
  is_private: boolean;
}

// What you send when updating an existing group's settings.
// All fields are optional — only the provided fields are updated.
export interface UpdateGroupRequest {
  name?: string;
  description?: string;
  is_private?: boolean;
}

// The paginated response for the group catch feed.
// Catches are returned in the same shape as the regular catch list.
export interface GroupFeedResponse {
  catches: Catch[];
  total: number;
  page: number;
  page_size: number;
}

// An entry in the most-active-members list within GroupStats.
export interface ActiveMember {
  user_id: number;
  username: string;
  catch_count: number;
}

// A single data point in the catch-rate-over-time series within GroupStats.
export interface CatchRateDataPoint {
  // The date bucket (e.g. "2025-03-15" for daily, or "2025-W11" for weekly).
  date: string;
  catch_count: number;
}

// Aggregate statistics for a group.
// Returned by the GetGroupStats endpoint.
export interface GroupStats {
  // Total number of catches shared to this group across all time.
  total_catches: number;
  // The five most-caught species, ranked by frequency.
  top_species: Array<{ species: string; count: number }>;
  // The five most active members by catch count.
  most_active_members: ActiveMember[];
  // Daily or weekly catch counts over the past 30 days.
  catch_rate_over_time: CatchRateDataPoint[];
}
