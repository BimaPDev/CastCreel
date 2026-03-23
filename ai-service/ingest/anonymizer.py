"""
Catch data anonymizer.

Before any catch data leaves the system — whether it's going to wildlife
agency partners or being pooled into the community prediction model —
it must be anonymized. This means two things:

1. Strip all user identity: remove the user ID, account details, and
   anything else that could identify the person who caught the fish.

2. Snap the GPS coordinates to a 1km grid: instead of the exact location
   (which could reveal a person's home, private fishing spot, or daily routine),
   the coordinates are rounded to the nearest 1km grid cell. All catches
   within that grid cell look the same to the outside world.

These operations happen here and only here. No other part of the system
should be preparing anonymized data — it all goes through this module.
"""

from __future__ import annotations

import logging
import math
from typing import Any

logger = logging.getLogger(__name__)

# The size of the grid cells used for coordinate snapping, in decimal degrees.
# 1km is approximately 0.009 degrees of latitude at most latitudes.
GRID_SIZE_DEGREES = 0.009


def anonymize_catch(catch: dict) -> dict:
    """
    Takes a full catch record (as a dictionary from the database) and returns
    a new dictionary with all personal information removed and GPS coordinates
    snapped to the 1km grid.

    The returned dictionary contains only the fields that are safe to share:
    species, size, environmental conditions, and the gridded location.
    Nothing that could identify the user or pinpoint their exact fishing spot.
    """
    pass


def strip_user_identity(catch: dict) -> dict:
    """
    Removes all user-identifying fields from a catch record.
    Fields removed: user_id, any device identifiers, notes (which might
    contain personally identifying information), and any field not on the
    approved safe list.

    Returns a new dictionary — does not modify the original.
    """
    pass


def snap_coordinates_to_grid(latitude: float, longitude: float) -> tuple[float, float]:
    """
    Rounds GPS coordinates to the nearest 1km grid cell center.
    Two catches within the same 1km square will have identical coordinates
    after snapping, making it impossible to distinguish their exact locations.

    For example: 41.8827° N, 87.6233° W might snap to 41.881° N, 87.621° W.

    Returns (snapped_latitude, snapped_longitude).
    """
    pass


def is_safe_field(field_name: str) -> bool:
    """
    Returns True if a field is safe to include in anonymized output.
    Uses an allowlist approach — only explicitly approved fields are kept,
    everything else is dropped. This is safer than a blocklist because
    new fields added in the future are blocked by default until reviewed.
    """
    pass


# The fields that are allowed in anonymized catch data shared with partners
# or used in the community model. Everything else is stripped.
ALLOWED_ANONYMIZED_FIELDS = {
    "species",
    "length_cm",
    "dominant_color",
    "body_condition",
    "caught_at",
    "latitude",    # will be snapped to grid before export
    "longitude",   # will be snapped to grid before export
    "weather_condition",
    "air_temp_celsius",
    "water_temp_celsius",
    "barometric_pressure_hpa",
    "pressure_trend",
    "wind_speed_kmh",
    "moon_phase",
    "solunar_period",
    "data_quality_weight",
}
