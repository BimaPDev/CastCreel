# ── Stage 1: build ───────────────────────────────────────────────────────────
FROM golang:1.22-alpine AS builder

# gcc and musl-dev are needed for cgo (pgx uses it for some optional features).
RUN apk add --no-cache git gcc musl-dev

WORKDIR /app

# Copy dependency files first so Docker can cache the module download layer.
# Re-downloading only happens when go.mod or go.sum actually changes.
COPY go.mod go.sum ./
RUN go mod download

# Copy the rest of the source and build a statically linked binary.
COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -o castcreel-backend .

# ── Stage 2: run ─────────────────────────────────────────────────────────────
FROM alpine:3.20

# ca-certificates is needed for outbound HTTPS calls (external API clients).
RUN apk add --no-cache ca-certificates tzdata

WORKDIR /app

COPY --from=builder /app/castcreel-backend .
COPY --from=builder /app/db/migrations ./db/migrations

EXPOSE 8080

CMD ["./castcreel-backend"]
