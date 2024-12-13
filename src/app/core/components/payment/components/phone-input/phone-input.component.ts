import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PhoneVerificationService } from '../../services/phone-verification.service';

@Component({
  selector: 'app-phone-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div>
      <label class="block text-sm font-medium text-cyber-text-primary mb-1">
        رقم الجوال
        <span class="text-red-500">*</span>
      </label>
      <div class="flex">
        <!-- Verify Button -->
        <button 
          (click)="onVerifyClick()"
          [class]="'rounded-r-lg border px-4 py-2 bg-cyber-accent-primary text-white hover:bg-cyber-hover-primary transition-colors ' + (error ? 'border-red-500' : 'border-cyber-border')"
          [class.opacity-50]="!showVerifyButton"
          [disabled]="!showVerifyButton">
          تحقق
        </button>

        <!-- Phone Input -->
        <input
          type="tel"
          [ngModel]="value"
          (ngModelChange)="onInputChange($event)"
          (blur)="onBlur()"
          placeholder="5xxxxxxxx"
          [attr.minlength]="getMinLength()"
          [attr.maxlength]="getMaxLength()"
          [class]="'flex-1 border-y px-4 py-2 bg-cyber-surface text-cyber-text-primary focus:outline-none focus:ring-2 focus:ring-cyber-accent-primary ' + getBorderClass()"
        >

        <!-- Country Code -->
        <input 
          type="text" 
          value="+966" 
          disabled
          [class]="'rounded-l-lg border w-20 px-4 py-2 bg-cyber-surface text-cyber-text-primary flex items-center justify-center cursor-not-allowed opacity-75 ' + getBorderClass()"
        >
      </div>

      <!-- Error Message -->
      <span *ngIf="error" class="text-red-500 text-sm mt-1 block">
        {{error}}
      </span>

      <!-- Verification Status -->
      <div class="mt-1 flex items-center gap-1" [class.hidden]="!touched || error">
        <ng-container *ngIf="isVerified; else unverified">
          <svg xmlns="http://www.w3.org/2000/svg" 
               class="h-4 w-4 text-green-500" 
               viewBox="0 0 20 20" 
               fill="currentColor">
            <path fill-rule="evenodd" 
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" 
                  clip-rule="evenodd" />
          </svg>
          <span class="text-green-500 text-sm">تم التحقق من رقم الجوال</span>
        </ng-container>
        <ng-template #unverified>
          <svg xmlns="http://www.w3.org/2000/svg" 
               class="h-4 w-4 text-yellow-500" 
               viewBox="0 0 20 20" 
               fill="currentColor">
            <path fill-rule="evenodd" 
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" 
                  clip-rule="evenodd" />
          </svg>
          <span class="text-yellow-500 text-sm">يجب التحقق من رقم الجوال</span>
        </ng-template>
      </div>
    </div>
  `
})
export class PhoneInputComponent {
  @Input() value: string = '';
  @Input() error: string | null = null;
  @Input() touched: boolean = false;
  @Input() isVerified: boolean = false;

  @Output() valueChange = new EventEmitter<string>();
  @Output() blur = new EventEmitter<void>();
  @Output() verify = new EventEmitter<void>();

  get showVerifyButton(): boolean {
    return this.touched && !this.error && !this.isVerified && 
           this.value.length === this.getMaxLength();
  }

  getBorderClass(): string {
    if (!this.touched) return 'border-cyber-border';
    if (this.error) return 'border-red-500';
    if (this.isVerified) return 'border-green-500';
    return 'border-yellow-500';
  }

  getMinLength(): number {
    return this.value.startsWith('0') ? 10 : 9;
  }

  getMaxLength(): number {
    return this.value.startsWith('0') ? 10 : 9;
  }

  onInputChange(value: string): void {
    let cleanValue = value.replace(/\D/g, '');
    
    if (cleanValue.startsWith('0')) {
      cleanValue = cleanValue.slice(0, 10);
    } else if (cleanValue.startsWith('5')) {
      cleanValue = cleanValue.slice(0, 9);
    }
    
    this.valueChange.emit(cleanValue);
  }

  onBlur(): void {
    this.blur.emit();
  }

  onVerifyClick(): void {
    this.verify.emit();
  }
}