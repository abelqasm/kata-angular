import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  MatDialogModule,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <header>
      <app-header />
    </header>
    <main class="w-full flex justify-center">
      <router-outlet></router-outlet>
    </main>
    <footer class="flex justify-center gap-10 bg-gray-200 w-full p-2">
			<span className='text-xs'>© 2024 Belcom. All rights reserved</span>
    </footer>
  `,
  imports: [RouterOutlet, HeaderComponent, MatDialogModule],
})
export class AppComponent {
  title = 'kata';
}
