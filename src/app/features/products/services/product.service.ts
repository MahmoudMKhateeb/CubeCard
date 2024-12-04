import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from '../../../shared/models/product.interface';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [
    {
      id: 1,
      name: 'شحن بطاقة ايتونز',
      image: 'https://app.rasseed.com/files/image%20ar&en-01018109.png',
      description: 'بطاقة شحن رصيد آيتونز',
      features: ['شحن فوري', 'صالحة عالمياً', 'دعم فني على مدار الساعة'],
      targetAudience: 'مستخدمي خدمات آبل',
      categorySlug: 'digital-stores',
      prices: [
        { amount: '100', currency: 'SAR' },
        { amount: '75', currency: 'SAR' },
        { amount: '50', currency: 'SAR' }
      ],
      regions: [
        { name: 'UK', flag: 'https://app.rasseed.com/files/uk_flag.webp' },
        { name: 'SA', flag: 'https://app.rasseed.com/files/sar_flag.webp' }
      ]
    },
    {
      id: 2,
      name: 'شحن بلايستيشن ستور',
      image: 'https://app.rasseed.com/files/psn-logo.png',
      description: 'بطاقة شحن متجر بلايستيشن',
      features: ['تفعيل فوري', 'متوافق مع جميع الأجهزة', 'دعم فني متواصل'],
      targetAudience: 'لاعبي البلايستيشن',
      categorySlug: 'games',
      prices: [
        { amount: '100', currency: 'SAR' },
        { amount: '50', currency: 'SAR' },
        { amount: '30', currency: 'SAR' }
      ],
      regions: [
        { name: 'UK', flag: 'https://app.rasseed.com/files/uk_flag.webp' }
      ]
    },
    {
      id: 3,
      name: 'يلا لودو',
      image: 'https://app.rasseed.com/files/yalla-ludo.png',
      description: 'بطاقة شحن يلا لودو',
      features: ['شحن مباشر', 'صالحة لجميع الألعاب', 'دعم عربي'],
      targetAudience: 'محبي الألعاب الاجتماعية',
      categorySlug: 'games',
      prices: [
        { amount: '50', currency: 'SAR' },
        { amount: '25', currency: 'SAR' },
        { amount: '10', currency: 'SAR' }
      ],
      regions: [
        { name: 'SA', flag: 'https://app.rasseed.com/files/sar_flag.webp' }
      ]
    },
    {
      id: 4,
      name: 'شحن بطاقة Stc و كويك نت',
      image: 'https://app.rasseed.com/files/stc-logo.png',
      description: 'بطاقة شحن اتصالات وانترنت',
      features: ['تفعيل فوري', 'خدمة عملاء 24/7', 'تغطية واسعة'],
      targetAudience: 'مستخدمي STC',
      categorySlug: 'communications',
      prices: [
        { amount: '100', currency: 'SAR' },
        { amount: '50', currency: 'SAR' },
        { amount: '20', currency: 'SAR' }
      ],
      regions: [
        { name: 'SA', flag: 'https://app.rasseed.com/files/sar_flag.webp' }
      ]
    },
    {
      id: 5,
      name: 'نتفلكس',
      image: 'https://app.rasseed.com/files/netflix-logo.png',
      description: 'بطاقة اشتراك نتفلكس',
      features: ['تفعيل فوري', 'مشاهدة غير محدودة', 'جودة عالية'],
      targetAudience: 'محبي المسلسلات والأفلام',
      categorySlug: 'movies-music',
      prices: [
        { amount: '200', currency: 'SAR' },
        { amount: '100', currency: 'SAR' },
        { amount: '50', currency: 'SAR' }
      ],
      regions: [
        { name: 'SA', flag: 'https://app.rasseed.com/files/sar_flag.webp' }
      ]
    },
    {
      id: 6,
      name: 'شحن بطاقة زين',
      image: 'https://app.rasseed.com/files/zain-logo.png',
      description: 'بطاقة شحن رصيد زين',
      features: ['شحن فوري', 'تغطية واسعة', 'دعم فني متواصل'],
      targetAudience: 'مستخدمي زين',
      categorySlug: 'communications',
      prices: [
        { amount: '100', currency: 'SAR' },
        { amount: '50', currency: 'SAR' },
        { amount: '20', currency: 'SAR' }
      ],
      regions: [
        { name: 'SA', flag: 'https://app.rasseed.com/files/sar_flag.webp' }
      ]
    },
    {
      id: 7,
      name: 'شحن بطاقة موبايلي',
      image: 'https://app.rasseed.com/files/mobily-logo.png',
      description: 'بطاقة شحن رصيد موبايلي',
      features: ['شحن فوري', 'تغطية واسعة', 'دعم فني متواصل'],
      targetAudience: 'مستخدمي موبايلي',
      categorySlug: 'communications',
      prices: [
        { amount: '100', currency: 'SAR' },
        { amount: '50', currency: 'SAR' },
        { amount: '20', currency: 'SAR' }
      ],
      regions: [
        { name: 'SA', flag: 'https://app.rasseed.com/files/sar_flag.webp' }
      ]
    },
    {
      id: 8,
      name: 'شحن بطاقة جوجل بلاي',
      image: 'https://app.rasseed.com/files/google-play-logo.png',
      description: 'بطاقة شحن متجر جوجل بلاي',
      features: ['تفعيل فوري', 'صالحة عالمياً', 'دعم فني متواصل'],
      targetAudience: 'مستخدمي أندرويد',
      categorySlug: 'digital-stores',
      prices: [
        { amount: '100', currency: 'SAR' },
        { amount: '50', currency: 'SAR' },
        { amount: '25', currency: 'SAR' }
      ],
      regions: [
        { name: 'UK', flag: 'https://app.rasseed.com/files/uk_flag.webp' },
        { name: 'SA', flag: 'https://app.rasseed.com/files/sar_flag.webp' }
      ]
    }
  ];
  private apiUrl = 'http://localhost:8000/api/products'; // Update with your API URL
  constructor(private http: HttpClient) {}
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
    // return of(this.products);
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  searchProducts(query: string): Observable<Product[]> {
    const filteredProducts = this.products.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.description.toLowerCase().includes(query.toLowerCase())
    );
    return of(filteredProducts);
  }
}