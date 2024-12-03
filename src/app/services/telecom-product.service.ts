import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TelecomProduct } from '../models/telecom-product.interface';

@Injectable({
  providedIn: 'root'
})
export class TelecomProductService {
  private defaultImage = 'https://app.rasseed.com/files/image%20ar&en-01018109.png';
  
  private products: TelecomProduct[] = [
    {
      id: 1,
      name: 'بطاقة شحن فيرجن موبايل',
      image: this.defaultImage,
      prices: [
        { amount: 'SAR 50', label: 'SAR 50' },
        { amount: 'SAR 20', label: 'SAR 20' },
        { amount: '15 SAR', label: '15 SAR' }
      ],
      additionalPrices: [
        { amount: 'SAR 100', label: 'SAR 100' }
      ]
    },
    {
      id: 2,
      name: 'شحن رصيد بطاقة زين و زين انترنت',
      image: this.defaultImage,
      prices: [
        { amount: 'SAR 25', label: 'SAR 25' },
        { amount: 'SAR 20', label: 'SAR 20' }
      ],
      additionalPrices: [
        { amount: '34.5 SAR', label: '34.5 SAR' },
        { amount: 'Flex 29 - 4 Weeks', label: 'Flex 29 - 4 Weeks' }
      ],
      logos: [this.defaultImage, this.defaultImage]
    },
    {
      id: 3,
      name: 'شحن بطاقة موبايلي',
      image: this.defaultImage,
      prices: [
        { amount: 'SAR 34.5', label: 'SAR 34.5' },
        { amount: 'SAR 25', label: 'SAR 25' },
        { amount: 'SAR 20', label: 'SAR 20' }
      ],
      additionalPrices: [
        { amount: 'SAR 230', label: 'SAR 230' },
        { amount: '115 SAR', label: '115 SAR' },
        { amount: 'SAR 57.5', label: 'SAR 57.5' }
      ],
      logos: [this.defaultImage, this.defaultImage]
    },
    {
      id: 4,
      name: 'شحن بطاقة Stc و كويك نت',
      image: this.defaultImage,
      prices: [
        { amount: 'Like', label: 'Like' },
        { amount: 'Flex Basic', label: 'Flex Basic' },
        { amount: 'Basic', label: 'Basic' }
      ],
      additionalPrices: [
        { amount: 'Flex 100', label: 'Flex 100' },
        { amount: 'Like Plus', label: 'Like Plus' },
        { amount: 'Flex 65', label: 'Flex 65' }
      ],
      logos: [this.defaultImage, this.defaultImage, this.defaultImage]
    }
  ];

  getProducts(): Observable<TelecomProduct[]> {
    return of(this.products);
  }
}