import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserStore } from '@store/user.store';
import { User } from '@models/user.model';

@Component({
  selector: 'app-user-list',
  imports: [RouterLink],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserList {
  readonly userStore = inject(UserStore);

  showDeleteModal = signal(false);
  userToDelete = signal<User | null>(null);
  isDeleting = signal(false);

  openDeleteModal(user: User) {
    this.userToDelete.set(user);
    this.showDeleteModal.set(true);
  }

  closeDeleteModal() {
    this.showDeleteModal.set(false);
    this.userToDelete.set(null);
  }

  async confirmDelete() {
    const user = this.userToDelete();
    if (!user?._id) return;

    this.isDeleting.set(true);
    try {
      await this.userStore.deleteUser(user._id);
      this.closeDeleteModal();
    } catch (error) {
      console.error('Error al eliminar:', error);
    } finally {
      this.isDeleting.set(false);
    }
  }
}
