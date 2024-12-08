import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-details-skeleton',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen bg-cyber-surface py-8">
      <div class="container-content">
        <!-- Breadcrumb Skeleton -->
        <div class="mb-8 flex gap-2">
          <div class="h-4 bg-cyber-card rounded w-20"></div>
          <div class="h-4 bg-cyber-card rounded w-24"></div>
        </div>

        <!-- Title Skeleton -->
        <div class="h-8 bg-cyber-card rounded w-64 mb-8"></div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Product Image Skeleton -->
          <div class="lg:col-span-1">
            <div class="bg-cyber-card rounded-lg p-6">
              <div class="aspect-square bg-cyber-surface rounded-lg"></div>
            </div>
          </div>

          <!-- Product Details Skeleton -->
          <div class="lg:col-span-2">
            <div class="bg-cyber-card rounded-lg p-6">
              <!-- Region Selection Skeleton -->
              <div class="flex gap-4 mb-8">
                <div *ngFor="let i of [1,2,3]" class="h-10 bg-cyber-surface rounded-lg w-24"></div>
              </div>

              <!-- Price Selection Skeleton -->
              <div class="mb-8">
                <div class="h-6 bg-cyber-surface rounded w-32 mb-4"></div>
                <div class="grid grid-cols-5 gap-3">
                  <div *ngFor="let i of [1,2,3,4,5]" class="h-10 bg-cyber-surface rounded-lg"></div>
                </div>
              </div>

              <!-- Quantity Selection Skeleton -->
              <div class="mb-8">
                <div class="h-4 bg-cyber-surface rounded w-48 mb-2"></div>
                <div class="h-10 bg-cyber-surface rounded-lg w-full"></div>
              </div>

              <!-- Action Buttons Skeleton -->
              <div class="flex gap-4">
                <div class="flex-1 h-12 bg-cyber-surface rounded-lg"></div>
                <div class="flex-1 h-12 bg-cyber-surface rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ProductDetailsSkeletonComponent {}