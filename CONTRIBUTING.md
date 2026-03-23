# Contributing to CastCreel

> TODO: Expand each section below as the project matures.
> For now this file provides the skeleton and the verification checklist.

---

## Local Setup

> TODO: Write step-by-step local setup instructions once Dockerfiles exist.
> Will cover: cloning the repo, installing prerequisites (Go 1.22+, Python 3.12+,
> Docker), copying .env.example to .env, running docker-compose up.

**Quick reference (placeholder):**

```bash
# Go backend
cd backend
go mod download
go build ./...

# Python AI service
cd ai-service
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt

# Full stack
docker-compose up
```

---

## Code Style

**Go:**
- Run `gofmt` before committing — all Go code must be formatted.
- Follow standard Go naming conventions (exported names are PascalCase, unexported are camelCase).
- Errors are returned, not panicked on, except in `main()`.
- No magic strings — use typed constants (see `models/catch.go` for examples).

**Python:**
- Code is formatted with `black` (line length 100).
- Type hints on all function signatures — see existing files for style.
- Comments are plain English, written for a non-programmer audience.
- Module-level docstrings explain what the module does and why it exists.

> TODO: Add linting configuration (golangci-lint for Go, ruff/mypy for Python).

---

## Verification Steps

After making changes, run these checks before opening a pull request:

### Go backend

```bash
cd backend

# Must compile with no errors
go build ./...

# Must pass all tests (once tests exist)
go test ./...

# Must be formatted
gofmt -l .
# (no output = all files are formatted)
```

### Python AI service

```bash
cd ai-service

# Syntax check on every file
python -m py_compile main.py
python -m py_compile vision/fish_detector.py
python -m py_compile vision/size_estimator.py
python -m py_compile prediction/condition_model.py
python -m py_compile prediction/personal_model.py
python -m py_compile prediction/weighting.py
python -m py_compile ingest/env_fetcher.py
python -m py_compile ingest/wildlife_scraper.py
python -m py_compile ingest/feed_parser.py
python -m py_compile ingest/pdf_parser.py
python -m py_compile ingest/normalizer.py
python -m py_compile ingest/anonymizer.py
python -m py_compile jobs/ingest_job.py
python -m py_compile jobs/notification_job.py
```

### Full stack

```bash
# Bring everything up and check the health endpoint
docker-compose up -d
curl http://localhost:8080/health   # Go backend
curl http://localhost:8000/health   # Python AI service
```

> TODO: Add end-to-end test section once tests are written.
> TODO: Add database migration check (go run ./backend validate-migrations or similar).

---

## Data Privacy Rules

These rules are non-negotiable. Any change that could affect them needs
explicit review before merging:

1. **Anonymization happens in `ai-service/ingest/anonymizer.py` only.** No other
   code path should prepare data for wildlife partners or the community model.

2. **GPS coordinates snap to 1km grid before leaving the system.** The constant
   `GRID_SIZE_DEGREES` in anonymizer.py controls this. Do not reduce it.

3. **Wildlife partner endpoints return no user IDs, emails, or usernames.**
   Check `backend/handlers/wildlife_partner.go` response shapes if in doubt.

4. **Public map catches use fuzzed (not exact) coordinates.** See `fuzzLocation()`
   in `backend/handlers/catches.go`.

---

> TODO: Add sections for: filing issues, pull request checklist, release process,
> and contact information for the core team.
