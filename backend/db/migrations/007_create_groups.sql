CREATE TABLE groups (
    id           BIGSERIAL PRIMARY KEY,
    name         TEXT NOT NULL,
    description  TEXT NOT NULL DEFAULT '',
    created_by   BIGINT NOT NULL REFERENCES users(id),
    is_private   BOOLEAN NOT NULL DEFAULT FALSE,
    invite_code  TEXT UNIQUE,
    member_count INT NOT NULL DEFAULT 0,
    created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE UNIQUE INDEX idx_groups_invite_code ON groups (invite_code) WHERE invite_code IS NOT NULL;
CREATE INDEX idx_groups_name ON groups USING GIN (to_tsvector('english', name || ' ' || description));
