import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private darkMode = new BehaviorSubject<boolean>(this.getInitialDarkMode());
  darkMode$ = this.darkMode.asObservable();

  constructor() {
    // Apply initial dark mode class
    if (this.darkMode.value) {
      document.documentElement.classList.add('dark');
    }

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      if (localStorage.getItem('darkMode') === null) {
        this.setDarkMode(e.matches);
      }
    });
  }

  private getInitialDarkMode(): boolean {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode !== null) {
      return JSON.parse(savedMode);
    }
    return true; // Default to dark mode
  }

  isDarkMode(): boolean {
    return this.darkMode.value;
  }

  toggleDarkMode(): void {
    this.setDarkMode(!this.darkMode.value);
  }

  private setDarkMode(isDark: boolean): void {
    localStorage.setItem('darkMode', JSON.stringify(isDark));
    this.darkMode.next(isDark);
    
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
}