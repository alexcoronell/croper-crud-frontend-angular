import { HttpClient, httpResource } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { User } from '@models/user.model';
import { environment } from 'src/environments/environment';

/**
 * Interface representing the paginated response for users.
 */
export interface UsersResponse {
  /** Array of user objects for the current page. */
  data: User[];
  /** Total count of users available on the server. */
  total: number;
}

/**
 * Service for managing user data via API.
 * Provides methods for listing, creating, updating, and deleting users.
 */
@Injectable({
  providedIn: 'root',
})
export class UserService {
  /** Injected HttpClient for performing API requests. */
  private http = inject(HttpClient);
  /** Base API URL defined in environment configuration. */
  private readonly apiBase: string = environment.apiUrl;
  /** Full API endpoint URL for user-related operations. */
  private readonly apiUrl: string = `${this.apiBase}/user`;

  /**
   * Generates an httpResource for fetching users with pagination.
   * @param params - Function returning pagination parameters (page, limit).
   * @returns An Angular httpResource for the user list.
   */
  getAll = (params: () => { page: number; limit: number }) =>
    httpResource<UsersResponse>(() => ({
      url: this.apiUrl,
      params: params(),
    }));

  /**
   * Creates a new user in the system.
   * @param user - Partial user data for account creation.
   * @returns An observable of the created user object.
   */
  create = (user: Partial<User>) => this.http.post<User>(this.apiUrl, user);

  /**
   * Updates an existing user's information.
   * @param id - The unique ID of the user to update.
   * @param user - Partial data containing the updates.
   * @returns An observable of the updated user object.
   */
  update = (id: string, user: Partial<User>) => this.http.patch<User>(`${this.apiUrl}/${id}`, user);

  /**
   * Removes a user record from the system.
   * @param id - The unique ID of the user to delete.
   * @returns An observable indicating the deletion result.
   */
  delete = (id: string) => this.http.delete(`${this.apiUrl}/${id}`);
}
