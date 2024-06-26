import { Component, Inject, inject } from '@angular/core';
import { Product } from '../../models/product.model';
import { CurrencyPipe } from '@angular/common';
import {
  MatDialogModule,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [MatDividerModule, MatDialogModule, CurrencyPipe],
  template: `
    <header class="place-items-start relative">
      <h1 mat-dialog-title>{{ data.product.title }}</h1>
      <h2>{{ data.product.category }}</h2>
      <button></button>
    </header>
    <mat-dialog-content class="mat-typography">
      <img
        mat-card-image
        [src]="data.product.image"
        class="object-cover h-48 rounded-lg"
      />
      <span>
        {{ data.product.price | currency }}
      </span>
    </mat-dialog-content>
    <mat-divider></mat-divider>
    <mat-dialog-actions class="w-full">
      <button
        mat-button
        class="w-full bg-[#51829B] py-2 rounded-lg"
        (onclick)="addToCart()"
      >
        Add to cart
      </button>
    </mat-dialog-actions>
  `,
})
export class ProductDetailsComponent {
  private readonly dialogRef = inject(MatDialogRef<ProductDetailsComponent>);

  constructor(@Inject(MAT_DIALOG_DATA) public data: { product: Product }) {}
  closeDetails() {
    this.dialogRef.close();
  }
  addToCart() {}
}
