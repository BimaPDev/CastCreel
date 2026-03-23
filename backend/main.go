package main

import (
	"context"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/go-chi/chi/v5"
	chimiddleware "github.com/go-chi/chi/v5/middleware"

	"castcreel/backend/clients"
	"castcreel/backend/config"
	"castcreel/backend/db"
	"castcreel/backend/handlers"
	authmw "castcreel/backend/middleware"
)

// main is the starting point for the entire application.
// It loads settings from environment variables, connects to the database,
// picks the right way to talk to the Python AI service, builds the HTTP router,
// and starts listening for requests. It also handles graceful shutdown so that
// in-progress requests can finish before the server stops.
func main() {
	cfg := config.Load()

	database, err := db.Connect(cfg)
	if err != nil {
		log.Fatalf("could not connect to database: %v", err)
	}
	defer db.Close(database)

	if err := db.RunMigrations(database); err != nil {
		log.Fatalf("migrations failed: %v", err)
	}

	aiClient, err := clients.NewAIClient(cfg)
	if err != nil {
		log.Fatalf("could not create AI client: %v", err)
	}

	r := setupRouter(cfg)
	registerRoutes(r, database, cfg, aiClient)

	srv := &http.Server{
		Addr:    ":" + cfg.ServerPort,
		Handler: r,
	}

	// Start the server in the background so we can listen for shutdown signals.
	go func() {
		log.Printf("server starting on port %s", cfg.ServerPort)
		if err := srv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			log.Fatalf("server error: %v", err)
		}
	}()

	// Wait for Ctrl+C or a termination signal before shutting down.
	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	<-quit

	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()

	if err := srv.Shutdown(ctx); err != nil {
		log.Fatalf("forced shutdown: %v", err)
	}
	log.Println("server stopped cleanly")
}

// setupRouter creates the HTTP router and attaches middleware that should run
// on every single request — things like request logging, panic recovery,
// and request ID headers so we can trace a request through the logs.
func setupRouter(cfg *config.Config) *chi.Mux {
	r := chi.NewRouter()

	r.Use(chimiddleware.RequestID)
	r.Use(chimiddleware.RealIP)
	r.Use(chimiddleware.Logger)
	r.Use(chimiddleware.Recoverer)
	r.Use(authmw.RateLimiter(cfg))

	return r
}

// registerRoutes maps every URL path to the handler function that should deal
// with it. This is the single place where you can see the entire shape of the
// API at a glance. Routes are grouped so that the auth middleware is only
// applied to protected paths, not to public ones like login or signup.
func registerRoutes(r *chi.Mux, database interface{}, cfg *config.Config, aiClient clients.AIClient) {
	authH := handlers.NewAuthHandler(database, cfg)
	catchH := handlers.NewCatchHandler(database, aiClient)
	predH := handlers.NewPredictionHandler(database, aiClient)
	newsH := handlers.NewNewsHandler(database)
	friendH := handlers.NewFriendHandler(database)
	partnerH := handlers.NewWildlifePartnerHandler(database)
	notifH := handlers.NewNotificationHandler(database)
	locH := handlers.NewLocationHandler(database)

	// Public routes — no login required.
	r.Post("/auth/register", authH.Register)
	r.Post("/auth/login", authH.Login)
	r.Post("/auth/refresh", authH.RefreshToken)

	// Public map endpoint — shows fuzzed catch locations to everyone.
	r.Get("/map/catches", catchH.GetPublicMapCatches)

	// Protected routes — user must be logged in.
	r.Group(func(r chi.Router) {
		r.Use(authmw.RequireAuth(cfg))

		r.Post("/auth/logout", authH.Logout)

		r.Post("/catches", catchH.CreateCatch)
		r.Get("/catches/{id}", catchH.GetCatch)
		r.Get("/catches", catchH.ListUserCatches)
		r.Put("/catches/{id}", catchH.UpdateCatch)
		r.Delete("/catches/{id}", catchH.DeleteCatch)

		r.Get("/predictions", predH.GetPrediction)

		r.Get("/news", newsH.GetWildlifeNews)

		r.Post("/friends/request", friendH.SendFriendRequest)
		r.Post("/friends/accept/{id}", friendH.AcceptFriendRequest)
		r.Post("/friends/decline/{id}", friendH.DeclineFriendRequest)
		r.Get("/friends", friendH.ListFriends)
		r.Delete("/friends/{id}", friendH.RemoveFriend)

		r.Get("/notifications/preferences", notifH.GetNotificationPreferences)
		r.Put("/notifications/preferences", notifH.UpdateNotificationPreferences)
		r.Get("/notifications", notifH.GetNotificationHistory)
		r.Post("/notifications/{id}/read", notifH.MarkNotificationRead)
		r.Post("/notifications/read-all", notifH.MarkAllNotificationsRead)

		r.Post("/locations", locH.SaveLocation)
		r.Get("/locations", locH.GetUserLocations)
		r.Delete("/locations/{id}", locH.DeleteLocation)
		r.Put("/locations/{id}/radius", locH.UpdateLocationRadius)
	})

	// Wildlife partner API — read-only, requires a partner API key.
	r.Group(func(r chi.Router) {
		r.Use(authmw.RequirePartnerKey(cfg))

		r.Get("/partner/stats", partnerH.GetAggregateStats)
		r.Get("/partner/stocking-effectiveness", partnerH.GetStockingEffectiveness)
		r.Get("/partner/species-trends", partnerH.GetSpeciesTrends)
		r.Get("/partner/catch-rates", partnerH.GetCatchRates)
	})
}
