// frontend/lib/imageUrl.ts

// Sirf base uploads URL
const UPLOADS_BASE_URL = process.env.NEXT_PUBLIC_STORAGE_URL || 'http://127.0.0.1:8000/uploads';

/**
 * Returns the base uploads URL only.
 * Components are responsible for appending folder (users/admins) and filename.
 */
export function getUploadsBaseUrl(): string {
  return UPLOADS_BASE_URL;
}

// Helper check for local URLs
export function isLocalImage(url: string): boolean {
  return /^https?:\/\/(127\.0\.0\.1|localhost)(:\d+)?\//.test(url);
}