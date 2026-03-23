package models

import "time"

// GroupRole defines the level of authority a member has within a group.
// Higher roles can manage membership and moderate content.
type GroupRole string

const (
	// GroupRoleAdmin is the creator's role and the highest level of control.
	// Admins can edit group settings, manage all members, generate invite codes,
	// and delete the group entirely.
	GroupRoleAdmin GroupRole = "admin"

	// GroupRoleModerator is a trusted member elevated by an admin.
	// Moderators can approve or decline join requests and remove regular members.
	GroupRoleModerator GroupRole = "moderator"

	// GroupRoleMember is the default role assigned to anyone who joins the group.
	// Members can see the group feed and share catches to the group.
	GroupRoleMember GroupRole = "member"
)

// Group represents a community of anglers who share catches with each other.
// Groups add a visibility layer between friends and public — you can share a
// catch to one or more groups without making it visible to the whole world.
type Group struct {
	// A unique number that identifies this group.
	ID int64 `db:"id" json:"id"`

	// The display name of the group (e.g. "Lake Erie Bass Crew").
	Name string `db:"name" json:"name"`

	// A short description of what the group is about or who it's for.
	Description string `db:"description" json:"description"`

	// The user ID of the member who created the group.
	// That person is automatically given the admin role.
	CreatedBy int64 `db:"created_by" json:"created_by"`

	// When true, the group does not appear in public search results and
	// new members must either use an invite code or have a join request approved.
	IsPrivate bool `db:"is_private" json:"is_private"`

	// A short random code that lets anyone join a private group without
	// going through the approval flow. Only admins can generate or reset it.
	// Null when no invite code has been generated yet.
	InviteCode *string `db:"invite_code" json:"invite_code,omitempty"`

	// The current number of accepted members. Kept as a denormalized count
	// so group cards can be displayed without an extra JOIN.
	MemberCount int `db:"member_count" json:"member_count"`

	CreatedAt time.Time `db:"created_at" json:"created_at"`
	UpdatedAt time.Time `db:"updated_at" json:"updated_at"`
}

// GroupMember records a user's current membership in a group, including their role.
// A row only exists here once the membership is active — pending join requests live
// in the JoinRequest table instead.
type GroupMember struct {
	// The group this membership belongs to.
	GroupID int64 `db:"group_id" json:"group_id"`

	// The user who is a member.
	UserID int64 `db:"user_id" json:"user_id"`

	// The member's current role within the group.
	Role GroupRole `db:"role" json:"role"`

	// When this person joined (or was accepted) into the group.
	JoinedAt time.Time `db:"joined_at" json:"joined_at"`
}

// JoinRequest is created when a user wants to join a private group and
// no invite code is available. An admin or moderator must approve or decline it.
type JoinRequest struct {
	// A unique number that identifies this request.
	ID int64 `db:"id" json:"id"`

	// The private group the user is asking to join.
	GroupID int64 `db:"group_id" json:"group_id"`

	// The user who submitted the request.
	UserID int64 `db:"user_id" json:"user_id"`

	// The current lifecycle state: "pending", "accepted", or "declined".
	Status string `db:"status" json:"status"`

	// When the request was originally submitted.
	RequestedAt time.Time `db:"requested_at" json:"requested_at"`
}
