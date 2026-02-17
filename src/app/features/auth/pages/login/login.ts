import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { form, FormField, required } from '@angular/forms/signals';
import { Router } from '@angular/router';
import { AuthStore } from '@app/core/auth/auth.store';
import { AuthService } from '@app/core/auth/auth.service';
import { LoginDto } from '@app/core/dtos/auth-dto';
import { UserRole } from '@app/domain/enums/user-role';

@Component({
  selector: 'app-login',
  imports: [FormField],
  templateUrl: './login.html',
  styleUrl: './login.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Login {
  private router = inject(Router);
  private authService = inject(AuthService);
  public authStore = inject(AuthStore);

  errorMessage = signal<string | null>(null);

  loginModel = signal<LoginDto>({
    username: '',
    password: '',
  });

  loginForm = form(this.loginModel, (schemaPath) => {
    required(schemaPath.username, { message: 'El usuario es requerido' });
    required(schemaPath.password, { message: 'La contraseña es requerida' });
  });

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
            void this.router.navigate(['/dashboard']);
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
