import { Component, ChangeDetectionStrategy, inject, signal, effect } from '@angular/core';
import { form, FormField, required, email, minLength } from '@angular/forms/signals';
import { Router, ActivatedRoute } from '@angular/router';
import { UserStore } from '@core/store/user.store';
import { UserRole } from '@domain/enums/user-role';
import { CreateUserDto } from '@domain/dtos/create-user-dto';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [FormField],
  templateUrl: './user-form.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserForm {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  readonly userStore = inject(UserStore);
  errorMessage = signal<string | null>(null);
  isSuccess = signal<boolean>(false);

  roles = Object.values(UserRole);

  userModel = signal<CreateUserDto>({
    fullName: '',
    username: '',
    email: '',
    password: '',
    role: UserRole.CUSTOMER,
    isActive: true,
  });

  readonly roleLabels: Record<UserRole, string> = {
    [UserRole.ADMIN]: 'Administrador',
    [UserRole.CUSTOMER]: 'Cliente / Usuario',
  };

  userForm = form(this.userModel, (schemaPath) => {
    required(schemaPath.fullName, { message: 'El nombre es requerido' });
    required(schemaPath.username, { message: 'El usuario es requerido' });
    required(schemaPath.email, { message: 'El correo es requerido' });
    email(schemaPath.email, { message: 'Email inválido' });

    required(schemaPath.role, { message: 'El rol es requerido' });

    if (!this.userStore.currentUserId()) {
      required(schemaPath.password, { message: 'La contraseña es requerida' });
      minLength(schemaPath.password, 6, { message: 'Mínimo 6 caracteres' });
    }
  });

  constructor() {
    const id = this.route.snapshot.params['id'] ?? null;
    this.userStore.currentUserId.set(id);

    effect(() => {
      const currentId = this.userStore.currentUserId();
      if (!currentId) return;

      const user = this.userStore.users().find((u) => u._id === currentId);
      if (user) {
        this.userModel.set({
          fullName: user.fullName,
          username: user.username,
          email: user.email,
          role: user.role,
          isActive: user.isActive,
          password: '',
        });
      }
    });
  }

  toggleActive() {
    this.userModel.update((m) => ({ ...m, isActive: !m.isActive }));
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    if (this.userForm().invalid()) return;

    const data: Record<string, unknown> = { ...this.userModel() };
    if (this.userStore.currentUserId() && !data['password']) {
      delete data['password'];
    }

    this.userStore.setLoading(true);
    this.userStore
      .saveUser(data)
      .then(() => {
        this.isSuccess.set(true);
        setTimeout(() => this.goBack(), 2000);
      })
      .catch((error: unknown) => {
        this.errorMessage.set(error as string);
        this.isSuccess.set(false);
      })
      .finally(() => {
        this.userStore.setLoading(false);
      });
  }

  goBack(): void {
    this.userStore.currentUserId.set(null);
    void this.router.navigate(['/admin/usuarios']);
  }
}
