"""
Environmental conditions fetcher.

Given a GPS location and a timestamp, this module goes out to external APIs
and assembles all the environmental data the app records alongside a catch:
weather, air temperature, water temperature (where available), barometric
pressure and its trend, wind speed and direction, moon phase, and solunar
feeding periods. The user never has to type any of this — it's pulled
automatically when they log a catch.
"""

from __future__ import annotations

import logging
import os
from datetime import datetime
from typing import Optional

import requests

logger = logging.getLogger(__name__)


def fetch_all_conditions(latitude: float, longitude: float, timestamp: datetime) -> dict:
    """
    The main function for this module. Given a location and time, calls out
    to all the individual data sources below and assembles everything into
    one dictionary that matches the ConditionsResponse shape expected by the Go backend.

    If a particular data source is unavailable, that field is omitted rather
    than failing the whole request — partial data is better than no data.
    """
    pass


def get_weather(latitude: float, longitude: float, timestamp: datetime) -> dict:
    """
    Calls the weather API to get current or historical weather conditions
    for a location. Returns temperature, weather description (sunny, cloudy,
    rainy, etc.), and wind data.

    Uses the WEATHER_API_KEY from environment variables.
    """
    pass


def get_barometric_pressure(latitude: float, longitude: float, timestamp: datetime) -> dict:
    """
    Fetches the barometric pressure at a location and also tries to determine
    the pressure trend — whether it's been rising, falling, or holding steady
    over the last few hours. The trend often matters more than the absolute value
    for predicting fish feeding behavior.

    Returns pressure in hPa and trend as one of: "rising", "falling", "steady".
    """
    pass


def get_water_temperature(latitude: float, longitude: float) -> Optional[float]:
    """
    Tries to find the water surface temperature for the nearest body of water.
    This data is patchier than weather data — not all locations have sensors.

    Returns the temperature in Celsius, or None if no data is available nearby.
    """
    pass


def get_moon_phase(timestamp: datetime) -> str:
    """
    Calculates the current moon phase for the given date.
    This doesn't need an external API — moon phase can be calculated astronomically.

    Returns a plain English phase name like "full moon", "new moon",
    "waxing gibbous", "waning crescent", etc.
    """
    pass


def get_solunar_periods(latitude: float, longitude: float, timestamp: datetime) -> Optional[str]:
    """
    Calls the solunar API to check whether a major or minor feeding period
    is active at this location and time. Solunar theory predicts that fish
    feed more actively during specific windows tied to the sun and moon.

    Returns a label like "major feeding period", "minor feeding period",
    or None if outside any active period.

    Uses the SOLUNAR_API_KEY from environment variables.
    """
    pass


def _make_request(url: str, params: dict, api_key_env: str) -> Optional[dict]:
    """
    A shared helper for making HTTP GET requests to external APIs.
    Handles adding the API key, setting a timeout, and catching network errors
    gracefully so one failed API call doesn't crash the whole fetch.
    Returns the parsed JSON response or None on failure.
    """
    pass
