"""
Notification background job.

This job runs shortly after each ingest cycle completes.
It looks at the stocking events and other alerts that were just ingested,
finds users who have saved locations near those events, checks their
notification preferences to see what they want to hear about, and queues
push notifications for the ones who should be told.

The goal is that when a lake near a user's saved spot gets stocked,
that user gets a push notification within a few hours — without anyone
having to manually curate or send alerts.
"""

from __future__ import annotations

import logging
from datetime import datetime, timedelta

import requests
from apscheduler.schedulers.asyncio import AsyncIOScheduler
from apscheduler.triggers.interval import IntervalTrigger
from sqlalchemy.orm import Session

logger = logging.getLogger(__name__)

# How many hours after the ingest job runs before this job fires.
# Set slightly after ingest so new events are guaranteed to be in the database.
NOTIFICATION_JOB_DELAY_HOURS = 0.25  # 15 minutes after ingest

# How many hours back to look for new events when checking.
# Should match INGEST_INTERVAL_HOURS in ingest_job.py.
LOOKBACK_HOURS = 7


def schedule_notification_job(scheduler: AsyncIOScheduler) -> None:
    """
    Registers the notification job with the scheduler.
    It's set to run on the same interval as the ingest job but delayed by
    15 minutes so the ingest cycle has time to finish writing to the database.
    """
    pass


async def run_notification_check() -> None:
    """
    The main function that runs each time the job fires.
    Steps:
      1. Load all wildlife events ingested in the last LOOKBACK_HOURS hours.
      2. For each event, find users with a saved location near it.
      3. Filter those users by their notification preferences.
      4. For each eligible user, create a notification record in the database
         and send a push notification to their device.
      5. Log a summary of how many notifications were sent.
    """
    pass


def find_users_near_stocking(stocking_event: dict, db_session: Session) -> list[dict]:
    """
    Given a stocking event (with location and radius), queries the database
    for users who have a saved location that overlaps with the event's area.
    Uses a haversine distance calculation to check proximity.

    Returns a list of user records including their push token and
    notification preferences, ready for the eligibility check.
    """
    pass


def find_users_near_event(event: dict, db_session: Session) -> list[dict]:
    """
    Same as find_users_near_stocking but works for any event type —
    regulation changes, water advisories, invasive species alerts.
    The distance check is the same; only the event type changes.
    """
    pass


def filter_by_preferences(users: list[dict], event_type: str) -> list[dict]:
    """
    Given a list of nearby users and the type of event, filters down to only
    the users who have that notification type turned on in their preferences.
    For example, a user who turned off water advisories won't be in the result
    even if they're geographically close to an advisory event.
    """
    pass


def queue_push_notifications(user: dict, event: dict, db_session: Session) -> None:
    """
    For a single user and event, creates the notification record in the database
    (so it appears in their in-app inbox) and sends a push notification to their
    device via the configured push notification service (e.g. Firebase FCM).

    If the user has no push token on file, still creates the in-app record
    but skips the push notification step.
    """
    pass


def send_push_notification(push_token: str, title: str, body: str) -> bool:
    """
    Sends a single push notification to a device via the external push
    notification service. Returns True if the send succeeded, False if it
    failed (e.g., stale or invalid push token).

    Uses PUSH_NOTIFICATION_SERVICE_KEY from environment variables.
    """
    pass


def build_notification_content(event: dict) -> tuple[str, str]:
    """
    Given an event, generates the title and body text for the notification.
    For example, a stocking event for Lake Erie walleye might become:
      Title: "Lake Erie just got stocked!"
      Body: "2,000 walleye were added to Lake Erie, 3km from your saved spot."
    Returns (title, body).
    """
    pass


def haversine_distance_km(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
    """
    Calculates the straight-line distance in kilometers between two GPS coordinates
    using the haversine formula. Used to check if an event is within a user's
    saved location radius.
    """
    pass
