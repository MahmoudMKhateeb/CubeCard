import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-otp-timer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span class="text-sm" [class.text-red-500]="timeRemaining <= 30">
      {{ formatTime(timeRemaining) }}
    </span>
  `
})
export class OtpTimerComponent implements OnInit, OnDestroy {
  @Input() duration = 300; // 5 minutes in seconds
  @Output() expired = new EventEmitter<void>();
  
  timeRemaining = 0;
  private interval?: number;

  ngOnInit(): void {
    this.startTimer();
  }

  ngOnDestroy(): void {
    this.stopTimer();
  }

  private startTimer(): void {
    this.timeRemaining = this.duration;
    this.interval = window.setInterval(() => {
      this.timeRemaining--;
      if (this.timeRemaining <= 0) {
        this.expired.emit();
        this.stopTimer();
      }
    }, 1000);
  }

  private stopTimer(): void {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  private formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }
}