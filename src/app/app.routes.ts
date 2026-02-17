import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./layouts/public-layout/public-layout').then((c) => c.PublicLayout),
    children: [
      {
        path: 'ingreso',
        loadComponent: () => import('./features/auth/pages/login/login').then((c) => c.Login),
      },
      {
        path: 'registro',
        loadComponent: () =>
          import('./features/auth/pages/register/register').then((c) => c.Register),
      },
    ],
  },
];
