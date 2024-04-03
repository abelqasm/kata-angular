import { Component, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import {
  Subject,
  Subscription,
  debounceTime,
  distinctUntilChanged,
} from 'rxjs';
import { ProductService } from 'src/app/products/services/product.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatIconModule, FormsModule],
  template: `<mat-form-field appearance="fill" class="w-full py-3">
    <mat-label>Search Products</mat-label>
    <input
      matInput
      placeholder="Type to search..."
      [(ngModel)]="query"
      (keyup)="updateSearchQuery()"
    />
    <mat-icon matSuffix>search</mat-icon>
  </mat-form-field>`,
})
export class SearchComponent {
  private subscription$!: Subscription;
  private readonly productService = inject(ProductService);
  private readonly searchQuerySubject = new Subject<string>();
  public query!: string;
  
  constructor() {
    this.subscription$ = this.searchQuerySubject
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((queryParam) => this.updateFilter(queryParam));
    }
    
    updateSearchQuery() {
      this.searchQuerySubject.next(this.query);
    }
    
    updateFilter(queryParam: string) {
      this.productService.updateQuery(queryParam);
    }

    ngOnDestroy() {
    this.subscription$.unsubscribe();
  }
}
