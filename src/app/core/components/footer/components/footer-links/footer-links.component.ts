import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer-links',
  standalone: true,
  imports: [RouterModule],
  template: `
    <div class="text-center md:text-right">
      <h3 class="text-lg font-semibold text-cyber-text-primary mb-4">روابط سريعة</h3>
      <div class="flex flex-col gap-3">
        <a routerLink="/contact" class="text-cyber-text-secondary hover:text-cyber-accent-primary transition-colors">
          تواصل معنا
        </a>
        <a routerLink="/returns" class="text-cyber-text-secondary hover:text-cyber-accent-primary transition-colors">
          سياسة الإرجاع
        </a>
        <a routerLink="/terms" class="text-cyber-text-secondary hover:text-cyber-accent-primary transition-colors">
          اتفاقية الاستخدام
        </a>
        <a routerLink="/privacy" class="text-cyber-text-secondary hover:text-cyber-accent-primary transition-colors">
          سياسة الخصوصية
        </a>
      </div>
    </div>
  `
})
export class FooterLinksComponent {}