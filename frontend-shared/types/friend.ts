/**
 * Friendship-related types.
 * Matches the Go Friendship model in backend/models/friendship.go.
 */

// The three states a friend relationship can be in.
export enum FriendshipStatus {
  // The request has been sent but not answered yet.
  Pending = 'pending',
  // Both users agreed — they can now see each other's friend-visible catches.
  Accepted = 'accepted',
  // The recipient said no. The requester isn't explicitly told.
  Declined = 'declined',
}

// A friendship record as returned by the API.
export interface Friendship {
  id: number;
  requester_id: number;
  recipient_id: number;
  status: FriendshipStatus;
  created_at: string; // ISO 8601
  updated_at: string;
}

// A friend as shown in the friends list — just enough to display the person.
export interface FriendSummary {
  user_id: number;
  username: string;
  friendship_id: number;
}

// A pending incoming request shown in the "requests" section of the friends screen.
export interface PendingRequest {
  friendship_id: number;
  requester_username: string;
  requester_id: number;
  sent_at: string;
}
