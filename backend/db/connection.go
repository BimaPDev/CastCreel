package db

import (
	"context"
	"fmt"

	"github.com/jackc/pgx/v5/pgxpool"

	"castcreel/backend/config"
)

// Connect opens a pool of database connections using the URL from config.
// A connection pool means the app keeps several connections open and ready
// rather than opening a new one for every single request — much faster.
// Returns the pool so the rest of the app can borrow connections from it.
func Connect(cfg *config.Config) (*pgxpool.Pool, error) {
	return nil, fmt.Errorf("not implemented")
}

// Close shuts down all the connections in the pool cleanly.
// This is called when the server is shutting down so we don't leave
// abandoned connections sitting on the database.
func Close(pool *pgxpool.Pool) {
}

// GetDB returns the active connection pool. This is a convenience function
// for parts of the app that need to run a query but don't want to pass
// the pool through every function call by hand.
func GetDB(pool *pgxpool.Pool) *pgxpool.Pool {
	return nil
}

// ping checks that we can actually talk to the database after connecting.
// Just sends a simple message and waits for a response — if this fails,
// something is wrong with the connection string or the database itself.
func ping(ctx context.Context, pool *pgxpool.Pool) error {
	return fmt.Errorf("not implemented")
}
