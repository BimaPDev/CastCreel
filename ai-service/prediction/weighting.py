"""
Data quality weighting module.

Not all catches are created equal as data points. A catch made the day after
a lake was restocked with 500 fish doesn't tell us much about natural fish
behavior — those fish are disoriented and unusually catchable. If we train
the prediction model on that data as if it were normal, we'll end up with
overconfident predictions around stocking events.

This module calculates a quality weight between 0.0 and 1.0 for every catch.
The AI uses this weight during training so that low-signal catches have less
influence on the final model. A weight of 1.0 means full weight; 0.1 means
this catch barely counts.

Factors that reduce the weight:
  - A stocking event happened recently nearby
  - An algae bloom or pollution advisory is active
  - Recent flooding has disrupted normal fish behavior
  - The catch was during spawning season (fish are easier to catch, skewing data)
"""

from __future__ import annotations

import logging
from datetime import date, datetime

logger = logging.getLogger(__name__)

# How many days after a stocking event before catches get full weight again.
STOCKING_RECOVERY_DAYS = 14

# How many days after flooding before catches return to full weight.
FLOOD_RECOVERY_DAYS = 7


def calculate_data_quality_weight(
    catch_date: datetime,
    latitude: float,
    longitude: float,
    species: str,
) -> float:
    """
    The main function for this module. Given when and where a catch happened
    and what species was caught, returns a quality weight between 0.0 and 1.0.

    Internally calls each of the penalty functions below and combines them.
    A catch that passes all checks with no red flags gets a weight of 1.0.
    Multiple overlapping issues (e.g., stocking + algae bloom) compound the penalty.
    """
    pass


def stocking_recency_penalty(
    catch_date: datetime,
    latitude: float,
    longitude: float,
    species: str,
) -> float:
    """
    Looks up whether a stocking event happened near this location recently
    and involving this species. If so, returns a penalty factor that reduces
    the catch's quality weight.

    The penalty decreases linearly over STOCKING_RECOVERY_DAYS after the event.
    A catch two days after stocking gets a heavy penalty; two weeks later it's back to normal.
    Returns 0.0 (maximum penalty) to 1.0 (no penalty).
    """
    pass


def algae_bloom_penalty(
    catch_date: datetime,
    latitude: float,
    longitude: float,
) -> float:
    """
    Checks whether an active algae bloom or water quality advisory was in effect
    near this location on the catch date. Fish behavior changes significantly
    during blooms — they may congregate in oxygenated areas or go off feed entirely.
    Returns 0.0 (heavy penalty) to 1.0 (no penalty).
    """
    pass


def flood_penalty(
    catch_date: datetime,
    latitude: float,
    longitude: float,
) -> float:
    """
    Checks whether recent flooding affected the area near this catch.
    Floodwater changes temperature, turbidity, and fish locations dramatically.
    Catches made during or right after flooding are less representative of
    normal conditions and shouldn't be weighted heavily.
    Returns 0.0 (heavy penalty) to 1.0 (no penalty).
    """
    pass


def spawn_season_flag(
    catch_date: datetime,
    latitude: float,
    longitude: float,
    species: str,
) -> float:
    """
    Checks whether the catch occurred during spawning season for this species
    in this region. During spawning, fish are often concentrated in shallow areas
    and more aggressive — catch rates are artificially elevated, which would
    skew the model's understanding of typical behavior.

    Returns a mild penalty (around 0.7) during peak spawn, or 1.0 outside of it.
    The penalty is softer than stocking because spawning is a natural behavior —
    it's just a flag that this data represents a special period.
    """
    pass


def combine_penalties(*penalty_factors: float) -> float:
    """
    Takes multiple penalty factors (each between 0.0 and 1.0) and combines them
    into a single final weight. Uses multiplication so that overlapping issues
    compound — a 0.5 stocking penalty and a 0.8 algae penalty together give 0.4.
    Clamps the result to a minimum of 0.05 so no catch is ever completely worthless.
    """
    pass
