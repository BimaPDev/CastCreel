CREATE TABLE catches (
    id                      BIGSERIAL PRIMARY KEY,
    user_id                 BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    species                 TEXT NOT NULL,
    length_cm               DOUBLE PRECISION,
    dominant_color          TEXT NOT NULL DEFAULT '',
    body_condition          TEXT NOT NULL DEFAULT '',
    photo_url               TEXT NOT NULL,
    latitude                DOUBLE PRECISION NOT NULL,
    longitude               DOUBLE PRECISION NOT NULL,
    notes                   TEXT,
    bait_or_technique       TEXT,
    visibility              SMALLINT NOT NULL DEFAULT 1,
    data_quality_weight     DOUBLE PRECISION NOT NULL DEFAULT 1.0,
    weather_condition       TEXT,
    air_temp_celsius        DOUBLE PRECISION,
    water_temp_celsius      DOUBLE PRECISION,
    barometric_pressure_hpa DOUBLE PRECISION,
    pressure_trend          TEXT,
    wind_speed_kmh          DOUBLE PRECISION,
    wind_direction          TEXT,
    moon_phase              TEXT,
    solunar_period          TEXT,
    caught_at               TIMESTAMPTZ NOT NULL,
    created_at              TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at              TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_catches_user_id   ON catches (user_id);
CREATE INDEX idx_catches_caught_at ON catches (caught_at DESC);
CREATE INDEX idx_catches_species   ON catches (species);
CREATE INDEX idx_catches_location  ON catches (latitude, longitude);
