import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class CategoriesPage {
  categories = [
    {
      name: 'أفلام وموسيقى',
      nameEn: 'Movies & Music',
      icon: 'https://app.rasseed.com/files/Music_&_Films.svg',
      link: '/movies-music',
      itemCount: 24
    },
    // ... other categories
  ];
}