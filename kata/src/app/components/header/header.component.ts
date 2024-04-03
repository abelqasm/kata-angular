import { SearchComponent } from '../search/search.component';
import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import {
  MatBottomSheet,
  MatBottomSheetModule,
} from '@angular/material/bottom-sheet';
import { CartComponent } from 'src/app/cart/container/cart/cart.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [SearchComponent, RouterLink, MatBottomSheetModule, MatIconModule],
  template: `<nav class="flex justify-between px-5">
    <button
      [routerLink]="['/']"
      routerLinkActive="router-link-active"
      class="font-extrabold text-4xl h-fit py-3 px-2"
    >
      Belcom
    </button>
    <app-search />
    <button (click)="openBottomSheet()">
      <mat-icon>shopping_cart</mat-icon>
    </button>
  </nav>`,
})
export class HeaderComponent {
  private readonly bottomSheet = inject(MatBottomSheet);

  openBottomSheet(): void {
    this.bottomSheet.open(CartComponent);
  }
}
