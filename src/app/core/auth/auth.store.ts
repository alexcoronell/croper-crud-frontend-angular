import { isPlatformBrowser } from '@angular/common';
import { computed, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { Router } from '@angular/router';

import { UserRole } from '@enums/user-role';
import { User } from '@models/user.model';
import { AuthService } from './auth.service';

/**
 * Centrally manages authentication state, user sessions, and authorization roles.
 * Persists user data to localStorage for session continuity across refreshes.
 */
@Injectable({ providedIn: 'root' })
export class AuthStore {
  /** Injected AuthService for background API communication. */
  private readonly authService = inject(AuthService);
  /** Injected angular Router for handling navigation. */
  private readonly router = inject(Router);
  /** Injected PLATFORM_ID to ensure safe execution in SSR environments. */
  private readonly platformId = inject(PLATFORM_ID);

  /** Private signal holding the current authenticated user object. */
  private _user = signal<User | null>(null);
  /** Private signal representing the global authentication loading state. */
  private _loading = signal<boolean>(false);

  /** Read-only signal exposing the current user. */
  readonly user = this._user.asReadonly();
  /** Read-only signal exposing the loading state. */
  readonly loading = this._loading.asReadonly();

  /** Computed signal indicating if a user is currently logged in. */
  readonly isAuthenticated = computed(() => !!this._user());
  /** Computed signal verifying if the current user has administrative privileges. */
  readonly isAdmin = computed(() => this._user()?.role === UserRole.ADMIN);

  constructor() {
    this.initializeFromStorage();
  }

  /**
   * Loads persisted user session from localStorage during initialization.
   * Runs only in the browser context and handles data corruption.
   */
  private initializeFromStorage(): void {
    if (isPlatformBrowser(this.platformId)) {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          this._user.set(JSON.parse(storedUser));
        } catch {
          localStorage.removeItem('user');
        }
      }
    }
  }

  /**
   * Sets a new user object in the store and updates local persistence.
   * @param user - The user model to persist, or null to clear.
   */
  setUser(user: User | null): void {
    this._user.set(user);
    if (isPlatformBrowser(this.platformId)) {
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        localStorage.removeItem('user');
      }
    }
  }

  /**
   * Updates the global loading indicator state.
   * @param isLoading - The status to set for the loading signal.
   */
  setLoading(isLoading: boolean): void {
    this._loading.set(isLoading);
  }

  /**
   * Merges partial updates into the current user state and updates persistence.
   * @param partialUser - Fragment of user data to update.
   */
  updateUser(partialUser: Partial<User>): void {
    this._user.update((current) => {
      const updated = current ? { ...current, ...partialUser } : null;
      if (isPlatformBrowser(this.platformId)) {
        if (updated) {
          localStorage.setItem('user', JSON.stringify(updated));
        } else {
          localStorage.removeItem('user');
        }
      }
      return updated;
    });
  }

  /**
   * Resets the authentication state, clears session storage, and redirects to login.
   * Intended for internal use after logout confirmation.
   */
  private finalizeLogout(): void {
    this._user.set(null);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
    this._loading.set(false);
    void this.router.navigate(['/ingreso']);
  }

  /**
   * Initiates the logout process through the AuthService.
   * Cleans up local state regardless of server-side success.
   */
  logout(): void {
    this._loading.set(true);
    this.authService.logout().subscribe({
      next: () => this.finalizeLogout(),
      error: () => this.finalizeLogout(),
    });
  }
}
