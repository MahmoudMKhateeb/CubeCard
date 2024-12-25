import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-otp-digit-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <input
      #inputRef
      type="text"
      [value]="value"
      (input)="onInput($event)"
      (keydown)="onKeyDown($event)"
      (paste)="onPaste($event)"
      maxlength="1"
      class="w-12 h-12 text-center text-xl rounded-lg border focus:outline-none focus:ring-2 
             bg-cyber-surface border-cyber-border text-cyber-text-primary
             focus:ring-cyber-accent-primary"
      [class.border-red-500]="error"
      [attr.aria-label]="'Digit ' + (position + 1)"
      autocomplete="off"
      inputmode="numeric"
      pattern="[0-9]*"
    >
  `
})
export class OtpDigitInputComponent {
  @ViewChild('inputRef') inputRef!: ElementRef<HTMLInputElement>;
  @Input() value = '';
  @Input() position = 0;
  @Input() error = false;
  @Output() digitChange = new EventEmitter<string>();
  @Output() navigate = new EventEmitter<'next' | 'prev'>();

  private lastInputTime = 0;
  private readonly DEBOUNCE_TIME = 10;

  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const currentTime = Date.now();
    
    if (currentTime - this.lastInputTime < this.DEBOUNCE_TIME) {
      return;
    }
    this.lastInputTime = currentTime;

    let value = input.value.replace(/\D/g, '');
    if (value.length > 0) {
      value = value[0];
      input.value = value;
      this.digitChange.emit(value);
      this.navigate.emit('next');
    } else {
      this.digitChange.emit('');
    }
  }

  onKeyDown(event: KeyboardEvent): void {
    const input = event.target as HTMLInputElement;

    switch (event.key) {
      case 'Backspace':
        if (input.value) {
          input.value = '';
          this.digitChange.emit('');
        } else {
          this.navigate.emit('prev');
        }
        event.preventDefault();
        break;

      case 'ArrowLeft':
        this.navigate.emit('prev');
        event.preventDefault();
        break;

      case 'ArrowRight':
        this.navigate.emit('next');
        event.preventDefault();
        break;

      case 'Tab':
        // Allow default tab behavior
        break;

      default:
        if (!/^\d$/.test(event.key) && !event.ctrlKey && !event.metaKey) {
          event.preventDefault();
        }
        break;
    }
  }

  onPaste(event: ClipboardEvent): void {
    event.preventDefault();
    const pastedData = event.clipboardData?.getData('text');
    if (pastedData && /^\d+$/.test(pastedData)) {
      const digit = pastedData[0];
      this.inputRef.nativeElement.value = digit;
      this.digitChange.emit(digit);
      this.navigate.emit('next');
    }
  }

  focus(): void {
    this.inputRef.nativeElement.focus();
  }

  clear(): void {
    this.inputRef.nativeElement.value = '';
    this.digitChange.emit('');
  }
}