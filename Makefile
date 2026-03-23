# CastCreel — top-level Makefile
#
# Usage:
#   make              → show this help
#   make up           → start all backend services (Go, Python, Postgres)
#   make dev          → start backend + web frontend dev server
#   make down         → stop all services
#   ...see targets below

.DEFAULT_GOAL := help

# ── Colours ──────────────────────────────────────────────────────────────────
CYAN  := \033[0;36m
RESET := \033[0m

# ─────────────────────────────────────────────────────────────────────────────
# HELP
# ─────────────────────────────────────────────────────────────────────────────

.PHONY: help
help:
	@echo ""
	@echo "  $(CYAN)CastCreel$(RESET)"
	@echo ""
	@echo "  $(CYAN)Docker / backend$(RESET)"
	@echo "    make up            Start backend services (Go + Python AI + Postgres)"
	@echo "    make down          Stop and remove containers"
	@echo "    make restart       down + up"
	@echo "    make logs          Tail logs from all services"
	@echo "    make logs-backend  Tail Go backend logs only"
	@echo "    make logs-ai       Tail Python AI service logs only"
	@echo "    make ps            Show running containers"
	@echo "    make build         Rebuild Docker images (no cache)"
	@echo ""
	@echo "  $(CYAN)Database$(RESET)"
	@echo "    make db            Open a psql shell inside the Postgres container"
	@echo "    make db-reset      Drop and recreate the database volume (destructive)"
	@echo ""
	@echo "  $(CYAN)Frontend$(RESET)"
	@echo "    make install       Install all JS/TS dependencies (bun workspaces)"
	@echo "    make dev           Start Vite web dev server (backend must be running)"
	@echo "    make mobile        Start Expo mobile dev server"
	@echo "    make web-build     Build web frontend for production (outputs dist/)"
	@echo ""
	@echo "  $(CYAN)Go backend$(RESET)"
	@echo "    make go-run        Run Go backend locally (no Docker)"
	@echo "    make go-build      Compile Go binary"
	@echo "    make go-test       Run Go unit tests"
	@echo "    make go-test-all   Run Go unit + integration tests"
	@echo "    make go-vet        Run go vet"
	@echo "    make go-fmt        Run gofmt on all Go files"
	@echo ""
	@echo "  $(CYAN)Python AI service$(RESET)"
	@echo "    make py-install    Install Python dependencies into a virtualenv"
	@echo "    make py-run        Run Python AI service locally (no Docker)"
	@echo "    make py-test       Run pytest"
	@echo "    make py-fmt        Run black formatter"
	@echo "    make py-lint       Run ruff linter"
	@echo "    make proto         Compile .proto files to Go + Python stubs"
	@echo ""
	@echo "  $(CYAN)Checks$(RESET)"
	@echo "    make typecheck     Run tsc --noEmit on all three TS packages"
	@echo "    make check         go vet + py lint + typecheck (pre-commit safety net)"
	@echo "    make env           Copy .env.example → .env (only if .env missing)"
	@echo ""

# ─────────────────────────────────────────────────────────────────────────────
# ENVIRONMENT
# ─────────────────────────────────────────────────────────────────────────────

.PHONY: env
env:
	@if [ ! -f .env ]; then \
		cp .env.example .env; \
		echo "  .env created — fill in your API keys before running"; \
	else \
		echo "  .env already exists — skipping"; \
	fi

# ─────────────────────────────────────────────────────────────────────────────
# DOCKER / BACKEND SERVICES
# ─────────────────────────────────────────────────────────────────────────────

.PHONY: up
up:
	docker compose up -d

.PHONY: down
down:
	docker compose down

.PHONY: restart
restart: down up

.PHONY: build
build:
	docker compose build --no-cache

.PHONY: logs
logs:
	docker compose logs -f

.PHONY: logs-backend
logs-backend:
	docker compose logs -f backend

.PHONY: logs-ai
logs-ai:
	docker compose logs -f ai-service

.PHONY: ps
ps:
	docker compose ps

# ─────────────────────────────────────────────────────────────────────────────
# DATABASE
# ─────────────────────────────────────────────────────────────────────────────

.PHONY: db
db:
	docker compose exec postgres psql -U $${POSTGRES_USER:-castcreel} -d castcreel

.PHONY: db-reset
db-reset:
	@echo "  WARNING: this will delete all local data. Ctrl-C to cancel."
	@sleep 3
	docker compose down -v
	docker compose up -d postgres

# ─────────────────────────────────────────────────────────────────────────────
# FRONTEND
# ─────────────────────────────────────────────────────────────────────────────

.PHONY: install
install:
	bun install

.PHONY: dev
dev:
	cd frontend-web && bun run dev

.PHONY: mobile
mobile:
	cd frontend-mobile && bunx expo start

.PHONY: web-build
web-build:
	cd frontend-web && bun run build

# ─────────────────────────────────────────────────────────────────────────────
# GO BACKEND
# ─────────────────────────────────────────────────────────────────────────────

.PHONY: go-run
go-run:
	cd backend && go run .

.PHONY: go-build
go-build:
	cd backend && go build -o ../bin/castcreel-backend ./...

.PHONY: go-test
go-test:
	cd backend && go test ./...

.PHONY: go-test-all
go-test-all:
	cd backend && go test -tags integration ./...

.PHONY: go-vet
go-vet:
	cd backend && go vet ./...

.PHONY: go-fmt
go-fmt:
	gofmt -w backend/

# ─────────────────────────────────────────────────────────────────────────────
# PYTHON AI SERVICE
# ─────────────────────────────────────────────────────────────────────────────

VENV := ai-service/.venv
PYTHON := $(VENV)/bin/python
PIP := $(VENV)/bin/pip

.PHONY: py-install
py-install:
	python3 -m venv $(VENV)
	$(PIP) install --upgrade pip
	$(PIP) install -r ai-service/requirements.txt

.PHONY: py-run
py-run:
	cd ai-service && $(abspath $(PYTHON)) main.py

.PHONY: py-test
py-test:
	cd ai-service && $(abspath $(VENV)/bin/pytest) tests/

.PHONY: py-fmt
py-fmt:
	$(VENV)/bin/black ai-service/

.PHONY: py-lint
py-lint:
	$(VENV)/bin/ruff check ai-service/

# ─────────────────────────────────────────────────────────────────────────────
# PROTOBUF
# ─────────────────────────────────────────────────────────────────────────────

# Compiles all .proto files in proto/ into:
#   Go stubs  → backend/pb/
#   Python stubs → ai-service/pb/
.PHONY: proto
proto:
	@mkdir -p backend/pb ai-service/pb
	protoc \
		--go_out=backend/pb --go_opt=paths=source_relative \
		--go-grpc_out=backend/pb --go-grpc_opt=paths=source_relative \
		--python_out=ai-service/pb \
		--grpc_python_out=ai-service/pb \
		-I proto \
		proto/*.proto

# ─────────────────────────────────────────────────────────────────────────────
# TYPE-CHECKING
# ─────────────────────────────────────────────────────────────────────────────

.PHONY: typecheck
typecheck:
	cd frontend-shared && bunx tsc --noEmit
	cd frontend-web && bunx tsc --noEmit
	cd frontend-mobile && bunx tsc --noEmit

# ─────────────────────────────────────────────────────────────────────────────
# COMBINED CHECKS
# ─────────────────────────────────────────────────────────────────────────────

# Quick sanity check before committing — runs everything that doesn't need
# a database or running services.
.PHONY: check
check: go-vet py-lint typecheck
	@echo ""
	@echo "  All checks passed."
