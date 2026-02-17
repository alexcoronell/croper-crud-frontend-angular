import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./layouts/public-layout/public-layout').then((c) => c.PublicLayout),
    children: [
      {
        path: '',
        loadComponent: () => import('./features/catalog/pages/home/home').then((c) => c.Home),
      },
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
  {
    path: 'admin',
    loadComponent: () => import('./layouts/admin-layout/admin-layout').then((c) => c.AdminLayout),
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/dashboard/pages/dashboard/dashboard').then((c) => c.Dashboard),
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'inventario',
        loadComponent: () =>
          import('./features/dashboard/pages/inventario/inventario').then((c) => c.Inventario),
      },
      {
        path: 'inventario/nuevo-producto',
        loadComponent: () =>
          import('./features/dashboard/components/product-form/product-form').then(
            (c) => c.ProductForm,
          ),
      },
      {
        path: 'inventario/editar-producto/:id',
        loadComponent: () =>
          import('./features/dashboard/components/product-form/product-form').then(
            (c) => c.ProductForm,
          ),
      },
    ],
  },
];
