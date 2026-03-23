/**
 * Friends API functions.
 * Manages the social connections between users.
 */

import type { ApiClient } from './client';
import type { Friendship, FriendSummary, PendingRequest } from '../types/friend';

// Sends a friend request to another user by their user ID.
// Creates a pending friendship record on the server. The target user
// does not see the request immediately — they'll get a notification.
export async function sendFriendRequest(
  client: ApiClient,
  targetUserId: number,
): Promise<Friendship> {
  return client.post<Friendship>('/friends/request', { user_id: targetUserId });
}

// Accepts a pending friend request. The friendship status changes to "accepted"
// and both users can now see each other's friend-visible catches.
export async function acceptFriendRequest(
  client: ApiClient,
  friendshipId: number,
): Promise<Friendship> {
  return client.post<Friendship>(`/friends/accept/${friendshipId}`);
}

// Declines a pending friend request. The requester is not explicitly notified.
export async function declineFriendRequest(
  client: ApiClient,
  friendshipId: number,
): Promise<void> {
  return client.post<void>(`/friends/decline/${friendshipId}`);
}

// Returns the current user's accepted friends list.
// Used to populate the friends screen and for visibility checks.
export async function listFriends(client: ApiClient): Promise<FriendSummary[]> {
  return client.get<FriendSummary[]>('/friends');
}

// Removes an existing friendship. Neither user can see the other's
// friend-visible catches anymore after this.
export async function removeFriend(
  client: ApiClient,
  friendshipId: number,
): Promise<void> {
  return client.delete<void>(`/friends/${friendshipId}`);
}

// Fetches the pending incoming friend requests waiting for the current user's response.
export async function getPendingRequests(
  client: ApiClient,
): Promise<PendingRequest[]> {
  return client.get<PendingRequest[]>('/friends/pending');
}
