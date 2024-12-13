import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreConfig } from '../../../../../shared/config/store-config';

@Component({
  selector: 'app-download-apps',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="text-center md:text-right">
      <h3 class="text-lg font-semibold text-cyber-text-primary mb-4">حمل التطبيق</h3>
      <div class="flex flex-col gap-4">
        <!-- Google Play Button -->
        <a [href]="storeConfig.android.url" 
           target="_blank" 
           rel="noopener noreferrer"
           class="block bg-cyber-card hover:bg-cyber-surface transition-colors p-4 rounded-lg group">
          <img [src]="storeConfig.android.badge"
               [alt]="storeConfig.android.altText"
               class="h-14 w-auto mx-auto transition-transform group-hover:scale-105">
        </a>

        <!-- App Store Button -->
        <a [href]="storeConfig.ios.url" 
           target="_blank" 
           rel="noopener noreferrer"
           class="block bg-cyber-card hover:bg-cyber-surface transition-colors p-4 rounded-lg group">
          <img [src]="storeConfig.ios.badge"
               [alt]="storeConfig.ios.altText"
               class="h-14 w-auto mx-auto transition-transform group-hover:scale-105">
        </a>
      </div>
    </div>
  `,
  styles: [`
    @media (prefers-reduced-motion: reduce) {
      .transition-transform,
      .transition-colors {
        transition: none;
      }
    }
  `]
})
export class DownloadAppsComponent {
  storeConfig = StoreConfig;
}