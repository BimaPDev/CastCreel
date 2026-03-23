-- Queries for the notifications and user_notification_preferences tables
--
-- TODO: Replace these comment placeholders with real named queries
-- using pgx/v5 or sqlc when implementing.

-- GET notification inbox for a user (newest first)
-- SELECT * FROM notifications
-- WHERE user_id = $1
-- ORDER BY created_at DESC
-- LIMIT $2 OFFSET $3;

-- GET unread count for a user (used for badge number on app icon)
-- SELECT COUNT(*) FROM notifications
-- WHERE user_id = $1 AND is_read = FALSE;

-- INSERT a new notification record
-- INSERT INTO notifications (user_id, type, title, body, related_event_id, is_read, created_at)
-- VALUES ($1, $2, $3, $4, $5, FALSE, NOW())
-- RETURNING id;

-- UPDATE a single notification to mark it read
-- UPDATE notifications SET is_read = TRUE
-- WHERE id = $1 AND user_id = $2;

-- UPDATE all unread notifications for a user to mark them read
-- UPDATE notifications SET is_read = TRUE
-- WHERE user_id = $1 AND is_read = FALSE;

-- GET notification preferences for a user
-- SELECT * FROM user_notification_preferences WHERE user_id = $1;

-- INSERT default preferences for a new user (called at registration time)
-- INSERT INTO user_notification_preferences
--   (user_id, stocking_alerts, regulation_changes, water_advisories,
--    friend_catches, invasive_species, updated_at)
-- VALUES ($1, TRUE, TRUE, TRUE, TRUE, TRUE, NOW())
-- ON CONFLICT (user_id) DO NOTHING;

-- UPDATE notification preferences
-- UPDATE user_notification_preferences
-- SET stocking_alerts = $2, regulation_changes = $3, water_advisories = $4,
--     friend_catches = $5, invasive_species = $6, updated_at = NOW()
-- WHERE user_id = $1;
