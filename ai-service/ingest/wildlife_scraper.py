"""
Wildlife agency web scraper.

Some wildlife agencies publish stocking schedules, regulation changes, and
advisories on their websites but don't provide a proper API or RSS feed to
pull from. This module handles those agencies by scraping their web pages
directly with an HTTP client and an HTML parser.

Every agency scraper is self-contained here. When a new agency is added,
a new scraping function goes here. The normalizer module then converts the
raw scraped data into the app's standard format.
"""

from __future__ import annotations

import logging
from typing import Any

import requests
from bs4 import BeautifulSoup

logger = logging.getLogger(__name__)


def scrape_all_agencies() -> list[dict]:
    """
    Runs the scraper for every configured agency and returns all the raw
    events collected as a flat list. Called by the ingest job on each cycle.

    If one agency's scraper fails, the error is logged and the others
    continue — a broken scraper shouldn't stop data from other sources.
    """
    pass


def scrape_agency(agency_config: dict) -> list[dict]:
    """
    Runs the appropriate scraping function for a single agency based on
    its config entry. The config tells us the agency name, URL, and which
    scraping strategy to use (some agencies change their layout over time
    and may need custom handling).

    Returns a list of raw event dictionaries before normalization.
    """
    pass


def scrape_stocking_events(url: str, agency_name: str) -> list[dict]:
    """
    Fetches a stocking schedule page and extracts each stocking entry —
    the water body name, the species stocked, the count, and the date.
    This is the most common thing agencies publish and the most valuable
    for the app (stocking events trigger user notifications).

    Returns raw dictionaries before normalization.
    """
    pass


def scrape_regulation_changes(url: str, agency_name: str) -> list[dict]:
    """
    Fetches a regulations or news page and looks for entries about
    rule changes — season dates, size limits, bag limits, or area closures.
    These are important to surface to users so they stay legal.

    Returns raw dictionaries before normalization.
    """
    pass


def get_configured_agencies() -> list[dict]:
    """
    Returns the list of agency configurations — name, URL, scraping strategy,
    and any agency-specific settings. In a later iteration this could come
    from a config file or database table; for now it's defined here.
    """
    pass


def _fetch_page(url: str) -> BeautifulSoup | None:
    """
    Fetches a web page and returns it as a BeautifulSoup object ready to parse.
    Returns None if the request fails or the page can't be read.
    Respects a polite delay between requests so we don't hammer agency servers.
    """
    pass
