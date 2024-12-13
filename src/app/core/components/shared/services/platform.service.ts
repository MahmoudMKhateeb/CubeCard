import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlatformService {
  private readonly userAgent = navigator.userAgent.toLowerCase();

  isAndroid(): boolean {
    return this.userAgent.includes('android');
  }

  isIOS(): boolean {
    return this.userAgent.includes('iphone') || this.userAgent.includes('ipad');
  }

  isMobile(): boolean {
    return this.isAndroid() || this.isIOS();
  }
}