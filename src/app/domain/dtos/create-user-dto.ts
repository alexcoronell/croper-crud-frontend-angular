import { RegisterUserDto } from './register-user-dto';
import { UserRole } from '../enums/user-role';

export interface CreateUserDto extends RegisterUserDto {
  role: UserRole;
  isActive: boolean;
}
