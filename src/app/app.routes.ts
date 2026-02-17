import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./layouts/public-layout/public-layout').then((c) => c.PublicLayout),
    children: [
      {
        path: 'auth/login',
        loadComponent: () => import('./features/auth/pages/login/login').then((c) => c.Login),
      },
    ],
  },
];
