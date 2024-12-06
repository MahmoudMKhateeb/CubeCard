import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Product } from '../models/product.interface';
import {HttpClient} from "@angular/common/http";
import {AppConstants} from "../app.constants";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsSubject = new BehaviorSubject<Product[]>([]);
  products$ = this.productsSubject.asObservable();

  private products: Product[] = [

  ];

  constructor(private http: HttpClient) {
    this.productsSubject.next(this.products);
  }

  getProducts(): Observable<Product[]> {
    return this.products$;
  }

  getProductById(id: number): Observable<Product | undefined> {
    return of(this.products.find(product => product.uuid === id));
  }

  searchProducts(query: string): Observable<Product[]> {
    console.log('Search Was Fired')
    if (!query.trim()) {
      return this.http.get<Product[]>(AppConstants.apiUrl+'product/search'); // Replace this with an endpoint that fetches all products if needed
    }

    return this.http.get<Product[]>(`${AppConstants.apiUrl}product/search?query=${query}`);
  }

  filterByCategory(categorySlug: string): Observable<Product[]> {
    if (!categorySlug) {
      return of(this.products);
    }

    const filteredProducts = this.products.filter(product => 
      product.categorySlug === categorySlug
    );

    return of(filteredProducts);
  }

  updateSearchResults(products: Product[]): void {
    this.productsSubject.next(products);
  }
}