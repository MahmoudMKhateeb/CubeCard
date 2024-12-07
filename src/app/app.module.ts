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
import { FooterComponent } from './core/components/footer/footer.component';
import { NavigationComponent } from './core/components/navigation/navigation.component';
import { BannerComponent } from './features/home/components/banner/banner.component';
import { CategoryGridComponent } from './features/categories/components/category-grid/category-grid.component';
import { CategoryCardComponent } from './features/categories/components/category-card/category-card.component';
import { ProductGridComponent } from './features/products/components/product-grid/product-grid.component';
import { ProductCardComponent } from './features/products/components/product-card/product-card.component';
import { SearchBoxComponent } from './features/search/components/search-box/search-box.component';

// Pages
import { HomePage } from './features/home/pages/home.page';
import { ProductDetailsComponent } from './features/products/pages/product-details/product-details.component';
import { CategoriesPage } from './features/categories/pages/categories.page';
import { CartPage } from './features/cart/pages/cart.page';
import { PaymentComponent } from './features/payment/pages/payment.component';
import { AboutPage } from './features/about/pages/about.page';
import { OrderSuccessPage } from './features/order/pages/order-success/order-success.page';
import { OrderFailedPage } from './features/order/pages/order-failed/order-failed.page';
import { OtpDialogComponent } from './features/order/components/otp-dialog/otp-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    BannerComponent,
    CategoryGridComponent,
    CategoryCardComponent,
    ProductGridComponent,
    ProductCardComponent,
    HomePage,
    ProductDetailsComponent,
    CategoriesPage,
    CartPage,
    PaymentComponent,
    AboutPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    AppRoutingModule,
    CommonModule,
    NavigationComponent,
    SearchBoxComponent,
    OrderSuccessPage,
    OrderFailedPage,
    OtpDialogComponent
  ],
  providers: [NgEventBus],
  bootstrap: [AppComponent]
})
export class AppModule { }