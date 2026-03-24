CREATE TABLE notifications (
    id               BIGSERIAL PRIMARY KEY,
    user_id          BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    type             TEXT NOT NULL CHECK (type IN ('stocking_alert', 'regulation_change', 'water_advisory', 'friend_catch', 'invasive_species')),
    title            TEXT NOT NULL,
    body             TEXT NOT NULL,
    related_event_id BIGINT,
    is_read          BOOLEAN NOT NULL DEFAULT FALSE,
    created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_notifications_user_inbox ON notifications (user_id, is_read, created_at DESC);

CREATE TABLE user_notification_preferences (
    user_id            BIGINT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    stocking_alerts    BOOLEAN NOT NULL DEFAULT TRUE,
    regulation_changes BOOLEAN NOT NULL DEFAULT TRUE,
    water_advisories   BOOLEAN NOT NULL DEFAULT TRUE,
    friend_catches     BOOLEAN NOT NULL DEFAULT TRUE,
    invasive_species   BOOLEAN NOT NULL DEFAULT TRUE,
    updated_at         TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
