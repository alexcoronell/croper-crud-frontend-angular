import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { User } from '@models/user.model';
import { UserStore } from '@store/user.store';

/**
 * Component that displays a list of users in a table format.
 * Provides functionality for pagination and user deletion through a confirmation modal.
 */
@Component({
  selector: 'app-user-list',
  imports: [RouterLink],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserList {
  /** Injected UserStore for state and data management. */
  readonly userStore = inject(UserStore);

  /** Signal controlling the visibility of the delete confirmation modal. */
  showDeleteModal = signal(false);
  /** Signal holding the specific user targeted for deletion. */
  userToDelete = signal<User | null>(null);
  /** Signal representing the ongoing deletion process state. */
  isDeleting = signal(false);

  /**
   * Opens the delete confirmation modal for a specific user.
   * @param user - The user object to be marked for deletion.
   */
  openDeleteModal(user: User): void {
    this.userToDelete.set(user);
    this.showDeleteModal.set(true);
  }

  /**
   * Closes the delete confirmation modal and resets selection state.
   */
  closeDeleteModal(): void {
    this.showDeleteModal.set(false);
    this.userToDelete.set(null);
  }

  /**
   * Confirms and executes the user deletion process.
   * Communicates with UserStore to remove the user from the backend.
   */
  async confirmDelete(): Promise<void> {
    const user = this.userToDelete();
    if (!user?._id) return;

    this.isDeleting.set(true);
    try {
      await this.userStore.deleteUser(user._id);
      this.closeDeleteModal();
    } catch (error) {
      console.error('Failed to delete user:', error);
    } finally {
      this.isDeleting.set(false);
    }
  }
}
