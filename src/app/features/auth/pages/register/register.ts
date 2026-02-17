import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { form, FormField, required, email, minLength } from '@angular/forms/signals';
import { Router, RouterLink } from '@angular/router';
import { AuthStore } from '@app/core/auth/auth.store';
import { AuthService } from '@app/core/auth/auth.service';
import { RegisterUserDto } from '@app/domain/dtos/register-user-dto';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormField, RouterLink],
  templateUrl: './register.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Register {
  private router = inject(Router);
  private authService = inject(AuthService);
  public authStore = inject(AuthStore);

  errorMessage = signal<string | null>(null);
  isSuccess = signal<boolean>(false);

  registerModel = signal<RegisterUserDto>({
    username: '',
    email: '',
    password: '',
    fullName: '',
  });

  registerForm = form(this.registerModel, (schemaPath) => {
    required(schemaPath.username, { message: 'El usuario es requerido' });
    required(schemaPath.fullName, { message: 'El nombre completo es requerido' });
    required(schemaPath.email, { message: 'El correo es requerido' });
    email(schemaPath.email, { message: 'Formato de correo inválido' });
    required(schemaPath.password, { message: 'La contraseña es requerida' });
    minLength(schemaPath.password, 6, { message: 'Mínimo 6 caracteres' });
  });

  onSubmit(event: Event): void {
    event.preventDefault();
    this.errorMessage.set(null);

    if (this.registerForm().invalid()) return;

    this.authStore.setLoading(true);

    // Logic for registration
    this.authService.register(this.registerModel()).subscribe({
      next: () => {
        this.authStore.setLoading(false);
        this.isSuccess.set(true);
        setTimeout(() => {
          void this.router.navigate(['/ingreso']);
        }, 3000);
      },
      error: (error) => {
        this.authStore.setLoading(false);
        this.errorMessage.set(error.error?.message ?? 'Error al crear la cuenta');
      },
    });
  }
}
