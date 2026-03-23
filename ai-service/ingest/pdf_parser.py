"""
PDF parser for wildlife agency documents.

Some agencies — particularly smaller state and regional ones — still publish
their stocking schedules and population survey results as PDF files rather
than using an API, RSS feed, or even a web page with structured HTML.

This module downloads those PDFs, extracts the text and table data, and
pulls out the structured information (stocking dates, species, counts,
water body names) that the normalizer can then standardize.
"""

from __future__ import annotations

import logging
import re
from typing import Any, Optional

import pdfplumber
import requests

logger = logging.getLogger(__name__)


def extract_from_pdf(pdf_url: str, agency_name: str) -> list[dict]:
    """
    The main entry point. Downloads a PDF from the given URL, runs it through
    the appropriate extraction functions depending on the type of document,
    and returns a list of raw event dictionaries for the normalizer.

    Tries to auto-detect whether the PDF contains a stocking schedule or
    a population survey based on keywords in the document.
    """
    pass


def download_pdf(url: str) -> bytes | None:
    """
    Downloads a PDF file from the internet and returns its raw bytes.
    Returns None if the download fails (bad URL, server error, timeout).
    """
    pass


def find_stocking_tables(pdf_bytes: bytes) -> list[dict]:
    """
    Opens the PDF using pdfplumber and looks for tables that contain
    stocking schedule data — rows with columns for water body name,
    species, count, and date. Returns each row as a dictionary.

    Handles cases where different agencies format their tables differently
    (some have headers, some don't; column order varies by agency).
    """
    pass


def parse_survey_data(pdf_bytes: bytes) -> list[dict]:
    """
    Extracts population survey results from a PDF. These are usually
    text-heavy reports with embedded tables showing species counts,
    abundance indices, or catch-per-effort statistics for specific waters.

    Returns a list of extracted data points as dictionaries.
    """
    pass


def extract_text_blocks(pdf_bytes: bytes) -> list[str]:
    """
    Reads all the text out of a PDF page by page and returns it as a
    list of text blocks. Used when the data is in paragraph form rather
    than a table.
    """
    pass


def parse_stocking_row(row: list, column_map: dict) -> Optional[dict]:
    """
    Given one row from a stocking table and a mapping of column positions to
    field names, extracts and cleans the values for water body, species,
    count, and date. Returns None if the row doesn't have enough data to
    be useful (e.g., a header row or a subtotal row).
    """
    pass


def normalize_water_body_name(raw_name: str) -> str:
    """
    Cleans up inconsistent water body names found in PDFs.
    For example: "L. Erie", "Lk. Erie", and "Lake Erie" should all become
    "Lake Erie". This makes deduplication and geographic matching work better.
    """
    pass
