# Build context must be the repo root so bun can resolve the workspace.
# In docker-compose: build: { context: ., dockerfile: frontend-web/Dockerfile }

FROM oven/bun:1-alpine

WORKDIR /app

# Copy workspace manifests so bun install can resolve the workspace links.
# Source files are NOT copied here — they are volume-mounted at runtime
# so changes on the host are reflected instantly (hot reload).
COPY package.json ./
COPY frontend-shared/package.json ./frontend-shared/
COPY frontend-web/package.json ./frontend-web/
COPY frontend-mobile/package.json ./frontend-mobile/

WORKDIR /app/frontend-web

EXPOSE 3000

# bun install runs at startup (not at build time) so it runs after the
# source volume mounts are applied and workspace symlinks resolve correctly.
CMD ["sh", "-c", "cd /app && bun install && cd /app/frontend-web && bun run dev --host"]
