// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import type { Auth } from '@svelte-dev/auth';
import type { SessionStorage } from '@svelte-dev/session';

declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      lang: string;
      auth: Auth<unknown>;
      session: SessionStorage<{ user: Record<string, unknown> }>;
      user?: Record<string, unknown>;
    }
    // interface PageData {}
    // interface PageState {}
    interface Platform {
      env?: {
        DB: D1Database;
      };
      context: {
        waitUntil(promise: Promise<any>): void;
      };
      caches: CacheStorage & { default: Cache };
    }
  }
}

export {};
