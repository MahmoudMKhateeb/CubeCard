import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SearchBoxComponent } from '../search/components/search-box/search-box.component';
import { CartIconComponent } from './components/cart-icon/cart-icon.component';
import { DownloadAppDialogComponent } from '../shared/components/download-app-dialog/download-app-dialog.component';
import { AuthIndicatorComponent } from '../auth/components/auth-indicator/auth-indicator.component';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    SearchBoxComponent,
    CartIconComponent,
    DownloadAppDialogComponent,
    AuthIndicatorComponent
  ]
})
export class NavigationComponent {
  isMobileMenuOpen = false;
  showDownloadDialog = false;

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  openDownloadDialog(): void {
    this.showDownloadDialog = true;
  }

  closeDownloadDialog(): void {
    this.showDownloadDialog = false;
  }
}