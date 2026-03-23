-- Queries for the wildlife_events table
--
-- TODO: Replace these comment placeholders with real named queries
-- using pgx/v5 or sqlc when implementing.

-- GET recent events near a location (for user news feed)
-- SELECT * FROM wildlife_events
-- WHERE occurred_at > NOW() - INTERVAL '90 days'
--   AND (
--     6371 * acos(
--       cos(radians($1)) * cos(radians(latitude)) *
--       cos(radians(longitude) - radians($2)) +
--       sin(radians($1)) * sin(radians(latitude))
--     )
--   ) < radius_km + $3   -- $3 is the user's search radius
-- ORDER BY occurred_at DESC
-- LIMIT $4;

-- GET recent stocking events (used by notification job)
-- SELECT * FROM wildlife_events
-- WHERE event_type = 'stocking'
--   AND ingested_at > NOW() - INTERVAL '6 hours'
-- ORDER BY ingested_at DESC;

-- INSERT a new wildlife event (called by the ingest job)
-- INSERT INTO wildlife_events (event_type, title, description, source_agency,
--   source_url, latitude, longitude, radius_km, water_body_name,
--   stocked_species, stocked_count, occurred_at, ingested_at)
-- VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, NOW())
-- RETURNING id;

-- CHECK if an event with this source URL already exists (deduplication)
-- SELECT id FROM wildlife_events WHERE source_url = $1 LIMIT 1;
