import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { AuthStore } from '../auth.store';

/**
 * Functional route guard that prevents authenticated users from accessing public-only routes.
 * Useful for auth pages like Login or Register to redirect already logged-in users to the home page.
 * @returns true if the user is not authenticated, otherwise redirects to the dashboard root.
 */
export const publicGuard: CanActivateFn = () => {
  const authStore = inject(AuthStore);
  const router = inject(Router);

  if (authStore.isAuthenticated()) {
    return router.parseUrl('/');
  }

  return true;
};
