import { Routes } from '@angular/router';
export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./products/container/products-list/products-list.component').then(
        (c) => c.ProductsListComponent
      ),
  },
  {
    path: 'checkout',
    loadComponent: () =>
      import('./checkout/component/checkout.component').then(
        (c) => c.CheckoutComponent
      ),
  },
];
