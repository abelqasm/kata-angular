import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
export const routes: Routes = [
  {
    path: '',
    // loadComponent: () =>
    //   import('./pages/home/home.component').then((c) => c.HomeComponent),
    component: HomeComponent,
  },
  {
    path: '/checkout',
    loadComponent: () =>
      import('./pages/checkout/checkout.component').then(
        (c) => c.CheckoutComponent
      ),
  },
];
