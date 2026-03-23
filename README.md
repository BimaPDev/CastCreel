# CastCreel

CastCreel is a fishing log app where users photograph their catches and the app automatically identifies the species, estimates the size, and records environmental conditions at the moment of the catch. That data powers an AI prediction engine that tells anglers the best time, place, and technique to fish next. Anonymized catch data is contributed to wildlife agencies as a citizen science dataset.

---

## Table of Contents

- [Features](#features)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [How the AI Works](#how-the-ai-works)
- [Visibility System](#visibility-system)
- [Community Groups](#community-groups)
- [Data Privacy](#data-privacy)
- [Wildlife Partner API](#wildlife-partner-api)
- [Project Structure](#project-structure)
- [Backend API Reference](#backend-api-reference)
- [Environment Variables](#environment-variables)
- [Running Locally](#running-locally)
- [Background Jobs](#background-jobs)
- [Database Migrations](#database-migrations)
- [Notifications](#notifications)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [Wildlife Agency Onboarding](#wildlife-agency-onboarding)

---

## Features

### Catch Logging
- Photograph a catch with your phone camera
- The AI vision system identifies the species, dominant color, and body condition from the photo
- Size is estimated automatically from the image
- GPS location is recorded at the moment of logging
- Environmental conditions are automatically fetched and attached: weather, air and water temperature, barometric pressure and trend, wind speed and direction, moon phase, and solunar feeding periods
- Users can add notes and bait/technique; any AI-detected field can be manually corrected

### AI Fishing Predictions
- Request a prediction before heading out: given your location and planned time window, the engine returns the best target species, optimal fishing window, recommended bait or technique, and a confidence score
- New users receive community-wide predictions based on what other anglers catch in similar conditions
- As a user logs more catches, the prediction engine gradually shifts toward their personal patterns — what they tend to catch, where they fish, what techniques work for them
- The personal/community blend is gradual: meaningful personal influence starts around 10 catches and reaches maximum weight around 100; community knowledge never drops to zero

### World Map
- Public catches appear on a shared world map
- GPS coordinates are fuzzed before display — each location is shifted by a small random amount so the general area is visible but the precise fishing spot is never revealed to other users

### Social — Friends
- Send and accept friend requests by username
- Friend-visible catches are shared with approved connections only

### Social — Community Groups
- Create named groups (e.g. "Lake Erie Bass Crew") for a circle of anglers
- Public groups are discoverable by any user; private groups require an invite code or admin approval
- Group visibility sits between friends and public — members can see catches shared to a group even if they are not personal friends with the catcher
- A catch can be shared to multiple groups simultaneously
- Admins can manage membership, promote moderators, generate invite codes, and update group settings
- Each group has its own catch feed and aggregate statistics: top species, most active members, catch rate over time

### Saved Locations and Alerts
- Bookmark fishing spots with a custom name and alert radius
- Receive notifications when a stocking event, regulation change, or water quality advisory is detected within that radius

### Wildlife News
- In-app feed of wildlife news, stocking reports, regulation updates, and environmental advisories
- Data is ingested automatically from agency REST APIs, RSS feeds, PDFs, and web scrapers

---

## Architecture

```
React Web App              Expo Mobile App
(Vite :3000)               (Expo Go / simulator)
      │                            │
      └──────────────┬─────────────┘
                     │  HTTP (REST) — @castcreel/shared API client
                     ▼
        ┌─────────────────────────────┐
        │        Go Backend           │   :8080
        │  handlers / middleware      │
        │  clients / models           │
        └─────────────┬───────────────┘
                      │  HTTP REST  :8000  (default)
                      │  or gRPC    :50051 (opt-in via AI_TRANSPORT=grpc)
                      ▼
        ┌─────────────────────────────┐
        │    Python AI Service        │
        │  vision — species, size     │
        │  prediction — conditions    │
        │  ingest — wildlife data     │
        │  jobs — background tasks    │
        └─────────────┬───────────────┘
                      │
                      ▼
        ┌─────────────────────────────┐
        │        PostgreSQL           │   :5432
        └─────────────────────────────┘

                      ▲  ingest
                      │
          Wildlife Agencies
          (REST APIs, RSS, scrapers, PDFs)
```

Both the HTTP REST server and the gRPC server run simultaneously inside the Python service — the Go backend picks which one to use based on the `AI_TRANSPORT` environment variable. Switching transports requires no code change.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Backend API | Go 1.22 + chi router |
| Database driver | pgx/v5 (no lib/pq) |
| Auth | JWT — golang-jwt/jwt v5 |
| Rate limiting | golang.org/x/time/rate (token bucket, per user ID or IP) |
| AI / Vision service | Python 3.12 + FastAPI + uvicorn |
| AI transport | HTTP REST (default) or gRPC — abstracted behind `AIClient` interface |
| gRPC contract | Proto files in `proto/` — vision, prediction, conditions |
| Background jobs | APScheduler (Python) |
| ML vision | transformers + opencv-python |
| Container orchestration | Docker Compose (backend services only) |
| Web frontend | Vite + React 18 + TypeScript |
| Mobile app | Expo + React Native + TypeScript + Expo Router (file-based routing) |
| Shared types + API client | `@castcreel/shared` — TypeScript package, no framework dependencies |
| State management | Zustand (web: localStorage persist; mobile: Expo SecureStore) |
| Server state / caching | TanStack Query |
| Web map | Leaflet + react-leaflet |
| Mobile map | React Native Maps |
| Mobile camera / location | Expo Camera, Expo Location |
| Push notifications | Expo Notifications |

---

## How the AI Works

### Vision Pipeline
When a user logs a catch, the Go backend sends the photo to the Python AI service. The vision pipeline runs two models:
1. **Fish detector** — identifies the species and assesses body condition from the image
2. **Size estimator** — estimates the length of the fish in centimeters

Both results are returned to the Go backend, which assembles them with the environmental conditions fetched in parallel into a single catch record saved to the database.

### Environmental Conditions
Every catch automatically captures:
- Weather condition, air temperature
- Water temperature
- Barometric pressure and trend (rising / falling / steady)
- Wind speed and direction
- Moon phase
- Solunar feeding period

These are fetched from external APIs keyed by the catch's GPS coordinates and timestamp, then stored permanently on the catch record so the prediction model can train on conditions even after the real-time data is no longer available.

### Prediction Engine
The prediction system has two layers:

**Community model** — trained on all anonymized catch data across all users. It understands which species bite under which conditions, in which regions, at which times of year. This is what new users rely on entirely.

**Personal model** — trained on an individual user's own catch history. It learns their patterns: where they fish, what they tend to catch, which techniques work for them. A blending function combines both layers — new users get pure community predictions, and the personal weight grows gradually with catch count (meaningful at ~10 catches, maximum at ~100).

### Data Quality Weighting
Not all catches are equal as training data. Every catch receives a quality weight between 0.0 and 1.0. Weights are reduced by:

| Factor | Effect |
|---|---|
| Recent stocking event nearby | Heavy penalty, decaying linearly over 14 days after the event |
| Active algae bloom or water quality advisory | Moderate penalty |
| Recent flooding | Moderate penalty, recovering after 7 days |
| Spawning season for this species | Mild penalty (~0.7) — natural behavior but elevated catch rates skew the model |
| Multiple overlapping factors | Penalties multiply together, minimum floor of 0.05 |

The AI trains with these weights so that low-signal catches have less influence on the final model.

---

## Visibility System

Every catch has a social visibility level. These are separate from the always-on wildlife data contribution:

| Level | Who can see it |
|---|---|
| **Private** (1) | Only the person who logged it |
| **Friends** (2) | The user's approved friends |
| **Group** (3) | Members of the groups explicitly chosen when logging the catch |
| **Public** (4) | Anyone using the app — location is fuzzed before display |
| **Wildlife** (5) | Not a social setting — anonymized data is always contributed to the wildlife pipeline regardless of the level above |

When a catch is set to **Group** visibility, `group_ids` must contain at least one group ID. A single catch can be shared to multiple groups simultaneously.

---

## Community Groups

Groups are the social layer between friends (bilateral, explicit approval) and public (visible to everyone). Key design points:

- **Public groups** appear in search results; any user can join immediately
- **Private groups** are hidden from search; new members must either use an invite code or submit a join request that an admin or moderator approves
- **Roles:** admin → moderator → member. Admins can promote members to moderator. Moderators can approve/decline join requests and remove regular members. Only one admin per group; the sole admin cannot leave without transferring ownership or deleting the group
- **Invite codes** are short random strings that let anyone bypass the approval flow. Admins generate and reset them. Changing a private group to public automatically invalidates any outstanding invite code
- **Group feed** shows only catches explicitly shared to that group
- **Group stats** aggregate total catches, top species, most active members, and a catch-rate time series over 30 days

---

## Data Privacy

Privacy is built in at the data layer, not bolted on afterward:

**GPS fuzzing (social):** When a public catch is served to the world map, the exact coordinates are shifted by a small random offset. The general area is correct but the precise fishing spot cannot be reverse-engineered.

**GPS snapping (wildlife):** Before any catch data is shared with wildlife agency partners or used to train the community model, coordinates are snapped to the nearest 1km grid cell. All catches within that cell become indistinguishable in location.

**Identity stripping:** The anonymizer removes all user-identifying fields — user ID, notes (which could contain personal information), and any field not on an explicit allowlist — before data leaves the system. The allowlist approach means new fields added to the catch model are blocked from export by default until they are reviewed and approved.

**User control:** Users choose the social visibility of every individual catch. The wildlife data contribution is always-on and is explained once at onboarding — it is not a per-catch toggle, which ensures the dataset is complete and consistent for scientific use.

---

## Wildlife Partner API

Wildlife agencies and biology departments that have a partner API key can access anonymized aggregate endpoints:

| Endpoint | Description |
|---|---|
| `GET /partner/stats` | Total catches by species, average size, catch rates per body of water, time trends. GPS snapped to 1km grid, no user data. |
| `GET /partner/stocking-effectiveness` | For each recorded stocking event, how many catches were logged in that area in the weeks after, by species. Helps agencies tune stocking programs. |
| `GET /partner/species-trends` | Time-series of whether catch rates per species are trending up, down, or flat. Population monitoring without expensive surveys. |
| `GET /partner/catch-rates` | Fish per hour of effort by region, species, and time range. |

Partner authentication uses a static API key in the `X-Partner-Key` header, separate from the user JWT system.

---

## Project Structure

```
castcreel/
│
├── backend/                    Go API server
│   ├── main.go                 Entry point — wires everything together, graceful shutdown
│   ├── config/config.go        All settings loaded from environment variables
│   ├── db/
│   │   ├── connection.go       pgxpool setup and teardown
│   │   ├── migrations.go       Runs SQL migration files in order at startup
│   │   ├── migrations/         SQL migration files (001–010)
│   │   └── queries/            Commented-out SQL query stubs per table
│   ├── models/                 Struct definitions only — no DB logic
│   │   ├── catch.go            Catch, VisibilityLevel
│   │   ├── group.go            Group, GroupMember, JoinRequest, GroupRole
│   │   ├── user.go             User
│   │   ├── friendship.go       Friendship
│   │   ├── location.go         SavedLocation
│   │   ├── notification.go     Notification
│   │   └── wildlife_event.go   WildlifeEvent
│   ├── handlers/               One file per resource — HTTP handler methods
│   │   ├── auth.go             Register, Login, Logout, RefreshToken
│   │   ├── catches.go          CRUD + public map
│   │   ├── groups.go           Full group and membership lifecycle
│   │   ├── friends.go          Friend requests, list, remove
│   │   ├── predictions.go      Relay to AI service
│   │   ├── locations.go        Saved locations CRUD
│   │   ├── notifications.go    History, preferences, mark read
│   │   ├── news.go             Wildlife news feed
│   │   └── wildlife_partner.go Partner-only aggregate endpoints
│   ├── middleware/
│   │   ├── auth.go             JWT validation, user ID injection into context
│   │   └── ratelimit.go        Token bucket per user ID (or IP as fallback)
│   └── clients/
│       ├── ai_client.go        AIClient interface — transport-agnostic
│       ├── http_client.go      HTTP REST implementation
│       └── grpc_client.go      gRPC implementation (opt-in via AI_TRANSPORT=grpc)
│
├── ai-service/                 Python AI service
│   ├── main.py                 FastAPI app + gRPC server, both run simultaneously
│   ├── vision/
│   │   ├── fish_detector.py    Species identification, color, body condition
│   │   └── size_estimator.py   Fish length estimation from image
│   ├── prediction/
│   │   ├── condition_model.py  Community-wide prediction model
│   │   ├── personal_model.py   Personal layer + blend_personal_and_community()
│   │   └── weighting.py        Data quality weight calculation (stocking, algae, flood, spawn)
│   ├── ingest/
│   │   ├── env_fetcher.py      Fetch weather, pressure, water temp, moon, solunar
│   │   ├── wildlife_scraper.py Scrape wildlife agency websites
│   │   ├── feed_parser.py      Parse RSS and Atom feeds
│   │   ├── pdf_parser.py       Extract stocking reports from PDF documents
│   │   ├── normalizer.py       Normalize raw ingest data into a standard schema
│   │   └── anonymizer.py       Strip identity + snap GPS to 1km grid before export
│   └── jobs/
│       ├── ingest_job.py       APScheduler job — runs ingest pipeline on a schedule
│       └── notification_job.py APScheduler job — fires alerts for saved location events
│
├── proto/                      gRPC service definitions
│   ├── vision.proto            Fish detection and size estimation RPC contracts
│   ├── prediction.proto        Fishing prediction RPC contract
│   └── conditions.proto        Environmental conditions RPC contract
│
├── frontend-shared/            @castcreel/shared — no framework dependencies
│   ├── types/
│   │   ├── catch.ts            Catch, VisibilityLevel, CreateCatchRequest, UpdateCatchRequest
│   │   ├── group.ts            Group, GroupMember, GroupRole, JoinRequest, GroupStats
│   │   ├── friend.ts           Friendship, FriendSummary, PendingRequest
│   │   ├── user.ts             User
│   │   ├── location.ts         SavedLocation
│   │   ├── notification.ts     Notification
│   │   └── ...
│   └── api/
│       ├── client.ts           ApiClient class — auth headers, JSON, error handling
│       ├── catches.ts          Catch API functions
│       ├── groups.ts           Group API functions (19 functions)
│       ├── friends.ts          Friend API functions
│       ├── auth.ts             Auth API functions
│       └── ...
│
├── frontend-web/               Vite + React 18 web app
│   └── src/
│       ├── pages/              One component per route
│       │   ├── GroupsPage.tsx          Groups list, pending requests, public search
│       │   ├── GroupDetailPage.tsx     Feed, stats, members, admin controls
│       │   └── ...
│       └── components/
│           ├── GroupCard.tsx           Group summary card with contextual action button
│           ├── GroupStatsPanel.tsx     Top species, active members, catch-rate chart
│           ├── VisibilitySelector.tsx  4-option picker + secondary group multi-select
│           └── ...
│
├── frontend-mobile/            Expo + React Native app
│   ├── app/                    Expo Router file-based routes
│   │   ├── groups.tsx          Groups screen
│   │   ├── group/[id].tsx      Group detail screen
│   │   └── ...
│   └── src/components/
│       ├── GroupCard.tsx       Touch-optimised group card
│       ├── VisibilitySelector.tsx  Bottom sheet + second sheet for group multi-select
│       └── ...
│
├── docker-compose.yml          Starts Go backend, Python AI service, and PostgreSQL
├── .env.example                Template for all environment variables
└── README.md
```

---

## Backend API Reference

### Public (no auth required)

| Method | Path | Description |
|---|---|---|
| POST | `/auth/register` | Create a new account |
| POST | `/auth/login` | Log in, receive JWT |
| POST | `/auth/refresh` | Exchange a refresh token for a new access token |
| GET | `/map/catches` | Public catch map data (GPS fuzzed, no user identity) |

### Protected (JWT required)

**Auth**

| Method | Path | Description |
|---|---|---|
| POST | `/auth/logout` | Invalidate the current session |

**Catches**

| Method | Path | Description |
|---|---|---|
| POST | `/catches` | Log a new catch (photo + GPS) |
| GET | `/catches` | List the current user's catches |
| GET | `/catches/{id}` | Get a single catch |
| PUT | `/catches/{id}` | Update a catch |
| DELETE | `/catches/{id}` | Delete a catch |

**Predictions**

| Method | Path | Description |
|---|---|---|
| GET | `/predictions` | Get a fishing prediction for a location and time window |

**Friends**

| Method | Path | Description |
|---|---|---|
| POST | `/friends/request` | Send a friend request |
| POST | `/friends/accept/{id}` | Accept a pending request |
| POST | `/friends/decline/{id}` | Decline a pending request |
| GET | `/friends` | List accepted friends |
| GET | `/friends/pending` | List incoming pending requests |
| DELETE | `/friends/{id}` | Remove a friend |

**Groups**

| Method | Path | Description |
|---|---|---|
| POST | `/groups` | Create a group |
| GET | `/groups/mine` | List groups the current user belongs to |
| GET | `/groups/search` | Search public groups by name or location |
| POST | `/groups/join-by-invite` | Join a private group via invite code |
| GET | `/groups/{id}` | Get group details |
| PUT | `/groups/{id}` | Update group settings (admin only) |
| DELETE | `/groups/{id}` | Delete a group (admin only) |
| POST | `/groups/{id}/join` | Join a public group |
| POST | `/groups/{id}/request` | Submit a join request for a private group |
| POST | `/groups/{id}/leave` | Leave a group |
| GET | `/groups/{id}/feed` | Group catch feed (paginated) |
| GET | `/groups/{id}/stats` | Group aggregate statistics |
| GET | `/groups/{id}/members` | List members with roles (paginated) |
| DELETE | `/groups/{id}/members/{userId}` | Remove a member (admin/moderator only) |
| POST | `/groups/{id}/members/{userId}/promote` | Promote to moderator (admin only) |
| POST | `/groups/{id}/members/{userId}/demote` | Demote to member (admin only) |
| GET | `/groups/{id}/requests` | List pending join requests (admin/moderator only) |
| POST | `/groups/{id}/requests/{reqId}/accept` | Accept a join request |
| POST | `/groups/{id}/requests/{reqId}/decline` | Decline a join request |
| POST | `/groups/{id}/invite-code` | Generate a new invite code (admin only) |

**Notifications**

| Method | Path | Description |
|---|---|---|
| GET | `/notifications` | Notification history |
| POST | `/notifications/{id}/read` | Mark one notification as read |
| POST | `/notifications/read-all` | Mark all notifications as read |
| GET | `/notifications/preferences` | Get notification preferences |
| PUT | `/notifications/preferences` | Update notification preferences |

**Saved Locations**

| Method | Path | Description |
|---|---|---|
| POST | `/locations` | Save a location with an alert radius |
| GET | `/locations` | List saved locations |
| PUT | `/locations/{id}/radius` | Update alert radius |
| DELETE | `/locations/{id}` | Remove a saved location |

**Wildlife News**

| Method | Path | Description |
|---|---|---|
| GET | `/news` | Paginated wildlife news and advisory feed |

### Partner (API key required — `X-Partner-Key` header)

| Method | Path | Description |
|---|---|---|
| GET | `/partner/stats` | Aggregate catch statistics (anonymized) |
| GET | `/partner/stocking-effectiveness` | Catch rates following stocking events |
| GET | `/partner/species-trends` | Long-term species catch rate trends |
| GET | `/partner/catch-rates` | Catch rates by region and effort |

---

## Environment Variables

Copy `.env.example` to `.env` and fill in values. Every variable is documented with a plain-English comment in that file.

| Variable | Required | Description |
|---|---|---|
| `DATABASE_URL` | Yes | PostgreSQL connection string |
| `JWT_SECRET` | Yes | Secret key for signing JWTs — keep private |
| `JWT_EXPIRY_DURATION` | No | How long access tokens last (default `24h`) |
| `WEATHER_API_KEY` | Yes | Weather data provider |
| `BAROMETRIC_PRESSURE_API_KEY` | No | Barometric pressure provider |
| `WATER_TEMP_API_KEY` | No | Water temperature provider |
| `SOLUNAR_API_KEY` | No | Solunar feeding period provider |
| `WILDLIFE_PARTNER_API_KEY` | No | Secret key for wildlife agency partner access |
| `PUSH_NOTIFICATION_SERVICE_KEY` | No | Firebase FCM or similar for push notifications |
| `AI_TRANSPORT` | No | `http` (default) or `grpc` |
| `AI_SERVICE_HTTP_URL` | No | Python service REST base URL (default `http://ai-service:8000`) |
| `AI_SERVICE_GRPC_URL` | No | Python service gRPC address (default `ai-service:50051`) |
| `RATE_LIMIT_RPS` | No | Requests per second per user or IP (default `10`) |
| `RATE_LIMIT_BURST` | No | Burst allowance above the per-second limit (default `20`) |
| `APP_ENV` | No | `development` or `production` |
| `SERVER_PORT` | No | HTTP port for the Go backend (default `8080`) |
| `VITE_API_BASE_URL` | No | Backend URL for the web frontend (default `http://localhost:8080`) |
| `EXPO_PUBLIC_API_BASE_URL` | No | Backend URL for the mobile app — must use the `EXPO_PUBLIC_` prefix |

---

## Running Locally

### Prerequisites

- Docker and Docker Compose
- Node.js 20+ (for the web and mobile frontends)
- An `.env` file at the project root — copy `.env.example` and fill in at minimum `DATABASE_URL`, `JWT_SECRET`, and `WEATHER_API_KEY`

### Start the backend services

```bash
cp .env.example .env
# Edit .env with your values

docker-compose up
```

This starts three containers:
- **Go backend** — `http://localhost:8080`
- **Python AI service REST** — `http://localhost:8000`
- **Python AI service gRPC** — `localhost:50051`
- **PostgreSQL** — `localhost:5432`

The Go backend runs database migrations automatically on startup.

### Run the web frontend

The web frontend is not containerized — it connects directly to the Go backend.

```bash
cd frontend-web
npm install
npm run dev
# → http://localhost:3000
```

### Run the mobile app

```bash
cd frontend-mobile
npm install
npx expo start
# Follow the Expo CLI prompts to open in a simulator or Expo Go on a physical device.
```

For a physical device on your local network, set `EXPO_PUBLIC_API_BASE_URL` in `.env` to your machine's local IP address rather than `localhost`:

```
EXPO_PUBLIC_API_BASE_URL=http://192.168.1.42:8080
```

### Switch to gRPC transport (optional)

To use the gRPC transport between the Go backend and the Python AI service instead of the default HTTP REST, set `AI_TRANSPORT=grpc` in your `.env` file and restart the backend container. No code changes are needed — the `AIClient` interface abstracts the transport completely.

---

## Background Jobs

Two APScheduler jobs run inside the Python AI service process. They start automatically when the service starts.

### Ingest Job

Runs every **6 hours**. Collects new wildlife events from all configured data sources and writes them to the database.

**Pipeline steps:**
1. Run all web scrapers (`wildlife_scraper.py`) — handles agencies that don't provide an API or feed
2. Parse all configured RSS/Atom feeds (`feed_parser.py`)
3. Download and parse any configured PDF documents (`pdf_parser.py`) — stocking reports, survey results
4. Normalize all raw results into `WildlifeEvent` shape (`normalizer.py`)
5. Save only events that are new — deduplication uses `source_url` as the unique key
6. Log a summary: sources scanned, events found, new events inserted

If a single agency's scraper throws an error, it is logged and the other sources continue — one broken scraper never stops the rest of the pipeline.

### Notification Job

Runs every **6 hours**, offset by **15 minutes** after the ingest job so the database is guaranteed to be up to date.

**Pipeline steps:**
1. Load all wildlife events ingested in the last 7 hours
2. For each event, use a haversine distance query to find users whose saved locations overlap the event's area
3. Filter those users against their per-type notification preferences
4. For each eligible user, create an in-app `Notification` record and send a push notification to their device via the configured push service (e.g. Firebase FCM)
5. If a user has no push token on file, the in-app record is still created — they'll see it in their notification history

**Example:** a stocking event for 2,000 walleye on Lake Erie → the job finds every user with a saved location within that event's radius → checks whether each one has `stocking_alerts` turned on → sends: *"Lake Erie just got stocked! 2,000 walleye were added, 3km from your saved spot."*

---

## Database Migrations

Migrations are plain SQL files in `backend/db/migrations/`, numbered sequentially. The Go backend runs them automatically at startup via `db.RunMigrations()` — there is no separate migration step.

| File | Creates |
|---|---|
| `001_create_users.sql` | `users` table — accounts, hashed passwords, push tokens, home location, favourite species |
| `002_create_catches.sql` | `catches` table — the central record of the app; indexes on `user_id`, `caught_at`, `species`, GPS columns |
| `003_create_friendships.sql` | `friendships` table — pending and accepted social connections |
| `004_create_wildlife_events.sql` | `wildlife_events` table — normalized ingest data from all agency sources |
| `005_create_notifications.sql` | `notifications` + `user_notification_preferences` tables |
| `006_create_locations.sql` | `saved_locations` table — bookmarked fishing spots with alert radii |
| `007_create_groups.sql` | `groups` table — community groups with privacy and invite code settings |
| `008_create_group_members.sql` | `group_members` table — active memberships with roles (composite PK on `group_id, user_id`) |
| `009_create_join_requests.sql` | `join_requests` table — pending requests to join private groups |
| `010_add_group_ids_to_catches.sql` | Associates catches with groups — choose between an array column on `catches` or a `catch_groups` junction table (see comments in the file for the tradeoff discussion) |

To add a new migration, create the next numbered file in `backend/db/migrations/` and restart the backend. The runner applies files in numeric order and skips any that have already been applied.

---

## Notifications

Users receive five types of notification, each independently toggleable in their preferences:

| Type | Trigger |
|---|---|
| `stocking_alert` | Fish were stocked near a saved location |
| `regulation_change` | Fishing rules changed near a saved location |
| `water_advisory` | Algae bloom, flooding, or pollution advisory near a saved location |
| `friend_catch` | A friend logged a catch visible to friends |
| `invasive_species` | An invasive species was detected near a saved location |

Every notification creates an in-app record (visible in the Notifications screen) before the push is sent. If the push fails or the device has no token, the in-app record still exists. The `related_event_id` field deep-links the notification to the relevant detail screen when tapped.

---

## Testing

The project is scaffolded but not yet implemented. When adding implementations, follow these conventions:

### Go backend

```bash
cd backend
go test ./...
```

- Unit tests live alongside the code they test as `_test.go` files
- Integration tests that need a real database should use a separate `_integration_test.go` file and guard with `//go:build integration`
- Run integration tests with `go test -tags integration ./...`
- Do not mock the database in integration tests — use a real PostgreSQL instance (a Docker container is fine)

### Python AI service

```bash
cd ai-service
pytest
```

- Tests live in `ai-service/tests/`
- Use `pytest` with `pytest-asyncio` for async FastAPI route tests
- Vision and prediction model tests should be in a separate `tests/models/` subdirectory and marked with `@pytest.mark.slow` if they require loading a real model

### TypeScript (shared types + web + mobile)

```bash
# Type-check only (no test runner needed for scaffolding)
cd frontend-shared && npx tsc --noEmit
cd frontend-web && npx tsc --noEmit
cd frontend-mobile && npx tsc --noEmit

# Unit tests (once implemented)
cd frontend-web && npm test
cd frontend-mobile && npm test
```

- Web and mobile tests use Vitest (web) and Jest (mobile)
- Test files live alongside the component or function they test as `*.test.tsx` or `*.test.ts`

---

## Deployment

The backend services (Go, Python, PostgreSQL) are containerized and production-ready to deploy with Docker Compose or a container orchestration system. The frontends are built as static assets and served separately.

### Key production changes before going live

**Rate limiter:** The default in-process rate limiter works for a single server but resets on restart and does not share state across multiple instances. Replace it with a Redis-backed limiter before running more than one backend replica. See `backend/middleware/ratelimit.go` for the note.

**Secrets:** Never commit `.env` to source control. In production, inject secrets via your platform's secret manager (AWS Secrets Manager, GCP Secret Manager, Kubernetes Secrets, etc.) rather than a `.env` file.

**Database:** Run migrations with care on a live database. The migration runner is append-only by design — never edit a migration file that has already been applied to production.

**TLS:** The Go backend and Python service both listen on plain HTTP inside the container network. Terminate TLS at the load balancer or reverse proxy (nginx, Caddy, AWS ALB), not inside the app.

**AI transport:** Consider enabling gRPC (`AI_TRANSPORT=grpc`) in production for lower latency and smaller payload size between the Go backend and Python AI service, particularly for the vision endpoint which handles binary photo data.

### Build the web frontend

```bash
cd frontend-web
npm install
npm run build
# Output is in frontend-web/dist/ — serve as static files
```

### Build the mobile app

```bash
cd frontend-mobile
npx expo build        # classic build (Expo managed)
# or
npx eas build         # EAS build (recommended for production)
```

Set `EXPO_PUBLIC_API_BASE_URL` to your production backend URL before building. This value is baked into the bundle at build time.

---

## Contributing

### Adding a new API endpoint

1. Add the route handler method to the relevant handler file in `backend/handlers/`
2. Register the route in `registerRoutes()` in `backend/main.go`
3. Add the corresponding API function to the relevant file in `frontend-shared/api/`
4. Add or update types in `frontend-shared/types/` if the request or response shape is new
5. Add the UI in `frontend-web/src/` and `frontend-mobile/`

### Extending the data model

1. Create a new migration file: `backend/db/migrations/NNN_description.sql`
2. Add or update the struct in `backend/models/`
3. Add or update the SQL query stubs in `backend/db/queries/`
4. Update the corresponding TypeScript interface in `frontend-shared/types/`
5. Restart the backend — migrations run automatically on startup

### Adding a new ingest data source

See [Wildlife Agency Onboarding](#wildlife-agency-onboarding) below.

### Code style

- **Go:** standard `gofmt` formatting; no third-party linters required, but `go vet` must pass
- **Python:** `black` for formatting, `ruff` for linting
- **TypeScript:** `prettier` for formatting; `eslint` with the project config
- Every public function must have a plain-English doc comment explaining what it does and why it exists — this is the established pattern throughout the scaffolding

---

## Wildlife Agency Onboarding

CastCreel ingests data from wildlife agencies via four mechanisms: REST APIs, RSS/Atom feeds, web scrapers, and PDF documents. Adding a new agency is a matter of plugging into the existing pipeline — no changes to the Go backend are needed.

### Step 1 — Choose an ingest method

| Agency publishes | Use |
|---|---|
| A documented REST API | Add a new async fetch function in `ai-service/ingest/env_fetcher.py` or a dedicated module |
| An RSS or Atom feed | Add the feed URL to the configuration loaded by `ai-service/ingest/feed_parser.py` |
| A web page with no feed | Add a scraping function in `ai-service/ingest/wildlife_scraper.py` and register it in `get_configured_agencies()` |
| PDF documents (stocking reports, surveys) | Add the PDF URL and document type to the configuration loaded by `ai-service/ingest/pdf_parser.py` |

### Step 2 — Normalize the raw data

After collecting raw data in whatever format the agency provides, pass it through `ai-service/ingest/normalizer.py`. The normalizer converts any raw shape into a `WildlifeEvent`-compatible dictionary with the fields the rest of the system expects:

```
type, title, description, source_agency, source_url,
latitude, longitude, radius_km, occurred_at,
water_body_name*, stocked_species*, stocked_count*   (* stocking events only)
```

If the agency's data doesn't include exact GPS coordinates, you'll need to geocode the water body name or region before normalizing.

### Step 3 — Verify deduplication

The ingest pipeline uses `source_url` as the unique key. Make sure every event your scraper or parser produces has a stable, unique `source_url` — if two runs of the scraper would produce the same URL for the same event, deduplication works automatically.

### Step 4 — Data quality impact

If the new source includes **stocking events**, they will automatically influence the data quality weighting system. Catches logged near a freshly stocked water body will receive reduced quality weights for 14 days after the event. No extra configuration is needed — the `stocking_recency_penalty()` function in `ai-service/prediction/weighting.py` picks this up from the `wildlife_events` table.

### Step 5 — Partner API access (optional)

If the agency is a two-way partner — sharing data with CastCreel in exchange for access to anonymized aggregate catch statistics — issue them a `WILDLIFE_PARTNER_API_KEY` and share the partner API documentation (the `/partner/*` endpoints). No code changes are required; the key is checked in the `RequirePartnerKey` middleware.
