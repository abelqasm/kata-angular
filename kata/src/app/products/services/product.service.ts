import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { apiUrl } from 'src/environments/environment';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly http = inject(HttpClient);
  private searchQuerySubject = new Subject<string>();
  private searchQuery$ = this.searchQuerySubject.asObservable();

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${apiUrl}/products`);
  }
  getProductsByCategory(category: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${apiUrl}/products/category/${category}`);
  }
  getCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${apiUrl}/products/categories`);
  }
  getSearchQuery(): Observable<string> {
    return this.searchQuery$;
  }
  updateQuery(queryParam: string) {
    this.searchQuerySubject.next(queryParam);
  }
}
