-- Queries for the users table
--
-- TODO: Replace these comment placeholders with real named queries
-- using pgx/v5 or sqlc when implementing.

-- GET user by ID
-- SELECT id, email, username, home_latitude, home_longitude,
--        favorite_species, push_token, created_at, updated_at
-- FROM users
-- WHERE id = $1;

-- GET user by email (used during login to find the account)
-- SELECT id, email, username, password_hash, created_at
-- FROM users
-- WHERE email = $1;

-- INSERT a new user (registration)
-- INSERT INTO users (email, username, password_hash, created_at, updated_at)
-- VALUES ($1, $2, $3, NOW(), NOW())
-- RETURNING id;

-- UPDATE user profile (home location, favorites, push token)
-- UPDATE users
-- SET home_latitude = $2, home_longitude = $3,
--     favorite_species = $4, push_token = $5, updated_at = NOW()
-- WHERE id = $1;

-- UPDATE push token only (called when a device token refreshes)
-- UPDATE users SET push_token = $2, updated_at = NOW() WHERE id = $1;
