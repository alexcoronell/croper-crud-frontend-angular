import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { email, form, FormField, minLength, required } from '@angular/forms/signals';
import { ActivatedRoute, Router } from '@angular/router';

import { UserStore } from '@core/store/user.store';
import { CreateUserDto } from '@dtos/create-user-dto';
import { UserRole } from '@enums/user-role';

/**
 * Component providing a form for creating and editing user information.
 * Handles validation, role selection, and account status toggling.
 */
@Component({
  selector: 'app-user-form',
  imports: [FormField],
  templateUrl: './user-form.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserForm {
  /** Injected Router for navigation. */
  private readonly router = inject(Router);
  /** Injected ActivatedRoute to access route parameters. */
  private readonly route = inject(ActivatedRoute);
  /** Injected UserStore for managing user state. */
  readonly userStore = inject(UserStore);
  /** Signal holding error messages for the form. */
  errorMessage = signal<string | null>(null);
  /** Signal indicating successful form submission. */
  isSuccess = signal<boolean>(false);

  /** Array of available user roles. */
  roles = Object.values(UserRole);

  /** Model signal holding the current form state as a DTO. */
  userModel = signal<CreateUserDto>({
    fullName: '',
    username: '',
    email: '',
    password: '',
    role: UserRole.CUSTOMER,
    isActive: true,
  });

  /** Mapping of user roles to human-readable labels. */
  readonly roleLabels: Record<UserRole, string> = {
    [UserRole.ADMIN]: 'Administrador',
    [UserRole.CUSTOMER]: 'Cliente / Usuario',
  };

  /** Form state and validation logic powered by Angular Signal Forms. */
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

  /**
   * Toggles the active status of the user in the model.
   */
  toggleActive(): void {
    this.userModel.update((m) => ({ ...m, isActive: !m.isActive }));
  }

  /**
   * Handles form submission.
   * Validates the form and triggers user creation or update via UserStore.
   * @param event - The DOM event object.
   */
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

  /**
   * Resets the current user selection and navigates back to the user list.
   */
  goBack(): void {
    this.userStore.currentUserId.set(null);
    void this.router.navigate(['/admin/usuarios']);
  }
}
