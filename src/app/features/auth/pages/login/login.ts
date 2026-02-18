import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { form, FormField, required } from '@angular/forms/signals';
import { Router, RouterLink } from '@angular/router';

import { AuthService } from '@core/auth/auth.service';
import { AuthStore } from '@core/auth/auth.store';
import { LoginDto } from '@core/dtos/auth-dto';
import { UserRole } from '@enums/user-role';

/**
 * Component providing login functionality.
 * Manages user credentials, form validation, and authentication with the backend.
 */
@Component({
  selector: 'app-login',
  imports: [FormField, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Login {
  /** Injected Router for navigation after successful login. */
  private router = inject(Router);
  /** Injected AuthService for making authentication requests. */
  private authService = inject(AuthService);
  /** Injected AuthStore for managing global authentication state. */
  public authStore = inject(AuthStore);

  /** Signal holding error messages to be displayed in the UI. */
  errorMessage = signal<string | null>(null);

  /** Model signal holding the login credentials as a DTO. */
  loginModel = signal<LoginDto>({
    username: '',
    password: '',
  });

  /** Form state and validation logic using Angular Signal Forms. */
  loginForm = form(this.loginModel, (schemaPath) => {
    required(schemaPath.username, { message: 'El usuario es requerido' });
    required(schemaPath.password, { message: 'La contraseña es requerida' });
  });

  /**
   * Handles the login form submission.
   * Validates credentials and redirects users based on their assigned role.
   * @param event - The submission event.
   */
  onSubmit(event: Event): void {
    event.preventDefault();
    if (this.loginForm().invalid()) {
      return;
    }
    this.authStore.setLoading(true);
    this.authService.login(this.loginModel()).subscribe({
      next: (response) => {
        this.authStore.setLoading(false);
        if (response?.user) {
          const { user } = response;
          this.authStore.setUser(user);
          if (user.role === UserRole.ADMIN) {
            void this.router.navigate(['admin/dashboard']);
          } else {
            void this.router.navigate(['/']);
          }
        }
      },
      error: (error) => {
        this.authStore.setLoading(false);
        if (error.status === 401) {
          this.errorMessage.set('Usuario o contraseña incorrectos');
        } else {
          this.errorMessage.set('Ocurrió un error inesperado. Intenta de nuevo.');
        }
      },
    });
  }
}
