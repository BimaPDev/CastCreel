package handlers

import (
	"net/http"
)

// FriendHandler handles everything related to the social connections between users.
type FriendHandler struct {
	db interface{} // will be *pgxpool.Pool once implemented
}

// NewFriendHandler creates a new FriendHandler ready to use.
func NewFriendHandler(db interface{}) *FriendHandler {
	return &FriendHandler{db: db}
}

// SendFriendRequest handles when a user wants to connect with another user.
// The requesting user provides the target user's username or ID.
// A new friendship record is created with status "pending" and the target
// user would typically be notified (handled separately by the notification job).
func (h *FriendHandler) SendFriendRequest(w http.ResponseWriter, r *http.Request) {
}

// AcceptFriendRequest handles when a user agrees to a pending friend request.
// The friendship status is changed to "accepted" and both users can now see
// each other's friend-visible catches.
func (h *FriendHandler) AcceptFriendRequest(w http.ResponseWriter, r *http.Request) {
}

// DeclineFriendRequest handles when a user says no to a pending friend request.
// The status changes to "declined". The requester is not explicitly told
// who declined them — from their perspective the request just stays unanswered.
func (h *FriendHandler) DeclineFriendRequest(w http.ResponseWriter, r *http.Request) {
}

// ListFriends returns all the accepted friendships for the logged-in user —
// essentially their friends list. Each entry includes the friend's username
// and enough info to show their profile.
func (h *FriendHandler) ListFriends(w http.ResponseWriter, r *http.Request) {
}

// RemoveFriend handles when a user wants to end a friendship.
// The friendship record is deleted so neither person can see the other's
// friend-visible catches anymore. This does not send the other user a notification.
func (h *FriendHandler) RemoveFriend(w http.ResponseWriter, r *http.Request) {
}
