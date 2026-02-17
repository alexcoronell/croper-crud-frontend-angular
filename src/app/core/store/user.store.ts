import { computed, inject, Injectable, signal } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '@models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserStore {
  private userService = inject(UserService);

  readonly page = signal(1);
  readonly limit = signal(10);
  readonly currentUserId = signal<string | null>(null);
  readonly loading = signal(false);

  setLoading(value: boolean) {
    this.loading.set(value);
  }

  readonly resource = this.userService.getAll(() => ({
    page: this.page(),
    limit: this.limit(),
  }));
  readonly users = computed(() => this.resource.value()?.data ?? []);
  readonly totalItems = computed(() => this.resource.value()?.total ?? 0);
  readonly totalPages = computed(() => {
    const total = this.totalItems();
    return total > 0 ? Math.ceil(total / this.limit()) : 1;
  });

  nextPage(): void {
    if (this.page() < this.totalPages()) {
      this.page.update((p) => p + 1);
    }
  }

  prevPage(): void {
    if (this.page() > 1) {
      this.page.update((p) => p - 1);
    }
  }
  reloadUsers(): void {
    this.resource.reload();
  }

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
          reject(new Error('No se pudo guardar el usuario'));
        },
      });
    });
  }

  async deleteUser(id: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.userService.delete(id).subscribe({
        next: () => {
          this.resource.reload();
          resolve();
        },
        error: () => {
          reject(new Error('No se pudo eliminar el usuario'));
        },
      });
    });
  }
}
