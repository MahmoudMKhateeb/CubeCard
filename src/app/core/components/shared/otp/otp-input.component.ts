import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-otp-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="flex flex-col items-center">
      <div class="flex gap-2">
        <input *ngFor="let i of [0,1,2,3,4,5]"
               type="text"
               maxlength="1"
               class="w-12 h-12 text-center border rounded-lg text-xl"
               [class.border-red-500]="error"
               [(ngModel)]="otpDigits[i]"
               (input)="onInput($event, i)"
               (keydown)="onKeyDown($event, i)"
               (paste)="onPaste($event)">
      </div>
      <p *ngIf="error" class="text-red-500 mt-2">{{error}}</p>
    </div>
  `
})
export class OtpInputComponent {
  @Input() error: string = '';
  @Output() otpComplete = new EventEmitter<string>();

  otpDigits: string[] = new Array(6).fill('');

  onInput(event: Event, index: number): void {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    if (value.length === 1 && index < 5) {
      const nextInput = input.nextElementSibling as HTMLInputElement;
      if (nextInput) nextInput.focus();
    }

    this.checkComplete();
  }

  onKeyDown(event: KeyboardEvent, index: number): void {
    if (event.key === 'Backspace' && !this.otpDigits[index] && index > 0) {
      const prevInput = (event.target as HTMLElement).previousElementSibling as HTMLInputElement;
      if (prevInput) prevInput.focus();
    }
  }

  onPaste(event: ClipboardEvent): void {
    event.preventDefault();
    const pastedData = event.clipboardData?.getData('text');
    if (pastedData && /^\d{6}$/.test(pastedData)) {
      this.otpDigits = pastedData.split('');
      this.checkComplete();
    }
  }

  private checkComplete(): void {
    const otp = this.otpDigits.join('');
    if (otp.length === 6) {
      this.otpComplete.emit(otp);
    }
  }
}