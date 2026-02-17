import { Injectable, inject } from '@angular/core';
import { HttpClient, httpResource } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from '@app/domain/models/user.model';

export interface UsersResponse {
  data: User[];
  total: number;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);
  private readonly apiBase: string = environment.apiUrl;
  private readonly apiUrl: string = `${this.apiBase}/users`;

  getAll = (params: () => { page: number; limit: number }) => {
    return httpResource<UsersResponse>(() => ({
      url: this.apiUrl,
      params: params(),
    }));
  };

  create = (user: Partial<User>) => this.http.post<User>(this.apiUrl, user);

  update = (id: string, user: Partial<User>) => this.http.patch<User>(`${this.apiUrl}/${id}`, user);

  delete = (id: string) => this.http.delete(`${this.apiUrl}/${id}`);
}
