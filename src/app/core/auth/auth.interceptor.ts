import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';

import { AuthStore } from './auth.store';

/**
 * Functional HTTP interceptor that manages cross-cutting authentication concerns.
 * Configures outgoing requests to include credentials and globally monitors for authorization failures.
 * Automatically initiates a logout flow if a 401 Unauthorized response is detected on protected endpoints.
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authStore = inject(AuthStore);

  const clonedRequest = req.clone({
    withCredentials: true,
  });

  return next(clonedRequest).pipe(
    catchError((error: HttpErrorResponse) => {
      const isAuthRequest = req.url.includes('/auth/');

      if (error.status === 401 && !isAuthRequest) {
        authStore.logout();
      }
      return throwError(() => error);
    }),
  );
};
