"""
Fish size estimator module.

Tries to figure out how long the fish is from a photo.
The most reliable method is to spot a known-size reference object in the frame
(like a ruler, a tackle box, or the angler's hand) and calculate the fish's
length relative to it. If there's nothing recognizable to measure against,
the module falls back to a rougher estimate based on species and body proportions.
"""

from __future__ import annotations

import logging
from typing import Optional

import cv2
import numpy as np
from PIL import Image

logger = logging.getLogger(__name__)


def estimate_size(image: Image.Image, species: str) -> Optional[float]:
    """
    Main entry point for size estimation. Given an image and the species
    already identified by fish_detector, returns the estimated length in
    centimeters, or None if the estimate isn't confident enough to be useful.

    Tries reference-object-based measurement first, falls back to proportional
    estimation if no reference is found.
    """
    pass


def detect_reference_object(image: Image.Image) -> Optional[dict]:
    """
    Scans the image for objects with a known real-world size that can be used
    as a measuring reference. Currently looks for: rulers, measuring boards,
    standard lure sizes, and adult human hands (average span is roughly 20cm).

    Returns a dictionary with the reference object's type, its pixel width,
    and its real-world width in centimeters — or None if nothing usable is found.
    """
    pass


def measure_with_reference(image: Image.Image, fish_pixels: int, reference: dict) -> float:
    """
    Given the pixel length of the fish and the known size of a reference object,
    calculates the fish's real-world length in centimeters using simple proportion.
    This is the most accurate path — only used when detect_reference_object succeeds.
    """
    pass


def estimate_without_reference(image: Image.Image, species: str) -> Optional[float]:
    """
    Fallback for when there's no reference object in the frame.
    Uses the fish's body aspect ratio (length vs. depth) combined with average
    size ranges known for the species to produce a rough estimate.
    The returned value has lower confidence and should be flagged as approximate.

    Returns None if even this rough estimate can't be made reliably
    (e.g., the fish is at a bad angle or partially out of frame).
    """
    pass


def detect_fish_outline(image: Image.Image) -> Optional[np.ndarray]:
    """
    Uses edge detection to find the outline of the fish in the image.
    The outline is needed to measure the fish's pixel length accurately.
    Returns the contour as a NumPy array of points, or None if the fish
    can't be cleanly separated from the background.
    """
    pass


def pixels_to_length(pixel_count: int, pixels_per_cm: float) -> float:
    """
    Converts a pixel measurement to centimeters given a known scale factor.
    A pure math helper — no image processing here.
    """
    pass
