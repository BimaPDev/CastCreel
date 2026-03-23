/**
 * Groups API functions.
 * Manages group creation, membership, moderation, and group-scoped catch data.
 */

import type { ApiClient } from './client';
import type {
  Group,
  GroupMember,
  JoinRequest,
  CreateGroupRequest,
  UpdateGroupRequest,
  GroupFeedResponse,
  GroupStats,
} from '../types/group';

// Creates a new group. The authenticated user automatically becomes the admin.
// Returns the newly created group record.
export async function createGroup(
  client: ApiClient,
  body: CreateGroupRequest,
): Promise<Group> {
  return client.post<Group>('/groups', body);
}

// Returns the details of a single group by its ID.
// Private groups return 403 if the requester is not a member.
export async function getGroup(
  client: ApiClient,
  groupId: number,
): Promise<Group> {
  return client.get<Group>(`/groups/${groupId}`);
}

// Updates a group's name, description, or privacy setting.
// Only admins of the group can call this. Returns the updated group.
export async function updateGroup(
  client: ApiClient,
  groupId: number,
  body: UpdateGroupRequest,
): Promise<Group> {
  return client.put<Group>(`/groups/${groupId}`, body);
}

// Permanently deletes a group and all its memberships.
// Only the group admin can call this.
export async function deleteGroup(
  client: ApiClient,
  groupId: number,
): Promise<void> {
  return client.delete<void>(`/groups/${groupId}`);
}

// Joins a public group immediately. Returns the new GroupMember record.
// Returns 403 for private groups (use requestToJoinGroup or joinByInviteCode instead).
export async function joinGroup(
  client: ApiClient,
  groupId: number,
): Promise<GroupMember> {
  return client.post<GroupMember>(`/groups/${groupId}/join`);
}

// Submits a join request for a private group. Returns the pending JoinRequest.
// An admin or moderator must approve the request before the user becomes a member.
export async function requestToJoinGroup(
  client: ApiClient,
  groupId: number,
): Promise<JoinRequest> {
  return client.post<JoinRequest>(`/groups/${groupId}/request`);
}

// Approves a pending join request. The user becomes a regular member.
// Only admins and moderators can call this.
export async function acceptJoinRequest(
  client: ApiClient,
  groupId: number,
  requestId: number,
): Promise<GroupMember> {
  return client.post<GroupMember>(`/groups/${groupId}/requests/${requestId}/accept`);
}

// Declines a pending join request. The status is updated to "declined".
// Only admins and moderators can call this.
export async function declineJoinRequest(
  client: ApiClient,
  groupId: number,
  requestId: number,
): Promise<void> {
  return client.post<void>(`/groups/${groupId}/requests/${requestId}/decline`);
}

// Removes the authenticated user from the group.
// Returns 400 if the user is the sole admin (must transfer ownership first).
export async function leaveGroup(
  client: ApiClient,
  groupId: number,
): Promise<void> {
  return client.post<void>(`/groups/${groupId}/leave`);
}

// Generates a new invite code for a private group, replacing any existing one.
// Returns the updated group record with the new invite_code field.
// Only the group admin can call this.
export async function generateInviteCode(
  client: ApiClient,
  groupId: number,
): Promise<Group> {
  return client.post<Group>(`/groups/${groupId}/invite-code`);
}

// Joins a private group using a valid invite code, bypassing the join-request flow.
// Returns the new GroupMember record. Returns 404 if the code is invalid.
export async function joinByInviteCode(
  client: ApiClient,
  inviteCode: string,
): Promise<GroupMember> {
  return client.post<GroupMember>('/groups/join-by-invite', { invite_code: inviteCode });
}

// Removes a specific member from the group.
// Admins can remove anyone; moderators can only remove regular members.
export async function removeMember(
  client: ApiClient,
  groupId: number,
  userId: number,
): Promise<void> {
  return client.delete<void>(`/groups/${groupId}/members/${userId}`);
}

// Promotes a regular member to the moderator role.
// Only the group admin can call this.
export async function promoteMember(
  client: ApiClient,
  groupId: number,
  userId: number,
): Promise<GroupMember> {
  return client.post<GroupMember>(`/groups/${groupId}/members/${userId}/promote`);
}

// Demotes a moderator back to the regular member role.
// Only the group admin can call this.
export async function demoteMember(
  client: ApiClient,
  groupId: number,
  userId: number,
): Promise<GroupMember> {
  return client.post<GroupMember>(`/groups/${groupId}/members/${userId}/demote`);
}

// Returns a paginated list of the group's active members with their roles.
// Available to any member of the group.
export async function listGroupMembers(
  client: ApiClient,
  groupId: number,
  page = 1,
): Promise<{ members: GroupMember[]; total: number }> {
  return client.get<{ members: GroupMember[]; total: number }>(
    `/groups/${groupId}/members?page=${page}`,
  );
}

// Returns all groups the authenticated user currently belongs to, with their role in each.
// Used to populate the groups tab and the group picker when logging a catch.
export async function listUserGroups(client: ApiClient): Promise<GroupMember[]> {
  return client.get<GroupMember[]>('/groups/mine');
}

// Returns a paginated feed of catches shared to a specific group, newest first.
// Only members of the group can call this.
export async function getGroupFeed(
  client: ApiClient,
  groupId: number,
  page = 1,
): Promise<GroupFeedResponse> {
  return client.get<GroupFeedResponse>(`/groups/${groupId}/feed?page=${page}`);
}

// Returns aggregate statistics for the group: total catches, top species,
// most active members, and a catch-rate time series over the past 30 days.
// Only available to group members.
export async function getGroupStats(
  client: ApiClient,
  groupId: number,
): Promise<GroupStats> {
  return client.get<GroupStats>(`/groups/${groupId}/stats`);
}

// Searches for public groups by name or location keyword.
// Returns a paginated list of matching groups. Private groups are excluded.
export async function searchPublicGroups(
  client: ApiClient,
  query: string,
  page = 1,
): Promise<{ groups: Group[]; total: number }> {
  return client.get<{ groups: Group[]; total: number }>(
    `/groups/search?q=${encodeURIComponent(query)}&page=${page}`,
  );
}
