import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `<h1>test</h1>
    <router-outlet></router-outlet>
    <p>parag</p> `,
  imports: [RouterOutlet],
})
export class AppComponent {
  title = 'kata';
}
