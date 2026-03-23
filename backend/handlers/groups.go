package handlers

import (
	"net/http"
)

// GroupHandler handles all HTTP endpoints related to groups and community features.
// Groups are a visibility layer between friends (private social) and public (world map).
type GroupHandler struct {
	db interface{} // will be *pgxpool.Pool once implemented
}

// NewGroupHandler creates a new GroupHandler ready to register with the router.
func NewGroupHandler(db interface{}) *GroupHandler {
	return &GroupHandler{db: db}
}

// CreateGroup handles creating a new group.
// The authenticated user becomes the group's first admin member automatically.
// The request body should include name, description, and whether the group is private.
func (h *GroupHandler) CreateGroup(w http.ResponseWriter, r *http.Request) {
}

// GetGroup returns the full details of a single group by its ID, including
// the current member count. Requires the requester to be a member of the group
// if the group is private.
func (h *GroupHandler) GetGroup(w http.ResponseWriter, r *http.Request) {
}

// UpdateGroup lets an admin change the group's name, description, or privacy setting.
// Non-admin members get a 403. Changing from private to public automatically
// expires any outstanding invite code.
func (h *GroupHandler) UpdateGroup(w http.ResponseWriter, r *http.Request) {
}

// DeleteGroup permanently removes the group and all its memberships.
// Only the admin can do this. All catches shared exclusively to this group
// remain in the database but become effectively invisible to other group members.
func (h *GroupHandler) DeleteGroup(w http.ResponseWriter, r *http.Request) {
}

// JoinGroup lets a user join a public group immediately without needing approval.
// A new GroupMember row is inserted with the "member" role.
// Returns 409 if the user is already a member, 403 if the group is private
// (private groups require an invite code or a join request instead).
func (h *GroupHandler) JoinGroup(w http.ResponseWriter, r *http.Request) {
}

// RequestToJoinGroup creates a pending JoinRequest for a private group.
// The request waits until an admin or moderator accepts or declines it.
// Notifying the group's admins is handled separately by the notification job.
func (h *GroupHandler) RequestToJoinGroup(w http.ResponseWriter, r *http.Request) {
}

// AcceptJoinRequest approves a pending join request, converting it to an active
// GroupMember row with the "member" role. Only admins and moderators can do this.
// The status on the JoinRequest is updated to "accepted" for audit trail purposes.
func (h *GroupHandler) AcceptJoinRequest(w http.ResponseWriter, r *http.Request) {
}

// DeclineJoinRequest rejects a pending join request. Only admins and moderators
// can do this. The status is updated to "declined" so the requester can see
// their request was reviewed rather than just ignored.
func (h *GroupHandler) DeclineJoinRequest(w http.ResponseWriter, r *http.Request) {
}

// LeaveGroup removes the authenticated user from a group they currently belong to.
// If the leaving member is the sole admin, the request is rejected — the group
// must be deleted or another member must be promoted to admin first.
func (h *GroupHandler) LeaveGroup(w http.ResponseWriter, r *http.Request) {
}

// GenerateInviteCode creates a new short random invite code for a private group
// and saves it on the Group record, replacing any previous code. Only admins can
// call this. The code lets anyone with the link bypass the join-request flow.
func (h *GroupHandler) GenerateInviteCode(w http.ResponseWriter, r *http.Request) {
}

// JoinByInviteCode lets a user join a private group by supplying a valid invite code.
// The server looks up the group by the code, verifies it matches, and adds the user
// as a regular member. Returns 404 if no group has that code.
func (h *GroupHandler) JoinByInviteCode(w http.ResponseWriter, r *http.Request) {
}

// RemoveMember lets an admin or moderator remove another user from the group.
// Admins can remove anyone. Moderators can only remove regular members, not other
// moderators or admins. The removed user's catches stay in the database.
func (h *GroupHandler) RemoveMember(w http.ResponseWriter, r *http.Request) {
}

// PromoteMember elevates a regular member to the moderator role.
// Only admins can promote. Moderators cannot promote other members.
func (h *GroupHandler) PromoteMember(w http.ResponseWriter, r *http.Request) {
}

// DemoteMember drops a moderator back down to the regular member role.
// Only admins can demote. Returns 400 if the target is already a regular member.
func (h *GroupHandler) DemoteMember(w http.ResponseWriter, r *http.Request) {
}

// ListGroupMembers returns a paginated list of all active members in the group
// along with each member's username and role. Available to any group member.
// Pagination uses cursor-based approach via a "page" query parameter.
func (h *GroupHandler) ListGroupMembers(w http.ResponseWriter, r *http.Request) {
}

// ListUserGroups returns all groups the authenticated user currently belongs to,
// including their role in each group. Used to populate the groups tab and to
// build the group picker when logging a new catch.
func (h *GroupHandler) ListUserGroups(w http.ResponseWriter, r *http.Request) {
}

// GetGroupFeed returns a paginated list of catches that have been shared to this
// specific group, ordered newest-first. Only members of the group can see this feed.
// Catches shared to multiple groups each appear once per group feed.
func (h *GroupHandler) GetGroupFeed(w http.ResponseWriter, r *http.Request) {
}

// GetGroupStats returns aggregate statistics for the group: total number of catches,
// the top species caught, the most active members by catch count, and a time-series
// of catch rate over the past 30 days. Only available to group members.
func (h *GroupHandler) GetGroupStats(w http.ResponseWriter, r *http.Request) {
}

// SearchPublicGroups lets any authenticated user discover public groups by name
// or by a location string (e.g. a lake or region name stored in the description).
// Returns a paginated list of matching groups. Private groups are excluded entirely.
func (h *GroupHandler) SearchPublicGroups(w http.ResponseWriter, r *http.Request) {
}
