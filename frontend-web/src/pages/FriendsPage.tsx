/**
 * Friends page.
 * Lets the user manage their social connections: see their current friends,
 * respond to pending requests, and search for people by username to add them.
 * Removing a friend is also done here.
 */

import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { FriendSummary, PendingRequest } from '@castcreel/shared/types/friend';

// FriendsPage has three sections: accepted friends list, incoming pending requests,
// and a search bar to find new friends. Each section is independent so one loading
// error doesn't break the others.
export default function FriendsPage() {
  return null;
}
