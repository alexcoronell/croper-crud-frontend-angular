import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { AuthStore } from '@core/auth/auth.store';

/**
 * Functional route guard that protects administration-restricted routes.
 * Verifies both authentication status and admin role membership.
 * Redirects unauthenticated users to the login page and non-admin users to a 403 Forbidden page.
 */
export const adminGuard: CanActivateFn = () => {
  const authStore = inject(AuthStore);
  const router = inject(Router);

  if (!authStore.isAuthenticated()) {
    return router.parseUrl('/ingreso');
  }

  if (authStore.isAdmin()) {
    return true;
  }

  return router.parseUrl('/403');
};
