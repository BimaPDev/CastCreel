package db

import (
	"context"
	"fmt"
	"os"
	"path/filepath"
	"sort"
	"strings"

	"github.com/jackc/pgx/v5/pgxpool"
)

// RunMigrations finds all the numbered SQL files in the migrations folder
// and runs any that haven't been applied to the database yet.
// This means the database schema is always kept up to date automatically
// whenever the app starts, without anyone needing to run SQL by hand.
func RunMigrations(pool *pgxpool.Pool) error {
	ctx := context.Background()

	if err := ensureMigrationsTable(ctx, pool); err != nil {
		return err
	}

	applied, err := getAppliedMigrations(ctx, pool)
	if err != nil {
		return err
	}

	files, err := getMigrationFiles()
	if err != nil {
		return err
	}

	for _, file := range files {
		if !applied[file] {
			if err := runSingleMigration(ctx, pool, file); err != nil {
				return fmt.Errorf("running migration %s: %w", file, err)
			}
		}
	}

	return nil
}

// ensureMigrationsTable checks whether the special table that tracks which
// migrations have already run actually exists — if not, it creates it.
// This is the very first thing RunMigrations does before looking at any files.
func ensureMigrationsTable(ctx context.Context, pool *pgxpool.Pool) error {
	query := `CREATE TABLE IF NOT EXISTS migrations (
    name TEXT PRIMARY KEY
	);`
	_, err := pool.Exec(ctx, query)
	if err != nil {
		return fmt.Errorf("Migration Dont exist: %w", err)
	}
	return nil
}

// getAppliedMigrations asks the database which migration files have already
// been run and returns their filenames as a set (a map used like a lookup table).
// This is how we know which ones to skip and which to apply.
func getAppliedMigrations(ctx context.Context, pool *pgxpool.Pool) (map[string]bool, error) {
	rows, err := pool.Query(ctx, "SELECT name FROM migrations")
	if err != nil {
		return nil, fmt.Errorf("querying migrations: %w", err)
	}
	defer rows.Close()

	applied := make(map[string]bool)
	for rows.Next()	{
		var name string
		if err := rows.Scan(&name); err != nil {
			return nil, fmt.Errorf("scanning migration row: %w", err)
		}
		applied[name] = true
	}
	if err := rows.Err(); err != nil {
		return nil, fmt.Errorf("iterating migration rows: %w", err)
	}

	return applied, nil
}

// getMigrationFiles looks in the migrations/ subdirectory for .sql files,
// sorts them by filename (so 001_... always runs before 002_...), and returns
// the sorted list. Sorting by name ensures migrations always run in order.
func getMigrationFiles() ([]string, error) {
	//return nil, fmt.Errorf("not implemented")
	dir, err := os.ReadDir("db/migrations")
	if err != nil {
		return nil, fmt.Errorf("reading migrations dir: %w", err)
	}
	files := []string{}
	for _, entry := range dir {
		if strings.HasSuffix(entry.Name(), ".sql") {
			files = append(files, entry.Name())
		}
	}
	sort.Strings(files)
	return files,nil
}

// runSingleMigration reads one SQL migration file from disk and executes it
// against the database inside a transaction. If anything goes wrong, the whole
// transaction is rolled back so the database is never left in a half-changed state.
// After success, it records the filename in the tracking table.
func runSingleMigration(ctx context.Context, pool *pgxpool.Pool, filePath string) error {
	data, err := os.ReadFile(filePath)
	if err != nil {
		return fmt.Errorf("reading migration file: %w", err)
	}
	sqlContent := string(data)

	tx, err := pool.Begin(ctx)
	if err != nil {
		return fmt.Errorf("beginning transaction: %w", err)
	}
	defer tx.Rollback(ctx)

	if _, err := tx.Exec(ctx, sqlContent); err != nil {
		return fmt.Errorf("executing migration: %w", err)
	}

	if _, err := tx.Exec(ctx, "INSERT INTO migrations(name) VALUES($1)", filePath); err != nil {
		return fmt.Errorf("recording migration: %w", err)
	}

	return tx.Commit(ctx)
}

// Keep the compiler happy — these are used by the unexported helpers above.
var (
	_ = os.ReadFile
	_ = filepath.Glob
	_ = sort.Strings
)
