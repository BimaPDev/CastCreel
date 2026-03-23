"""
Ingest background job.

This is a scheduled job that runs automatically every few hours.
Its job is to go out to all the configured wildlife agency data sources —
REST APIs, RSS feeds, scrapers, and PDF documents — collect any new events,
normalize them into the standard internal format, and save them to the database.

After this job runs, the notification job checks the new events against
users' saved locations to decide who needs to be alerted.
"""

from __future__ import annotations

import logging
from datetime import datetime

from apscheduler.schedulers.asyncio import AsyncIOScheduler
from apscheduler.triggers.interval import IntervalTrigger
from sqlalchemy import create_engine
from sqlalchemy.orm import Session

from ingest.feed_parser import parse_feed
from ingest.normalizer import normalize_event
from ingest.pdf_parser import extract_from_pdf
from ingest.wildlife_scraper import scrape_all_agencies

logger = logging.getLogger(__name__)

# How many hours between each full ingest cycle.
INGEST_INTERVAL_HOURS = 6


def schedule_ingest_job(scheduler: AsyncIOScheduler) -> None:
    """
    Registers the ingest job with the scheduler so it runs on a fixed interval.
    The scheduler is started by main.py at server startup.
    The job will fire immediately on startup and then repeat every INGEST_INTERVAL_HOURS.
    """
    pass


async def run_ingest_cycle() -> None:
    """
    The main function that runs each time the job fires.
    Steps:
      1. Run all scrapers to collect raw events from agency websites.
      2. Parse all configured RSS/Atom feeds.
      3. Download and parse any configured PDF documents.
      4. Normalize all raw events into the standard NormalizedEvent shape.
      5. Save any events that are new (not already in the database).
      6. Log how many events were found and how many were new.
    """
    pass


async def run_feed_ingest() -> list[dict]:
    """
    Fetches all configured RSS/Atom feeds and returns their entries as raw
    dictionaries before normalization. Feeds are configured by agency and URL.
    """
    pass


async def run_pdf_ingest() -> list[dict]:
    """
    Downloads and parses all configured PDF documents and returns the extracted
    data as raw dictionaries before normalization. PDFs are configured by
    agency, URL, and document type (stocking vs. survey).
    """
    pass


def save_new_events(events: list, db_session: Session) -> int:
    """
    Takes a list of NormalizedEvent objects and saves any that aren't already
    in the database. Uses the source_url field to check for duplicates —
    if we've already stored an event from that URL, we skip it.

    Returns the count of new events actually inserted.
    """
    pass


def is_duplicate(source_url: str, db_session: Session) -> bool:
    """
    Checks whether an event with this source URL already exists in the database.
    Used to avoid re-inserting the same event every time the ingest job runs.
    """
    pass


def get_ingest_db_session() -> Session:
    """
    Creates and returns a database session for the ingest job to use.
    The job runs in a background thread separate from the web server,
    so it needs its own database connection rather than borrowing from
    the web server's connection pool.
    """
    pass
