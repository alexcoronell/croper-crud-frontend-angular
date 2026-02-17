import { computed, Injectable, signal } from '@angular/core';
import { UserRole } from '@enums/user-role';
import { User } from '@models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthStore {
  // Private State
  private _user = signal<User | null>(null);
  private _loading = signal<boolean>(false);

  // Selectors (Readonly)
  readonly user = this._user.asReadonly();
  readonly loading = this._loading.asReadonly();

  // Computed
  readonly isAuthenticated = computed(() => !!this._user());
  readonly isAdmin = computed(() => this._user()?.role === UserRole.ADMIN);

  // Actions
  setUser(user: User | null): void {
    this._user.set(user);
  }

  setLoading(isLoading: boolean): void {
    this._loading.set(isLoading);
  }

  updateUser(partialUser: Partial<User>): void {
    this._user.update((current) => (current ? { ...current, ...partialUser } : null));
  }
}
