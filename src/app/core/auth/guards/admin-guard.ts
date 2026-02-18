import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthStore } from '@core/auth/auth.store';

export const adminGuard: CanActivateFn = () => {
  const authStore = inject(AuthStore);
  const router = inject(Router);

  // Si no está autenticado, redirigir al login
  if (!authStore.isAuthenticated()) {
    return router.parseUrl('/ingreso');
  }

  // Si está autenticado pero no es admin, redirigir al 403
  if (authStore.isAdmin()) {
    return true;
  }

  return router.parseUrl('/403');
};
