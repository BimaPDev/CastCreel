"""
Fish detector module.

Takes a photo of a fish and figures out the species, dominant color, and
approximate body condition using a computer vision model. This is the first
thing that runs when a user submits a new catch — before any environmental
data is fetched or anything is saved to the database.
"""

from __future__ import annotations

import io
import logging
from typing import Optional

import numpy as np
from PIL import Image
from transformers import pipeline

logger = logging.getLogger(__name__)

# The vision model is loaded once at startup and reused for every request.
# Loading it on every call would be extremely slow.
_model = None


def load_model() -> None:
    """
    Loads the fish species classification model into memory.
    Called once at server startup, not on every request.
    The model is stored in the module-level _model variable so it persists
    between calls without being reloaded.
    """
    pass


def detect_fish(image_bytes: bytes, user_id: int) -> dict:
    """
    The main function for this module. Takes the raw bytes of a fish photo
    and returns everything the app needs to fill in a new catch record:
    species name, dominant color, body condition, and an estimated length
    if one can be reliably measured from the image.

    Returns a dictionary with keys: species, dominant_color, body_condition,
    estimated_length_cm (optional), confidence_score.
    """
    pass


def get_species(image: Image.Image) -> tuple[str, float]:
    """
    Runs the image through the classification model and returns the most
    likely fish species name and a confidence score between 0.0 and 1.0.
    A low confidence score (below about 0.5) means the model isn't sure —
    the caller should flag this for possible manual correction.
    """
    pass


def get_dominant_color(image: Image.Image) -> str:
    """
    Finds the most common color in the fish itself — not the background or
    the angler's hands. Returns a plain English color name like "olive green",
    "silver", or "brownish-yellow". Used as a secondary data point to help
    distinguish similar-looking species.
    """
    pass


def get_body_condition(image: Image.Image, species: str) -> str:
    """
    Looks at the fish's overall shape and proportions to make a rough judgment
    about how healthy it appears. Returns a simple label like "good", "thin",
    or "poor". This is useful wildlife data — thin fish in a normally healthy
    lake might indicate a food problem worth investigating.
    """
    pass


def preprocess_image(image_bytes: bytes) -> Image.Image:
    """
    Converts raw image bytes into a PIL Image object and does the basic
    preparation the model expects — resizing, rotating if EXIF says to,
    and converting to the right color mode. Called before any analysis.
    """
    pass


def crop_to_fish(image: Image.Image) -> Image.Image:
    """
    Tries to detect where the fish is in the frame and crops the image
    to just the fish, removing background clutter. A cleaner input image
    means more accurate species identification.
    If no fish region can be detected, returns the original image unchanged.
    """
    pass
