import { Component, OnInit, OnDestroy } from '@angular/core';

interface Banner {
  image: string;
  alt: string;
}

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit, OnDestroy {
  banners: Banner[] = [
    {
      image: 'https://app.rasseed.com/files/cash%20back%20copy.webp',
      alt: 'عروض الكاش باك - خصومات حصرية على جميع المنتجات'
    },
    {
      image: 'https://app.rasseed.com/files/rasseed%20delivery.webp',
      alt: 'خدمة التوصيل السريع من رصيد'
    }
  ];

  currentIndex = 0;
  private autoSlideInterval?: number;

  ngOnInit(): void {
    this.startAutoSlide();
  }

  ngOnDestroy(): void {
    this.stopAutoSlide();
  }

  previousBanner(): void {
    this.currentIndex = this.currentIndex === 0 ? this.banners.length - 1 : this.currentIndex - 1;
    this.resetAutoSlide();
  }

  nextBanner(): void {
    this.currentIndex = (this.currentIndex + 1) % this.banners.length;
    this.resetAutoSlide();
  }

  setCurrentBanner(index: number): void {
    this.currentIndex = index;
    this.resetAutoSlide();
  }

  private startAutoSlide(): void {
    this.autoSlideInterval = window.setInterval(() => {
      this.nextBanner();
    }, 5000);
  }

  private stopAutoSlide(): void {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
    }
  }

  private resetAutoSlide(): void {
    this.stopAutoSlide();
    this.startAutoSlide();
  }
}