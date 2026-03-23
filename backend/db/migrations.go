package db

import (
	"context"
	"fmt"
	"os"
	"path/filepath"
	"sort"

	"github.com/jackc/pgx/v5/pgxpool"
)

// RunMigrations finds all the numbered SQL files in the migrations folder
// and runs any that haven't been applied to the database yet.
// This means the database schema is always kept up to date automatically
// whenever the app starts, without anyone needing to run SQL by hand.
func RunMigrations(pool *pgxpool.Pool) error {
	return fmt.Errorf("not implemented")
}

// ensureMigrationsTable checks whether the special table that tracks which
// migrations have already run actually exists — if not, it creates it.
// This is the very first thing RunMigrations does before looking at any files.
func ensureMigrationsTable(ctx context.Context, pool *pgxpool.Pool) error {
	return fmt.Errorf("not implemented")
}

// getAppliedMigrations asks the database which migration files have already
// been run and returns their filenames as a set (a map used like a lookup table).
// This is how we know which ones to skip and which to apply.
func getAppliedMigrations(ctx context.Context, pool *pgxpool.Pool) (map[string]bool, error) {
	return nil, fmt.Errorf("not implemented")
}

// getMigrationFiles looks in the migrations/ subdirectory for .sql files,
// sorts them by filename (so 001_... always runs before 002_...), and returns
// the sorted list. Sorting by name ensures migrations always run in order.
func getMigrationFiles() ([]string, error) {
	return nil, fmt.Errorf("not implemented")
}

// runSingleMigration reads one SQL migration file from disk and executes it
// against the database inside a transaction. If anything goes wrong, the whole
// transaction is rolled back so the database is never left in a half-changed state.
// After success, it records the filename in the tracking table.
func runSingleMigration(ctx context.Context, pool *pgxpool.Pool, filePath string) error {
	return fmt.Errorf("not implemented")
}

// Keep the compiler happy — these are used by the unexported helpers above.
var (
	_ = os.ReadFile
	_ = filepath.Glob
	_ = sort.Strings
)
