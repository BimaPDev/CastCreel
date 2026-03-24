CREATE TABLE users (
    id               BIGSERIAL PRIMARY KEY,
    email            TEXT NOT NULL UNIQUE,
    username         TEXT NOT NULL UNIQUE,
    password_hash    TEXT NOT NULL,
    home_latitude    DOUBLE PRECISION,
    home_longitude   DOUBLE PRECISION,
    favorite_species TEXT[] NOT NULL DEFAULT '{}',
    push_token       TEXT,
    created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
