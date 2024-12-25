import { Component, ElementRef, EventEmitter, Input, Output, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-otp-input',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex flex-col items-center">
      <div class="flex gap-2 ltr" dir="ltr">
        <input #otpInput
               type="tel"
               inputmode="numeric"
               maxlength="1"
               (input)="onInput($event, 0)"
               (keydown)="onKeyDown($event, 0)"
               (paste)="onPaste($event)"
               class="otp-input"
               [class.error]="error">
        <input #otpInput
               type="tel"
               inputmode="numeric"
               maxlength="1"
               (input)="onInput($event, 1)"
               (keydown)="onKeyDown($event, 1)"
               (paste)="onPaste($event)"
               class="otp-input"
               [class.error]="error">
        <input #otpInput
               type="tel"
               inputmode="numeric"
               maxlength="1"
               (input)="onInput($event, 2)"
               (keydown)="onKeyDown($event, 2)"
               (paste)="onPaste($event)"
               class="otp-input"
               [class.error]="error">
        <input #otpInput
               type="tel"
               inputmode="numeric"
               maxlength="1"
               (input)="onInput($event, 3)"
               (keydown)="onKeyDown($event, 3)"
               (paste)="onPaste($event)"
               class="otp-input"
               [class.error]="error">
        <input #otpInput
               type="tel"
               inputmode="numeric"
               maxlength="1"
               (input)="onInput($event, 4)"
               (keydown)="onKeyDown($event, 4)"
               (paste)="onPaste($event)"
               class="otp-input"
               [class.error]="error">
        <input #otpInput
               type="tel"
               inputmode="numeric"
               maxlength="1"
               (input)="onInput($event, 5)"
               (keydown)="onKeyDown($event, 5)"
               (paste)="onPaste($event)"
               class="otp-input"
               [class.error]="error">
      </div>
      <p *ngIf="error" class="text-red-500 text-sm mt-2">{{error}}</p>
    </div>
  `,
  styles: [`
    .ltr {
      direction: ltr;
    }
    .otp-input {
      width: 3rem;
      height: 3rem;
      text-align: center;
      font-size: 1.25rem;
      background-color: rgb(26, 32, 35);
      border: 1px solid rgb(51, 67, 94);
      border-radius: 0.5rem;
      color: rgb(229, 231, 235);
      caret-color: rgb(40, 161, 125);
    }
    .otp-input:focus {
      outline: none;
      border-color: rgb(40, 161, 125);
      box-shadow: 0 0 0 1px rgb(40, 161, 125);
    }
    .otp-input.error {
      border-color: #ef4444;
    }
    /* Hide number input spinners */
    .otp-input::-webkit-outer-spin-button,
    .otp-input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    .otp-input[type=number] {
      -moz-appearance: textfield;
    }
  `]
})
export class OtpInputComponent implements AfterViewInit {
  @Input() error: string = '';
  @Output() otpComplete = new EventEmitter<string>();
  
  @ViewChildren('otpInput') otpInputs!: QueryList<ElementRef<HTMLInputElement>>;
  private digits: string[] = ['', '', '', '', '', ''];

  ngAfterViewInit(): void {
    setTimeout(() => this.focusInput(0));
  }

  onInput(event: Event, index: number): void {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/[^0-9]/g, '');

    if (value.length > 0) {
      value = value[0];
      this.digits[index] = value;
      input.value = value;

      if (index < 5) {
        this.focusInput(index + 1);
      }
    } else {
      this.digits[index] = '';
      input.value = '';
    }

    this.checkComplete();
  }

  onKeyDown(event: KeyboardEvent, index: number): void {
    const input = event.target as HTMLInputElement;
    
    if (event.key === 'Backspace') {
      if (!input.value && index > 0) {
        event.preventDefault();
        this.focusInput(index - 1);
        this.digits[index - 1] = '';
        this.getInput(index - 1).value = '';
      }
    } else if (event.key === 'ArrowLeft' && index > 0) {
      event.preventDefault();
      this.focusInput(index - 1);
    } else if (event.key === 'ArrowRight' && index < 5) {
      event.preventDefault();
      this.focusInput(index + 1);
    }
  }

  onPaste(event: ClipboardEvent): void {
    event.preventDefault();
    const pastedText = event.clipboardData?.getData('text') || '';
    const numbers = pastedText.replace(/[^0-9]/g, '').split('').slice(0, 6);
    
    numbers.forEach((num, index) => {
      if (index < 6) {
        this.digits[index] = num;
        const input = this.getInput(index);
        if (input) {
          input.value = num;
        }
      }
    });

    if (numbers.length > 0) {
      this.focusInput(Math.min(5, numbers.length));
    }

    this.checkComplete();
  }

  private checkComplete(): void {
    if (this.digits.every(digit => digit !== '')) {
      this.otpComplete.emit(this.digits.join(''));
    }
  }

  clear(): void {
    this.digits = ['', '', '', '', '', ''];
    const inputs = this.otpInputs.toArray();
    inputs.forEach(input => input.nativeElement.value = '');
    this.focusInput(0);
  }

  private focusInput(index: number): void {
    const inputs = this.otpInputs.toArray();
    if (inputs[index]) {
      inputs[index].nativeElement.focus();
    }
  }

  private getInput(index: number): HTMLInputElement {
    return this.otpInputs.toArray()[index].nativeElement;
  }
}