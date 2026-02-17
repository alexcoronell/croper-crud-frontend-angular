import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { LoginResponse } from '@core/interfaces/auth.interface';
import { LoginDto } from '../dtos/auth-dto';
import { RegisterUserDto } from '@app/domain/dtos/register-user-dto';
import { User } from '@models/user.model';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);

  private readonly apiUrl = environment.apiUrl;

  login = (credentials: LoginDto): Observable<LoginResponse | undefined> =>
    this.http.post<LoginResponse>(`${this.apiUrl}/auth/login`, credentials);

  register = (userData: RegisterUserDto) =>
    this.http.post<User>(`${this.apiUrl}/user/register`, userData);

  logout = () => this.http.post(`${this.apiUrl}/auth/logout`, {});
}
