import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlatformDetectionService {
  private isAppUser = new BehaviorSubject<boolean>(false);
  isAppUser$ = this.isAppUser.asObservable();

  constructor(private platform: Platform) {
    this.detectPlatform();
  }

  private detectPlatform(): void {
    // Check if running in Capacitor/Cordova (native app)
    const isApp = this.platform.is('capacitor') || this.platform.is('cordova');
    this.isAppUser.next(isApp);
  }

  isRunningInApp(): boolean {
    return this.isAppUser.getValue();
  }
}