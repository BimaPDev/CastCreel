-- Queries for the friendships table
--
-- TODO: Replace these comment placeholders with real named queries
-- using pgx/v5 or sqlc when implementing.

-- GET all accepted friends for a user (both directions of the relationship)
-- SELECT u.id, u.username FROM users u
-- JOIN friendships f ON (f.requester_id = u.id OR f.recipient_id = u.id)
-- WHERE f.status = 'accepted'
--   AND (f.requester_id = $1 OR f.recipient_id = $1)
--   AND u.id != $1;

-- GET pending incoming requests (people waiting for this user to respond)
-- SELECT f.id, u.username, f.created_at FROM friendships f
-- JOIN users u ON u.id = f.requester_id
-- WHERE f.recipient_id = $1 AND f.status = 'pending';

-- INSERT a new friend request
-- INSERT INTO friendships (requester_id, recipient_id, status, created_at, updated_at)
-- VALUES ($1, $2, 'pending', NOW(), NOW())
-- RETURNING id;

-- UPDATE friendship status (accept or decline)
-- UPDATE friendships
-- SET status = $2, updated_at = NOW()
-- WHERE id = $1 AND recipient_id = $3;

-- DELETE a friendship (unfriend)
-- DELETE FROM friendships
-- WHERE (requester_id = $1 AND recipient_id = $2)
--    OR (requester_id = $2 AND recipient_id = $1);
