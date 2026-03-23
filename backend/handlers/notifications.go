package handlers

import (
	"net/http"
)

// NotificationHandler manages the in-app notification system — both the
// preferences for what alerts a user wants to receive, and the history
// of notifications they've already been sent.
type NotificationHandler struct {
	db interface{} // will be *pgxpool.Pool once implemented
}

// NewNotificationHandler creates a new NotificationHandler ready to use.
func NewNotificationHandler(db interface{}) *NotificationHandler {
	return &NotificationHandler{db: db}
}

// GetNotificationPreferences returns the current user's notification settings —
// which alert types they've turned on or off. This is what the settings screen
// in the app reads when it loads.
func (h *NotificationHandler) GetNotificationPreferences(w http.ResponseWriter, r *http.Request) {
}

// UpdateNotificationPreferences saves changes to the user's notification settings.
// The user can individually toggle stocking alerts, regulation changes, water
// advisories, friend catches, and invasive species alerts on or off.
func (h *NotificationHandler) UpdateNotificationPreferences(w http.ResponseWriter, r *http.Request) {
}

// GetNotificationHistory returns the recent notifications sent to this user,
// newest first. Each entry shows the title, body, type, and whether the user
// has read it yet. This powers the notification inbox screen in the app.
func (h *NotificationHandler) GetNotificationHistory(w http.ResponseWriter, r *http.Request) {
}

// MarkNotificationRead marks a single notification as read when the user taps on it.
// Only the owner of the notification can mark it read — you can't mark someone
// else's notifications.
func (h *NotificationHandler) MarkNotificationRead(w http.ResponseWriter, r *http.Request) {
}

// MarkAllNotificationsRead marks every unread notification for the current user
// as read all at once. This is the "clear all" action in the notification inbox.
func (h *NotificationHandler) MarkAllNotificationsRead(w http.ResponseWriter, r *http.Request) {
}
