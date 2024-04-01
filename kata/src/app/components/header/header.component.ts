import { Component } from '@angular/core';
import { SearchComponent } from '../search/search.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [SearchComponent],
  template: `<nav class="flex justify-between">
    <span>Belcom</span>
    <app-search />
  </nav>`,
})
export class HeaderComponent {}
