import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreConfig } from '../../config/store-config';
import { PlatformDetectionService } from '../../services/platform-detection.service';

@Component({
  selector: 'app-mobile-download-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="!isAppUser" 
         class="sticky bottom-0 left-0 right-0 z-50 block sm:hidden p-4 bg-gradient-to-t from-cyber-background">
      <button 
        (click)="openDownloadDialog()"
        class="w-full bg-cyber-accent-primary text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-cyber-hover-primary transition-colors shadow-lg"
      >
        <svg xmlns="http://www.w3.org/2000/svg" 
             class="h-5 w-5" 
             fill="none" 
             viewBox="0 0 24 24" 
             stroke="currentColor">
          <path stroke-linecap="round" 
                stroke-linejoin="round" 
                stroke-width="2" 
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
        <span class="text-lg font-medium">حمل التطبيق</span>
      </button>
    </div>
  `,
  styles: [`
    @media (prefers-reduced-motion: reduce) {
      .transition-colors {
        transition: none;
      }
    }
  `]
})
export class MobileDownloadButtonComponent implements OnInit {
  isAppUser = false;

  constructor(private platformDetection: PlatformDetectionService) {}

  ngOnInit(): void {
    this.platformDetection.isAppUser$.subscribe(
      isApp => this.isAppUser = isApp
    );
  }

  openDownloadDialog(): void {
    const userAgent = navigator.userAgent.toLowerCase();
    if (userAgent.includes('android')) {
      window.location.href = StoreConfig.android.url;
    } else if (userAgent.includes('iphone') || userAgent.includes('ipad')) {
      window.location.href = StoreConfig.ios.url;
    } else {
      window.open(StoreConfig.android.url, '_blank');
    }
  }
}