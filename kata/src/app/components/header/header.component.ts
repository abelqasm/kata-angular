import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  template: `<nav>
    <span>Belcom</span>
    [routerLink]="['/routePath']" routerLinkActive="router-link-active" 
  </nav>`,
})
export class HeaderComponent {}
