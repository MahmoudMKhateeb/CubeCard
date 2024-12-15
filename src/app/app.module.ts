import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { NgEventBus } from "ng-event-bus";
import { IonicModule } from '@ionic/angular';

// Components
import { AppComponent } from './core/components/app/app.component';
import { NavigationComponent } from './core/components/navigation/navigation.component';
import { SearchBoxComponent } from './core/components/search/components/search-box/search-box.component';
import { BannerComponent } from './core/components/home/components/banner/banner.component';
import { CategoryGridComponent } from './core/components/categories/components/category-grid/category-grid.component';
import { ProductGridComponent } from './core/components/products/components/product-grid/product-grid.component';
import { FooterComponent } from './core/components/footer/footer.component';
import { ProductDetailsComponent } from './core/components/products/pages/product-details/product-details.component';
import { MobileDownloadButtonComponent } from './core/components/shared/components/mobile-download-button/mobile-download-button.component';

// Pages
import { HomePage } from './core/components/home/pages/home.page';
import { CategoriesPage } from './core/components/categories/pages/categories.page';
import { CartPage } from './core/components/cart/pages/cart.page';
import { AboutPage } from './core/components/about/pages/about.page';
import { OrderSuccessComponent } from './core/components/order/pages/order-success/order-success.component';
import { OrderFailedPage } from './core/components/order/pages/order-failed/order-failed.page';

@NgModule({
  declarations: [
    AppComponent,
    BannerComponent,
    HomePage,
    CategoriesPage,
    CartPage,
    AboutPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    AppRoutingModule,
    CommonModule,
    IonicModule.forRoot(),
    // Standalone Components
    NavigationComponent,
    SearchBoxComponent,
    OrderSuccessComponent,
    OrderFailedPage,
    ProductGridComponent,
    CategoryGridComponent,
    FooterComponent,
    ProductDetailsComponent,
    MobileDownloadButtonComponent
  ],
  providers: [NgEventBus],
  bootstrap: [AppComponent]
})
export class AppModule { }