import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StoreConfig } from '../config/store-config';
import { PlatformService } from './platform.service';

@Injectable({
  providedIn: 'root'
})
export class DownloadService {
  private showDialogSubject = new BehaviorSubject<boolean>(false);
  showDialog$ = this.showDialogSubject.asObservable();

  constructor(private platformService: PlatformService) {}

  initiateDownload(): void {
    if (this.platformService.isAndroid()) {
      window.location.href = StoreConfig.android.url;
    } else if (this.platformService.isIOS()) {
      window.location.href = StoreConfig.ios.url;
    } else {
      this.showDialog();
    }
  }

  showDialog(): void {
    this.showDialogSubject.next(true);
  }

  hideDialog(): void {
    this.showDialogSubject.next(false);
  }
}