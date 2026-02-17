import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthResponse, AuthStatus, LoginResponse } from '@domain/interfaces/auth.interface';
import { User } from '@domain/models/user.model';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthStore } from './auth.store';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly authStore = inject(AuthStore);
  private readonly apiUrl = `${environment.apiUrl}/auth`;

  async login(credentials: { email: string; password: string }): Promise<void> {
    this.authStore.setLoading(true);
    try {
      const response = await firstValueFrom(
        this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials),
      );
      this.authStore.setUser(response.user);
    } catch (error) {
      this.authStore.setUser(null);
      throw error;
    } finally {
      this.authStore.setLoading(false);
    }
  }

  async register(userData: Partial<User> & { password: string }): Promise<void> {
    this.authStore.setLoading(true);
    try {
      const response = await firstValueFrom(
        this.http.post<AuthResponse>(`${this.apiUrl}/register`, userData),
      );
      this.authStore.setUser(response.user);
    } finally {
      this.authStore.setLoading(false);
    }
  }

  async checkAuthStatus(): Promise<boolean> {
    this.authStore.setLoading(true);
    try {
      const response = await firstValueFrom(
        this.http.get<AuthStatus>(`${this.apiUrl}/check-status`),
      );

      if (response.isAuthenticated) {
        this.authStore.setUser(response.user);
        return true;
      }

      this.authStore.setUser(null);
      return false;
    } catch {
      this.authStore.setUser(null);
      return false;
    } finally {
      this.authStore.setLoading(false);
    }
  }

  async logout(): Promise<void> {
    this.authStore.setLoading(true);
    try {
      await firstValueFrom(this.http.post(`${this.apiUrl}/logout`, {}));
      this.authStore.setUser(null);
    } finally {
      this.authStore.setLoading(false);
    }
  }
}
