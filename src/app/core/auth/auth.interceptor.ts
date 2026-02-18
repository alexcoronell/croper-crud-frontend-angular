import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthStore } from './auth.store';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authStore = inject(AuthStore);

  const clonedRequest = req.clone({
    withCredentials: true,
  });

  return next(clonedRequest).pipe(
    catchError((error: HttpErrorResponse) => {
      // Si recibimos un 401 y no es una petición de auth, forzamos la salida
      const isAuthRequest = req.url.includes('/auth/');

      if (error.status === 401 && !isAuthRequest) {
        authStore.logout();
      }
      return throwError(() => error);
    }),
  );
};
