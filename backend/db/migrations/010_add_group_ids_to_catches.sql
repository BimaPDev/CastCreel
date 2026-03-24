CREATE TABLE catch_groups (
    catch_id BIGINT NOT NULL REFERENCES catches(id) ON DELETE CASCADE,
    group_id BIGINT NOT NULL REFERENCES groups(id) ON DELETE CASCADE,
    PRIMARY KEY (catch_id, group_id)
);

CREATE INDEX idx_catch_groups_group_id ON catch_groups (group_id);
