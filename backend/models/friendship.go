package models

import "time"

// FriendshipStatus tracks where a friend request is in its lifecycle.
type FriendshipStatus string

const (
	// FriendshipPending means the request has been sent but not yet answered.
	FriendshipPending FriendshipStatus = "pending"

	// FriendshipAccepted means both sides have agreed and are now friends.
	FriendshipAccepted FriendshipStatus = "accepted"

	// FriendshipDeclined means the recipient said no to the request.
	// The requester can try again later but this record stays for history.
	FriendshipDeclined FriendshipStatus = "declined"
)

// Friendship represents the relationship between two users.
// When user A sends a friend request to user B, one of these records is created.
// The record is updated when B accepts or declines.
type Friendship struct {
	// A unique identifier for this friendship record.
	ID int64 `db:"id" json:"id"`

	// The user who sent the friend request.
	RequesterID int64 `db:"requester_id" json:"requester_id"`

	// The user who received the friend request.
	RecipientID int64 `db:"recipient_id" json:"recipient_id"`

	// Whether the request is pending, accepted, or declined.
	Status FriendshipStatus `db:"status" json:"status"`

	// When the friend request was originally sent.
	CreatedAt time.Time `db:"created_at" json:"created_at"`

	// When the status last changed (e.g. when the request was accepted).
	UpdatedAt time.Time `db:"updated_at" json:"updated_at"`
}
