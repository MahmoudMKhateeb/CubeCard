import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from '../../../shared/models/product.interface';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {AppConstants} from "../../../app.constants";

@Injectable({
  providedIn: 'root'
})
export class ProductMainService {
   private apiUrl = AppConstants.apiUrl;
   private imagesUrl = AppConstants.imagesUrl;
  constructor(private http: HttpClient) {}
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl+"products").pipe(
        map(products => products.map(product => {
          return {
            ...product,
            image: `${this.imagesUrl}/${product.image}`
          };
        }))
    );
  }

  getProductById(uuid: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}products/${uuid}`).pipe(
        map(product => {
          product.image = `${this.imagesUrl}/${product.image}`;
          return product; // Return the entire modified product
        })
    );
  }


  searchProducts(query: string): Observable<Product[]> {
    //needs to be connected with the api
    // const filteredProducts = this.products.filter(product =>
    //   product.name.toLowerCase().includes(query.toLowerCase()) ||
    //   product.description.toLowerCase().includes(query.toLowerCase())
    // );
   // return of(filteredProducts);
    return of([]);
  }
}