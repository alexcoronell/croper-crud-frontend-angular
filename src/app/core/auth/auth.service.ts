import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { LoginResponse } from '@core/interfaces/auth.interface';
import { RegisterUserDto } from '@dtos/register-user-dto';
import { User } from '@models/user.model';
import { environment } from '../../../environments/environment';
import { LoginDto } from '../dtos/auth-dto';

/**
 * Service responsible for authentication operations.
 * Handles login, user registration, and logout processes with the backend API.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  /** Injected HttpClient for making API requests. */
  private readonly http = inject(HttpClient);

  /** Base API URL loaded from environment configuration. */
  private readonly apiUrl = environment.apiUrl;

  /**
   * Authenticates a user with provided credentials.
   * @param credentials - The user's login data (username and password).
   * @returns An observable containing the login response with user data and message.
   */
  login = (credentials: LoginDto): Observable<LoginResponse | undefined> =>
    this.http.post<LoginResponse>(`${this.apiUrl}/auth/login`, credentials);

  /**
   * Registers a new user in the system.
   * @param userData - The registration data for the new user.
   * @returns An observable containing the created user object.
   */
  register = (userData: RegisterUserDto) =>
    this.http.post<User>(`${this.apiUrl}/user/register`, userData);

  /**
   * Terminates the current user session on the server.
   * @returns An observable indicating the result of the logout request.
   */
  logout = () => this.http.post(`${this.apiUrl}/auth/logout`, {});
}
