-- Queries for the saved_locations table
--
-- TODO: Replace these comment placeholders with real named queries
-- using pgx/v5 or sqlc when implementing.

-- GET all saved locations for a user
-- SELECT * FROM saved_locations
-- WHERE user_id = $1
-- ORDER BY created_at DESC;

-- GET a single saved location by ID (for update/delete ownership checks)
-- SELECT * FROM saved_locations WHERE id = $1;

-- GET all saved locations that overlap with an event's area
-- (used by the notification job to find who to alert)
-- SELECT sl.*, u.push_token, u.id as user_id
-- FROM saved_locations sl
-- JOIN users u ON u.id = sl.user_id
-- WHERE (
--   6371 * acos(
--     cos(radians($1)) * cos(radians(sl.latitude)) *
--     cos(radians(sl.longitude) - radians($2)) +
--     sin(radians($1)) * sin(radians(sl.latitude))
--   )
-- ) < sl.radius_km + $3;   -- $3 is the event's own radius_km

-- INSERT a new saved location
-- INSERT INTO saved_locations (user_id, name, latitude, longitude, radius_km, created_at)
-- VALUES ($1, $2, $3, $4, $5, NOW())
-- RETURNING id;

-- UPDATE the monitoring radius for a saved location
-- UPDATE saved_locations SET radius_km = $2
-- WHERE id = $1 AND user_id = $3;

-- DELETE a saved location (owner only)
-- DELETE FROM saved_locations WHERE id = $1 AND user_id = $2;
