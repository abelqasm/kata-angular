import { Component, Input, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { CurrencyPipe } from '@angular/common';
@Component({
  selector: 'app-skeleton-card',
  standalone: true,
  imports: [MatCardModule, MatDividerModule, CurrencyPipe],
  template: `<mat-card class="product-card flex gap-2 p-3 w-64 animate-pulse">
    <mat-card-header class="h-10 bg-gray-200"></mat-card-header>
    <img mat-card-image class="bg-gray-200 h-48 rounded-lg" />
    <mat-card-content class="h-4 w-full bg-gray-200">
      <span class="h-4 w-full bg-gray-200"></span>
    </mat-card-content>
    <mat-divider></mat-divider>
    <mat-card-actions class="w-full bg-gray-200">
      <button mat-button class="w-full py-2 rounded-lg"></button>
    </mat-card-actions>
  </mat-card>`,
  styles: ['.product-card { background-color: #9bb0c1; }'],
})
export class SkeletonCardComponent {}
