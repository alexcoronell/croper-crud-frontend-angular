import { UserRole } from '../enums/user-role';

export interface User {
  _id: string;
  fullName: string;
  username: string;
  email: string;
  role: UserRole;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
