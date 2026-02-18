import { computed, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { UserRole } from '@enums/user-role';
import { User } from '@models/user.model';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthStore {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly platformId = inject(PLATFORM_ID);

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

  private finalizeLogout(): void {
    this._user.set(null);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
    }
    this._loading.set(false);
    void this.router.navigate(['/ingreso']);
  }

  logout(): void {
    this._loading.set(true);
    this.authService.logout().subscribe({
      next: () => this.finalizeLogout(),
      error: () => this.finalizeLogout(),
    });
  }
}
