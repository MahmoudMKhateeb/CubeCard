import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { NavigationComponent } from '../navigation/navigation.component';
import { BannerComponent } from '../home/components/banner/banner.component';
import { CategoryGridComponent } from '../categories/components/category-grid/category-grid.component';
import { FooterComponent } from '../footer/footer.component';
import { MobileDownloadButtonComponent } from '../shared/components/mobile-download-button/mobile-download-button.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    IonicModule,
    NavigationComponent,
    BannerComponent,
    CategoryGridComponent,
    FooterComponent,
    MobileDownloadButtonComponent
  ]
})
export class AppComponent {
  constructor() {}

  get isHomePage(): boolean {
    return window.location.pathname === '/';
  }
}