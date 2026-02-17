import { User } from '@models/user.model';

export interface AuthResponse {
  message: string;
  user: User;
}

export type LoginResponse = AuthResponse;

export interface AuthStatus {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
}
