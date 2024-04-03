import { SearchComponent } from '../search/search.component';
import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import {
  MatBottomSheet,
  MatBottomSheetModule,
} from '@angular/material/bottom-sheet';
import { CartComponent } from 'src/app/cart/container/cart/cart.component';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { CartService } from 'src/app/cart/service/cart.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    SearchComponent,
    RouterLink,
    MatBottomSheetModule,
    MatIconModule,
    AsyncPipe,
  ],
  template: `<nav class="flex sm:flex-row flex-col sm:gap-20 gap-10 p-5 w-full">
    <button
      [routerLink]="['/']"
      routerLinkActive="router-link-active"
      class="font-extrabold text-4xl h-fit px-2 w-full sm:w-[30%]"
    >
      Belcom
    </button>
    <div class="flex gap-2 w-full sm:w-[70%] sm:justify-between justify-center">
      <app-search />
      <button class="relative p-2 h-fit" (click)="openBottomSheet()">
        <mat-icon>shopping_cart</mat-icon>
        <span
          class="absolute top-0 right-0 leading-none text-xs font-bold text-red-100 bg-red-600 p-1 rounded-full"
        >
          {{ totalItems$ | async }}
        </span>
      </button>
    </div>
  </nav>`,
})
export class HeaderComponent {
  private readonly bottomSheet = inject(MatBottomSheet);
  private readonly cartService = inject(CartService);
  public totalItems$!: Observable<number>;

  ngOnInit() {
    this.totalItems$ = this.cartService.getTotalItem();
  }

  openBottomSheet(): void {
    this.bottomSheet.open(CartComponent);
  }
}
