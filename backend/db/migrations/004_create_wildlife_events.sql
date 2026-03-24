CREATE TABLE wildlife_events (
    id              BIGSERIAL PRIMARY KEY,
    event_type      TEXT NOT NULL CHECK (event_type IN ('stocking', 'regulation_change', 'water_advisory', 'population_survey', 'invasive_species')),
    title           TEXT NOT NULL,
    description     TEXT NOT NULL,
    source_agency   TEXT NOT NULL,
    source_url      TEXT NOT NULL UNIQUE,
    latitude        DOUBLE PRECISION NOT NULL,
    longitude       DOUBLE PRECISION NOT NULL,
    radius_km       DOUBLE PRECISION NOT NULL,
    water_body_name TEXT,
    stocked_species TEXT,
    stocked_count   BIGINT,
    occurred_at     TIMESTAMPTZ NOT NULL,
    ingested_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_wildlife_events_type_occurred ON wildlife_events (event_type, occurred_at DESC);
CREATE INDEX idx_wildlife_events_location      ON wildlife_events (latitude, longitude);
