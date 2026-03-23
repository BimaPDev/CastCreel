/**
 * Notification-related types.
 * Matches the Go notification models in backend/models/notification.go.
 */

// The categories of alerts a user can receive.
export enum NotificationType {
  // Fish were stocked near one of the user's saved locations.
  StockingAlert = 'stocking_alert',
  // Fishing rules changed in an area the user fishes.
  RegulationChange = 'regulation_change',
  // Water quality warning near a saved location.
  WaterAdvisory = 'water_advisory',
  // A friend logged a new catch.
  FriendCatch = 'friend_catch',
  // An invasive species was spotted near a saved location.
  InvasiveSpecies = 'invasive_species',
}

// A single notification record from the server.
// These appear in the in-app notification inbox.
export interface Notification {
  id: number;
  user_id: number;
  type: NotificationType;
  title: string;
  body: string;
  // The ID of the wildlife event or catch that triggered this,
  // used for deep-linking to the right detail screen when tapped.
  related_event_id?: number;
  is_read: boolean;
  created_at: string; // ISO 8601
}

// The user's current notification toggle settings.
// Each boolean corresponds to a category the user can turn on or off
// from their settings screen.
export interface NotificationPreferences {
  stocking_alerts: boolean;
  regulation_changes: boolean;
  water_advisories: boolean;
  friend_catches: boolean;
  invasive_species: boolean;
}
