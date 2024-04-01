import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
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
    <footer>
      <p>parag</p>
    </footer>
  `,
  imports: [RouterOutlet, HeaderComponent],
})
export class AppComponent {
  title = 'kata';
}
