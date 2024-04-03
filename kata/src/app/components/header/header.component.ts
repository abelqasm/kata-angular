import { SearchComponent } from '../search/search.component';
import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import {
  MatBottomSheet,
  MatBottomSheetModule,
} from '@angular/material/bottom-sheet';
import { CartComponent } from 'src/app/cart/container/cart/cart.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [SearchComponent, MatBottomSheetModule, MatIconModule],
  template: `<nav class="flex justify-between px-5">
    <span class="font-extrabold text-4xl py-3">Belcom</span>
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
