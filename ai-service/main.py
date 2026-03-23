"""
Main entry point for the CastCreel AI service.

This service runs two servers simultaneously:
  - A FastAPI REST server on port 8000 (default transport)
  - A gRPC server on port 50051 (optional high-performance transport)

The Go backend talks to whichever one is configured via AI_TRANSPORT.
"""

import asyncio
import logging
import os
from contextlib import asynccontextmanager

import grpc
import uvicorn
from fastapi import FastAPI

from prediction.condition_model import get_community_prediction
from prediction.personal_model import get_personal_prediction, blend_personal_and_community
from vision.fish_detector import detect_fish
from vision.size_estimator import estimate_size
from ingest.env_fetcher import fetch_all_conditions

logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    This runs once when the server starts up and once when it shuts down.
    On startup: load the AI models into memory so the first request isn't slow.
    On shutdown: release any resources cleanly (open connections, model handles).
    """
    # --- startup ---
    logger.info("AI service starting up — loading models...")
    # TODO: load vision model, load prediction model
    yield
    # --- shutdown ---
    logger.info("AI service shutting down...")
    # TODO: release model resources, close any open connections


def create_app() -> FastAPI:
    """
    Creates and configures the FastAPI application.
    Think of this like assembling the app — attaching all the route handlers
    and setting up the metadata that shows up in the auto-generated docs.
    """
    app = FastAPI(
        title="CastCreel AI Service",
        description="Vision, prediction, and environmental data for the CastCreel fishing app.",
        version="0.1.0",
        lifespan=lifespan,
    )

    register_routes(app)
    return app


def register_routes(app: FastAPI) -> None:
    """
    Maps every URL path to the function that should handle it.
    All business logic lives in the individual modules — this is just the
    table of contents for the API.
    """
    # Vision endpoints
    app.add_api_route("/vision/detect", detect_fish_endpoint, methods=["POST"])
    app.add_api_route("/vision/size", estimate_size_endpoint, methods=["POST"])

    # Prediction endpoints
    app.add_api_route("/predict", predict_endpoint, methods=["POST"])

    # Environmental conditions endpoint
    app.add_api_route("/conditions", conditions_endpoint, methods=["POST"])

    # Health check — the Go backend pings this to make sure we're alive
    app.add_api_route("/health", health_check, methods=["GET"])


# ---------------------------------------------------------------------------
# Route handler functions
# Each of these is a thin shell — it reads the incoming request, calls the
# right module function to do the real work, and sends back the result.
# No business logic lives here.
# ---------------------------------------------------------------------------

async def detect_fish_endpoint(request: dict) -> dict:
    """
    Receives a fish photo and returns the identified species, dominant color,
    body condition, and estimated size. The heavy lifting is done by the
    fish_detector and size_estimator modules.
    """
    pass


async def estimate_size_endpoint(request: dict) -> dict:
    """
    Receives a fish photo and returns just the size estimate.
    Exposed as its own endpoint in case the Go backend needs size only
    without re-running the full species detection.
    """
    pass


async def predict_endpoint(request: dict) -> dict:
    """
    Receives the user's location, planned fishing date, user ID, and catch count.
    Returns a prediction about what species to target, when the best window is,
    what bait to use, and how confident the model is.
    Blends community data and personal data based on how many catches the user has.
    """
    pass


async def conditions_endpoint(request: dict) -> dict:
    """
    Receives a GPS location and timestamp.
    Returns all the environmental conditions for that place and time —
    weather, air and water temperature, barometric pressure and trend,
    wind, moon phase, and solunar feeding periods.
    """
    pass


async def health_check() -> dict:
    """
    A simple ping endpoint. Returns {"status": "ok"} when the service is running.
    The Go backend calls this on startup to confirm the AI service is reachable
    before accepting user requests.
    """
    return {"status": "ok"}


# ---------------------------------------------------------------------------
# gRPC server
# ---------------------------------------------------------------------------

async def start_grpc_server() -> None:
    """
    Starts the gRPC server on port 50051 so the Go backend can use the
    faster binary protocol instead of HTTP/JSON if configured to do so.
    Both servers run at the same time — gRPC and REST are always available.
    """
    pass


# ---------------------------------------------------------------------------
# Entry point
# ---------------------------------------------------------------------------

async def run() -> None:
    """
    Starts both the FastAPI REST server and the gRPC server at the same time.
    We use asyncio to run them concurrently in a single process.
    """
    grpc_task = asyncio.create_task(start_grpc_server())

    config = uvicorn.Config(
        app=create_app(),
        host="0.0.0.0",
        port=int(os.getenv("AI_SERVICE_PORT", "8000")),
        log_level="info",
    )
    server = uvicorn.Server(config)

    await asyncio.gather(grpc_task, server.serve())


if __name__ == "__main__":
    asyncio.run(run())
