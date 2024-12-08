import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-error-message',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-red-500 bg-opacity-10 text-red-500 p-4 rounded-lg text-center">
      <svg xmlns="http://www.w3.org/2000/svg" 
           class="h-6 w-6 mx-auto mb-2" 
           fill="none" 
           viewBox="0 0 24 24" 
           stroke="currentColor">
        <path stroke-linecap="round" 
              stroke-linejoin="round" 
              stroke-width="2" 
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <p class="text-sm">{{ message }}</p>
    </div>
  `
})
export class ErrorMessageComponent {
  @Input() message = 'حدث خطأ. يرجى المحاولة مرة أخرى.';
}