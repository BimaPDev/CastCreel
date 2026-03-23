-- Queries for the groups, group_members, and join_requests tables
--
-- TODO: Replace these comment placeholders with real named queries
-- using pgx/v5 or sqlc when implementing.

-- GET a single group by ID
-- SELECT id, name, description, created_by, is_private, invite_code, member_count, created_at, updated_at
-- FROM groups
-- WHERE id = $1;

-- GET all public groups matching a search term (name or description)
-- SELECT id, name, description, created_by, is_private, member_count, created_at
-- FROM groups
-- WHERE is_private = false
--   AND (name ILIKE '%' || $1 || '%' OR description ILIKE '%' || $1 || '%')
-- ORDER BY member_count DESC
-- LIMIT $2 OFFSET $3;

-- GET all groups a user currently belongs to (with their role)
-- SELECT g.id, g.name, g.description, g.is_private, g.member_count, gm.role
-- FROM groups g
-- JOIN group_members gm ON gm.group_id = g.id
-- WHERE gm.user_id = $1
-- ORDER BY g.name ASC;

-- GET all members of a group with their roles (paginated)
-- SELECT u.id, u.username, gm.role, gm.joined_at
-- FROM group_members gm
-- JOIN users u ON u.id = gm.user_id
-- WHERE gm.group_id = $1
-- ORDER BY gm.joined_at ASC
-- LIMIT $2 OFFSET $3;

-- GET a single member's role within a group (used for permission checks)
-- SELECT role FROM group_members
-- WHERE group_id = $1 AND user_id = $2;

-- GET a single join request by ID
-- SELECT id, group_id, user_id, status, requested_at
-- FROM join_requests
-- WHERE id = $1;

-- GET all pending join requests for a group (for admin/moderator review)
-- SELECT jr.id, jr.user_id, u.username, jr.requested_at
-- FROM join_requests jr
-- JOIN users u ON u.id = jr.user_id
-- WHERE jr.group_id = $1 AND jr.status = 'pending'
-- ORDER BY jr.requested_at ASC;

-- GET a group by its invite code (used for join-by-invite-code flow)
-- SELECT id, name, description, is_private, member_count
-- FROM groups
-- WHERE invite_code = $1;

-- INSERT a new group
-- INSERT INTO groups (name, description, created_by, is_private, member_count, created_at, updated_at)
-- VALUES ($1, $2, $3, $4, 1, NOW(), NOW())
-- RETURNING id;

-- INSERT a group membership row (used when joining or being accepted)
-- INSERT INTO group_members (group_id, user_id, role, joined_at)
-- VALUES ($1, $2, $3, NOW());

-- INSERT a new join request
-- INSERT INTO join_requests (group_id, user_id, status, requested_at)
-- VALUES ($1, $2, 'pending', NOW())
-- RETURNING id;

-- UPDATE group details (name, description, privacy)
-- UPDATE groups
-- SET name = $2, description = $3, is_private = $4, updated_at = NOW()
-- WHERE id = $1;

-- UPDATE the invite code for a group (generate new or clear)
-- UPDATE groups
-- SET invite_code = $2, updated_at = NOW()
-- WHERE id = $1;

-- UPDATE member count (increment after join, decrement after leave/remove)
-- UPDATE groups
-- SET member_count = member_count + $2, updated_at = NOW()
-- WHERE id = $1;

-- UPDATE a member's role
-- UPDATE group_members
-- SET role = $3
-- WHERE group_id = $1 AND user_id = $2;

-- UPDATE a join request status (accept or decline)
-- UPDATE join_requests
-- SET status = $2
-- WHERE id = $1;

-- DELETE a group and rely on CASCADE to remove members and requests
-- DELETE FROM groups WHERE id = $1;

-- DELETE a specific membership (leave or remove)
-- DELETE FROM group_members
-- WHERE group_id = $1 AND user_id = $2;
