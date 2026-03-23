-- Queries for the catches table
--
-- TODO: Replace these comment placeholders with real named queries
-- using pgx/v5 or sqlc when implementing.

-- GET a single catch by ID
-- SELECT * FROM catches WHERE id = $1;

-- GET all catches for a specific user, sorted newest first
-- SELECT * FROM catches
-- WHERE user_id = $1
-- ORDER BY caught_at DESC
-- LIMIT $2 OFFSET $3;

-- GET public catches for the world map (fuzzed coordinates applied in Go code)
-- SELECT id, species, latitude, longitude, caught_at
-- FROM catches
-- WHERE visibility = 3   -- 3 = public
-- ORDER BY caught_at DESC
-- LIMIT $1 OFFSET $2;

-- GET friend-visible catches for a given user's friend group
-- SELECT c.* FROM catches c
-- JOIN friendships f ON (f.requester_id = c.user_id OR f.recipient_id = c.user_id)
-- WHERE f.status = 'accepted'
--   AND (f.requester_id = $1 OR f.recipient_id = $1)
--   AND c.user_id != $1
--   AND c.visibility >= 2   -- 2 = friends or higher
-- ORDER BY c.caught_at DESC;

-- INSERT a new catch record
-- INSERT INTO catches (user_id, species, length_cm, dominant_color, body_condition,
--   photo_url, latitude, longitude, notes, bait_or_technique, visibility,
--   data_quality_weight, weather_condition, air_temp_celsius, water_temp_celsius,
--   barometric_pressure_hpa, pressure_trend, wind_speed_kmh, wind_direction,
--   moon_phase, solunar_period, caught_at, created_at, updated_at)
-- VALUES ($1, $2, $3, ..., NOW(), NOW())
-- RETURNING id;

-- UPDATE a catch (user corrections or visibility change)
-- UPDATE catches
-- SET notes = $2, bait_or_technique = $3, visibility = $4, updated_at = NOW()
-- WHERE id = $1 AND user_id = $5;

-- DELETE a catch (owner only)
-- DELETE FROM catches WHERE id = $1 AND user_id = $2;
