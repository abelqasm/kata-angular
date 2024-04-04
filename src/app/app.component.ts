import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { HeaderComponent } from './header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    MatDialogModule,
    MatBottomSheetModule,
  ],
  template: `
    <header>
      <app-header />
    </header>
    <main class="w-full flex justify-center">
      <router-outlet></router-outlet>
    </main>
    <footer
      class="absolute bottom-0 flex justify-center gap-10 bg-gray-200 w-full p-2"
    >
      <span className="text-xs">© 2024 Belcom. All rights reserved</span>
    </footer>
  `,
})
export class AppComponent {
  title = 'kata';
}
