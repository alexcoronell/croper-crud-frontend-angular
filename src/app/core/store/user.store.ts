import { computed, inject, Injectable, signal } from '@angular/core';

import { User } from '@models/user.model';
import { UserService } from '../services/user.service';

/**
 * Store for managing user-related state and operations.
 * Handles user list pagination, creation, updates, and deletions.
 */
@Injectable({
  providedIn: 'root',
})
export class UserStore {
  /** Injected UserService for API communication. */
  private userService = inject(UserService);

  /** Current page index for the user list pagination. */
  readonly page = signal(1);
  /** Maximum number of user items per page. */
  readonly limit = signal(10);
  /** ID of the user currently selected for editing. */
  readonly currentUserId = signal<string | null>(null);
  /** Global loading state for user operations. */
  readonly loading = signal(false);

  /**
   * Resource managing the remote fetching of the user list.
   * Reactive to page and limit signals.
   */
  readonly resource = this.userService.getAll(() => ({
    page: this.page(),
    limit: this.limit(),
  }));

  /** Computed list of users retrieved from the resource. */
  readonly users = computed(() => this.resource.value()?.data ?? []);
  /** Computed total number of users available across all pages. */
  readonly totalItems = computed(() => this.resource.value()?.total ?? 0);
  /** Computed total number of pages based on totalItems and limit. */
  readonly totalPages = computed(() => {
    const total = this.totalItems();
    return total > 0 ? Math.ceil(total / this.limit()) : 1;
  });

  /**
   * Updates the global loading state.
   * @param value - The loading state to set.
   */
  setLoading(value: boolean) {
    this.loading.set(value);
  }

  /**
   * Advances pagination to the next page if available.
   */
  nextPage(): void {
    if (this.page() < this.totalPages()) {
      this.page.update((p) => p + 1);
    }
  }

  /**
   * Moves pagination back to the previous page if available.
   */
  prevPage(): void {
    if (this.page() > 1) {
      this.page.update((p) => p - 1);
    }
  }

  /**
   * Triggers a manual refresh of the user list.
   */
  reloadUsers(): void {
    this.resource.reload();
  }

  /**
   * Persists a user (either create or update) to the backend.
   * @param userData - The user data to save.
   * @returns A promise that resolves on successful save.
   */
  async saveUser(userData: Partial<User>): Promise<void> {
    const id = this.currentUserId();
    const request$ = id ? this.userService.update(id, userData) : this.userService.create(userData);

    return new Promise((resolve, reject) => {
      request$.subscribe({
        next: () => {
          this.resource.reload();
          this.currentUserId.set(null);
          resolve();
        },
        error: () => {
          reject(new Error('Failed to save user information'));
        },
      });
    });
  }

  /**
   * Removes a user from the system.
   * @param id - The ID of the user to delete.
   * @returns A promise that resolves on successful deletion.
   */
  async deleteUser(id: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.userService.delete(id).subscribe({
        next: () => {
          this.resource.reload();
          resolve();
        },
        error: () => {
          reject(new Error('Failed to delete user'));
        },
      });
    });
  }
}
