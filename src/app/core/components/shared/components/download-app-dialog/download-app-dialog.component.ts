import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';
import { StoreConfig } from '../../config/store-config';
import { PlatformDetectionService } from '../../services/platform-detection.service';

@Component({
  selector: 'app-download-app-dialog',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="!isAppUser" 
         class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
         [@fadeIn]>
      <div class="bg-cyber-card rounded-lg p-6 max-w-md w-full mx-4 shadow-lg"
           [@slideIn]>
        <!-- Header -->
        <div class="text-center mb-6">
          <h2 class="text-xl font-semibold text-cyber-text-primary mb-2">حمل تطبيق كيوب كارد</h2>
          <p class="text-cyber-text-secondary">اختر نظام التشغيل المناسب لجهازك</p>
        </div>

        <!-- Store Buttons -->
        <div class="space-y-4">
          <!-- Google Play Button -->
          <button (click)="openStore('android')"
                  class="w-full flex items-center gap-4 bg-cyber-surface hover:bg-cyber-card p-4 rounded-lg transition-colors group">
            <img [src]="storeConfig.android.badge"
                 [alt]="storeConfig.android.altText"
                 class="h-12 transition-transform group-hover:scale-105">
            <span class="text-cyber-text-primary">متجر جوجل بلاي</span>
          </button>

          <!-- App Store Button -->
          <button (click)="openStore('ios')"
                  class="w-full flex items-center gap-4 bg-cyber-surface hover:bg-cyber-card p-4 rounded-lg transition-colors group">
            <img [src]="storeConfig.ios.badge"
                 [alt]="storeConfig.ios.altText"
                 class="h-12 transition-transform group-hover:scale-105">
            <span class="text-cyber-text-primary">متجر آبل</span>
          </button>
        </div>

        <!-- Close Button -->
        <button (click)="close()"
                class="mt-6 w-full py-2 border border-cyber-border rounded-lg text-cyber-text-secondary hover:text-cyber-text-primary hover:border-cyber-accent-primary transition-colors">
          إغلاق
        </button>
      </div>
    </div>
  `,
  styles: [`
    @media (prefers-reduced-motion: reduce) {
      .transition-colors,
      .transition-transform {
        transition: none;
      }
    }
  `],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('200ms ease-out', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ opacity: 0 }))
      ])
    ]),
    trigger('slideIn', [
      transition(':enter', [
        style({ transform: 'translateY(-20px)', opacity: 0 }),
        animate('200ms ease-out', style({ transform: 'translateY(0)', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ transform: 'translateY(-20px)', opacity: 0 }))
      ])
    ])
  ]
})
export class DownloadAppDialogComponent implements OnInit {
  @Output() closed = new EventEmitter<void>();
  storeConfig = StoreConfig;
  isAppUser = false;

  constructor(private platformDetection: PlatformDetectionService) {}

  ngOnInit(): void {
    this.platformDetection.isAppUser$.subscribe(
      isApp => this.isAppUser = isApp
    );
  }

  openStore(platform: 'android' | 'ios'): void {
    window.open(this.storeConfig[platform].url, '_blank');
  }

  close(): void {
    this.closed.emit();
  }
}