"""
Event normalizer.

Data comes into the system in many different shapes depending on the source:
JSON from a REST API, entries from an RSS feed, rows scraped from an HTML table,
or data pulled out of a PDF. Each source uses different field names, date
formats, and data structures.

This module is the funnel everything passes through. It converts all those
different formats into one consistent internal structure — the WildlifeEvent
shape that the rest of the system (the database, the notification job, the news
feed handler) knows how to work with.
"""

from __future__ import annotations

import logging
from dataclasses import dataclass, field
from datetime import datetime
from typing import Any, Optional

logger = logging.getLogger(__name__)


@dataclass
class NormalizedEvent:
    """
    The standard internal shape for any wildlife event after normalization.
    This matches the WildlifeEvent model in the Go backend.
    """
    event_type: str        # "stocking", "regulation_change", "water_advisory", etc.
    title: str
    description: str
    source_agency: str
    source_url: str
    latitude: float
    longitude: float
    radius_km: float
    occurred_at: datetime
    water_body_name: Optional[str] = None
    stocked_species: Optional[str] = None
    stocked_count: Optional[int] = None


def normalize_event(raw_event: dict, event_type: str) -> Optional[NormalizedEvent]:
    """
    Routes a raw event to the right type-specific normalizer based on event_type.
    If normalization fails (missing required fields, unparseable date, etc.),
    logs the problem and returns None so the caller can skip the broken record.
    """
    pass


def normalize_stocking_event(raw: dict) -> Optional[NormalizedEvent]:
    """
    Converts a raw stocking event record — from whatever source scraped it —
    into a NormalizedEvent. Makes sure the water body name is clean, the count
    is an integer, the species name is standardized, and the date is a proper
    datetime object. Geocodes the water body name to GPS coordinates if needed.
    """
    pass


def normalize_regulation_change(raw: dict) -> Optional[NormalizedEvent]:
    """
    Converts a raw regulation change entry into a NormalizedEvent.
    Regulation changes often affect a large area (like an entire river system),
    so the radius_km is typically set large. The description should be the full
    text of the rule change so users can read exactly what changed.
    """
    pass


def normalize_water_advisory(raw: dict) -> Optional[NormalizedEvent]:
    """
    Converts a raw water quality advisory (algae bloom, flood warning, pollution
    alert) into a NormalizedEvent. Also stores the normalized event in a way
    that the weighting module can find it later when calculating catch quality weights.
    """
    pass


def normalize_population_survey(raw: dict) -> Optional[NormalizedEvent]:
    """
    Converts population survey results into a NormalizedEvent. These are
    valuable but typically lower-urgency than stocking or advisories —
    they go into the news feed but don't trigger push notifications.
    """
    pass


def parse_date(date_str: str) -> Optional[datetime]:
    """
    Tries to parse a date string in any of the common formats agencies use:
    ISO 8601, US format (MM/DD/YYYY), written-out dates ("April 15, 2026"), etc.
    Returns a datetime object or None if nothing works.
    """
    pass


def lookup_water_body_coordinates(water_body_name: str, agency_state: str) -> Optional[tuple[float, float]]:
    """
    Given a water body name and the state it's in, tries to find its GPS
    coordinates. First checks our own internal cache of known water bodies,
    then falls back to a geocoding API for unfamiliar names.
    Returns (latitude, longitude) or None if the location can't be found.
    """
    pass
