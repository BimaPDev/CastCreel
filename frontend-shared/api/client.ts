/**
 * Base API client.
 *
 * This is the single place where HTTP requests to the Go backend are made.
 * Both the web and mobile frontends create an instance of this class and
 * pass it to every API function. It handles attaching the JWT to every
 * request, refreshing tokens when they expire, and throwing typed errors
 * when the server responds with a non-2xx status.
 */

// The shape of an error response from the Go backend.
export interface ApiError {
  message: string;
  status: number;
}

// Thrown when the server returns an error response.
export class ApiRequestError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    this.name = 'ApiRequestError';
  }
}

export class ApiClient {
  private baseURL: string;
  private token: string | null = null;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  // Stores the JWT access token so it can be attached to future requests.
  // Called after a successful login or token refresh.
  setToken(token: string): void {}

  // Removes the stored token, effectively logging the user out on the client side.
  clearToken(): void {}

  // Returns the currently stored token, or null if no one is logged in.
  getToken(): string | null {
    return this.token;
  }

  // The core request method used by every API function.
  // Handles building the URL, setting headers (including Authorization),
  // serializing the body, parsing the response JSON, and throwing an
  // ApiRequestError if the server signals failure.
  async request<T>(
    method: string,
    path: string,
    body?: unknown,
    options?: RequestInit,
  ): Promise<T> {
    return undefined as unknown as T;
  }

  // Convenience wrapper for GET requests.
  async get<T>(path: string, options?: RequestInit): Promise<T> {
    return this.request<T>('GET', path, undefined, options);
  }

  // Convenience wrapper for POST requests.
  async post<T>(path: string, body?: unknown): Promise<T> {
    return this.request<T>('POST', path, body);
  }

  // Convenience wrapper for PUT requests.
  async put<T>(path: string, body?: unknown): Promise<T> {
    return this.request<T>('PUT', path, body);
  }

  // Convenience wrapper for DELETE requests.
  async delete<T>(path: string): Promise<T> {
    return this.request<T>('DELETE', path);
  }

  // Sends a multipart form-data POST — used when uploading photos.
  // The photo file is sent alongside any other form fields.
  async upload<T>(path: string, formData: FormData): Promise<T> {
    return undefined as unknown as T;
  }
}

// Creates a singleton ApiClient configured from environment variables.
// Both frontends call this once at startup and then use the returned instance everywhere.
export function createApiClient(): ApiClient {
  return new ApiClient('');
}
