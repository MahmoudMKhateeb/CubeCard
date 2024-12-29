import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { formatTime } from '../utils/time.utils';

@Component({
  selector: 'app-otp-timer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex items-center gap-2 text-sm">
      <span [class.text-red-500]="remainingTime <= 30">
        {{ formatTime(remainingTime) }}
      </span>
      <button
        (click)="onResend()"
        [disabled]="!canResend || isLoading"
        class="text-cyber-accent-primary hover:text-cyber-hover-primary disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {{ isLoading ? 'جاري إعادة الإرسال...' : 'إعادة إرسال الرمز' }}
      </button>
    </div>
  `
})
export class OtpTimerComponent implements OnInit, OnDestroy {
  @Input() isLoading = false;
  @Output() resend = new EventEmitter<void>();

  remainingTime = 0;
  canResend = false;
  formatTime = formatTime;
  
  private interval?: number;
  private readonly TIMER_DURATION = 300; // 5 minutes in seconds

  ngOnInit(): void {
    this.startTimer();
  }

  ngOnDestroy(): void {
    this.stopTimer();
  }

  private startTimer(): void {
    this.remainingTime = this.TIMER_DURATION;
    this.canResend = false;
    
    this.interval = window.setInterval(() => {
      this.remainingTime--;
      if (this.remainingTime <= 0) {
        this.canResend = true;
        this.stopTimer();
      }
    }, 1000);
  }

  private stopTimer(): void {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  onResend(): void {
    if (this.canResend && !this.isLoading) {
      this.resend.emit();
      this.startTimer();
    }
  }
}