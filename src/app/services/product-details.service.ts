import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ProductDetails } from '../models/product-details.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductDetailsService {
  private products: ProductDetails[] = [
    {
      id: 1,
      name: 'STC Quick Net',
      price: 34.50,
      currency: 'USD',
      features: [
        'Unlimited local calls',
        '100GB high-speed internet',
        'Free STC TV subscription'
      ],
      description: 'Premium internet package with unlimited calling and entertainment bundle. Perfect for heavy internet users and streaming enthusiasts.',
      image: 'https://app.rasseed.com/files/stc-logo.png',
      variants: [
        { name: 'Like', price: 34.50 },
        { name: 'Flex Basic', price: 25.00 },
        { name: 'Basic', price: 20.00 }
      ]
    },
    {
      id: 2,
      name: 'Mobily Premium',
      price: 25.00,
      currency: 'USD',
      features: [
        '5G network access',
        'Unlimited social media',
        'International roaming included'
      ],
      description: 'Advanced mobile plan with 5G connectivity and comprehensive international coverage. Ideal for business professionals and travelers.',
      image: 'https://app.rasseed.com/files/mobily-logo.png',
      variants: [
        { name: 'Premium', price: 34.50 },
        { name: 'Standard', price: 25.00 },
        { name: 'Basic', price: 20.00 }
      ]
    },
    {
      id: 3,
      name: 'Zain Unlimited',
      price: 20.00,
      currency: 'USD',
      features: [
        'Unlimited data',
        'Free international minutes',
        'Premium app subscriptions'
      ],
      description: 'Comprehensive mobile package with unlimited data and international calling benefits. Best value for digital-first users.',
      image: 'https://app.rasseed.com/files/zain-logo.png',
      variants: [
        { name: 'Unlimited Plus', price: 25.00 },
        { name: 'Unlimited', price: 20.00 },
        { name: 'Basic', price: 15.00 }
      ]
    }
  ];

  getProducts(): Observable<ProductDetails[]> {
    return of(this.products);
  }

  getProductById(id: number): Observable<ProductDetails | undefined> {
    return of(this.products.find(product => product.id === id));
  }
}