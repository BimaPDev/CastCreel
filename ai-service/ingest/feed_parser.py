"""
RSS and Atom feed parser.

Some wildlife agencies publish their news and stocking updates as RSS or Atom feeds.
These are much easier to parse reliably than web scraping because the structure
is standardized. This module reads those feeds, filters out entries that are
relevant to fishing (ignoring unrelated wildlife news), and returns the relevant
entries in raw form for the normalizer to standardize.
"""

from __future__ import annotations

import logging
from typing import Any

import feedparser

logger = logging.getLogger(__name__)

# Keywords that suggest a feed entry is relevant to fishing or water conditions.
RELEVANT_KEYWORDS = [
    "stocking", "fish", "trout", "bass", "walleye", "salmon",
    "regulation", "season", "water quality", "algae", "invasive",
    "advisory", "survey", "population",
]


def parse_feed(feed_url: str, agency_name: str) -> list[dict]:
    """
    Fetches and parses an RSS or Atom feed from the given URL.
    Filters the entries down to only those that seem relevant to fishing
    or water conditions, and returns them as raw dictionaries ready
    for the normalizer.

    If the feed can't be fetched or is malformed, logs an error and
    returns an empty list rather than crashing.
    """
    pass


def extract_events_from_entries(entries: list, agency_name: str) -> list[dict]:
    """
    Takes the raw entries from feedparser and converts each relevant one
    into a plain dictionary with consistent field names before normalization.
    Fields extracted: title, description, published date, link (source URL),
    and agency name.
    """
    pass


def is_relevant_entry(entry) -> bool:
    """
    Decides whether a feed entry is something the app cares about.
    Checks the title and summary for keywords related to fish stocking,
    fishing regulations, water quality, or invasive species.

    Returns True if it looks relevant, False if it seems to be about
    something else (hunting seasons, hiking, land management, etc.).
    """
    pass


def parse_entry_date(entry) -> str | None:
    """
    Pulls the publication date out of a feed entry.
    feedparser normalizes dates into a time_struct, but some feeds have
    malformed dates. This tries the standard fields in order and falls
    back to today's date if nothing parseable is found.
    """
    pass
