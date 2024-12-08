import { Component } from '@angular/core';

@Component({
  selector: 'app-footer-contact',
  standalone: true,
  template: `
    <div class="text-center md:text-right">
      <h3 class="text-lg font-semibold text-cyber-text-primary mb-4">تواصل معنا</h3>
      <div class="flex flex-col gap-3">
        <a href="mailto:support@cubecard.com" 
           class="text-cyber-text-secondary hover:text-cyber-accent-primary transition-colors">
          support&#64;cubecard.com
        </a>
        <a href="tel:+966500000000" 
           class="text-cyber-text-secondary hover:text-cyber-accent-primary transition-colors">
          +966 50 000 0000
        </a>
        <div class="text-cyber-text-secondary">
          الرياض، المملكة العربية السعودية
        </div>
      </div>
    </div>
  `
})
export class FooterContactComponent {}