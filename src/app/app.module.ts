import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { NgEventBus } from "ng-event-bus";

// Components
import { AppComponent } from './core/components/app/app.component';
import { HeaderComponent } from './core/components/header/header.component';
import { BannerComponent } from './features/home/components/banner/banner.component';
import { CategoryCardComponent } from './features/categories/components/category-card/category-card.component';
import { ProductCardComponent } from './features/products/components/product-card/product-card.component';

// Pages
import { HomePage } from './features/home/pages/home.page';
import { CategoriesPage } from './features/categories/pages/categories.page';
import { CartPage } from './features/cart/pages/cart.page';
import { AboutPage } from './features/about/pages/about.page';

// Standalone Components
import { NavigationComponent } from './core/components/navigation/navigation.component';
import { SearchBoxComponent } from './features/search/components/search-box/search-box.component';
import { OrderSuccessPage } from './features/order/pages/order-success/order-success.page';
import { OrderFailedPage } from './features/order/pages/order-failed/order-failed.page';
import { OtpDialogComponent } from './features/order/components/otp-dialog/otp-dialog.component';
import { ProductGridComponent } from './features/products/components/product-grid/product-grid.component';
import { CategoryGridComponent } from './features/categories/components/category-grid/category-grid.component';
import { FooterComponent } from './core/components/footer/footer.component';
import { ProductDetailsComponent } from './features/products/pages/product-details/product-details.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BannerComponent,
    CategoryCardComponent,
    ProductCardComponent,
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
    // Standalone Components
    NavigationComponent,
    SearchBoxComponent,
    OrderSuccessPage,
    OrderFailedPage,
    OtpDialogComponent,
    ProductGridComponent,
    CategoryGridComponent,
    FooterComponent,
    ProductDetailsComponent
  ],
  providers: [NgEventBus],
  bootstrap: [AppComponent]
})
export class AppModule { }