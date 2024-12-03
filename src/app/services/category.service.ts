import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Category } from '../models/category.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private categories: Category[] = [
    {
      id: 1,
      nameAr: 'أفلام وموسيقى',
      nameEn: 'Movies & Music',
      icon: 'https://app.rasseed.com/files/Music_&_Films.svg',
      itemCount: 24,
      slug: 'movies-music'
    },
    {
      id: 2,
      nameAr: 'الخدمات',
      nameEn: 'Services',
      icon: 'https://app.rasseed.com/files/Services.svg',
      itemCount: 15,
      slug: 'services'
    },
    {
      id: 3,
      nameAr: 'المحافظ الرقمية',
      nameEn: 'Digital Wallets',
      icon: 'https://app.rasseed.com/files/eWallet.svg',
      itemCount: 8,
      slug: 'digital-wallets'
    },
    {
      id: 4,
      nameAr: 'التسوق',
      nameEn: 'Shopping',
      icon: 'https://app.rasseed.com/files/Shopping00e504.svg',
      itemCount: 32,
      slug: 'shopping'
    },
    {
      id: 5,
      nameAr: 'الألعاب',
      nameEn: 'Games',
      icon: 'https://app.rasseed.com/files/Games99db4a.svg',
      itemCount: 45,
      slug: 'games'
    },
    {
      id: 6,
      nameAr: 'الإنترنت',
      nameEn: 'Internet',
      icon: 'https://app.rasseed.com/files/Data--01.svg',
      itemCount: 12,
      slug: 'internet'
    },
    {
      id: 7,
      nameAr: 'المتاجر الرقمية',
      nameEn: 'Digital Stores',
      icon: 'https://app.rasseed.com/files/Stores.svg',
      itemCount: 28,
      slug: 'digital-stores'
    },
    {
      id: 8,
      nameAr: 'الإتصالات',
      nameEn: 'Communications',
      icon: 'https://app.rasseed.com/files/Voice-01.svg',
      itemCount: 19,
      slug: 'communications'
    }
  ];

  getCategories(): Observable<Category[]> {
    return of(this.categories);
  }

  searchCategories(query: string): Observable<Category[]> {
    const filteredCategories = this.categories.filter(category => 
      category.nameAr.includes(query) || 
      category.nameEn.toLowerCase().includes(query.toLowerCase())
    );
    return of(filteredCategories);
  }
}