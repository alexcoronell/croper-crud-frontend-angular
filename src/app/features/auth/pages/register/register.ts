import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { email, form, FormField, minLength, required } from '@angular/forms/signals';
import { Router, RouterLink } from '@angular/router';

import { AuthService } from '@core/auth/auth.service';
import { AuthStore } from '@core/auth/auth.store';
import { RegisterUserDto } from '@dtos/register-user-dto';

/**
 * Component providing user registration functionality.
 * Handles the creation of new accounts and form validation.
 */
@Component({
  selector: 'app-register',
  imports: [FormField, RouterLink],
  templateUrl: './register.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Register {
  /** Injected Router for navigation after registration. */
  private router = inject(Router);
  /** Injected AuthService for making registration requests. */
  private authService = inject(AuthService);
  /** Injected AuthStore for managing global authentication state. */
  public authStore = inject(AuthStore);

  /** Signal holding error messages to be displayed in the UI. */
  errorMessage = signal<string | null>(null);
  /** Signal indicating the success state of account creation. */
  isSuccess = signal<boolean>(false);

  /** Model signal holding the registration data as a DTO. */
  registerModel = signal<RegisterUserDto>({
    username: '',
    email: '',
    password: '',
    fullName: '',
  });

  /** Form state and validation logic using Angular Signal Forms. */
  registerForm = form(this.registerModel, (schemaPath) => {
    required(schemaPath.username, { message: 'El usuario es requerido' });
    required(schemaPath.fullName, { message: 'El nombre completo es requerido' });
    required(schemaPath.email, { message: 'El correo es requerido' });
    email(schemaPath.email, { message: 'Formato de correo inválido' });
    required(schemaPath.password, { message: 'La contraseña es requerida' });
    minLength(schemaPath.password, 6, { message: 'Mínimo 6 caracteres' });
  });

  /**
   * Handles the registration form submission.
   * Validates user data and triggers user creation via AuthService.
   * @param event - The submission event.
   */
  onSubmit(event: Event): void {
    event.preventDefault();
    this.errorMessage.set(null);

    if (this.registerForm().invalid()) return;

    this.authStore.setLoading(true);

    this.authService.register(this.registerModel()).subscribe({
      next: () => {
        this.authStore.setLoading(false);
        this.isSuccess.set(true);
        setTimeout(() => {
          void this.router.navigate(['/ingreso']);
        }, 3000);
      },
      error: (error: { error?: { message?: string } }) => {
        this.authStore.setLoading(false);
        this.errorMessage.set(error.error?.message ?? 'Error creating account');
      },
    });
  }
}
