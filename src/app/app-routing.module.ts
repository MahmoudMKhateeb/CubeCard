import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomePage } from './core/components/home/pages/home.page';
import { ProductDetailsComponent } from './core/components/products/pages/product-details/product-details.component';
import { CategoriesPage } from './core/components/categories/pages/categories.page';
import { CartPage } from './core/components/cart/pages/cart.page';
import { PaymentComponent } from './core/components/payment/pages/payment.component';
import { AboutPage } from './core/components/about/pages/about.page';
import { OrderSuccessComponent } from './core/components/order/pages/order-success/order-success.component';
import { OrderFailedPage } from './core/components/order/pages/order-failed/order-failed.page';

const routes: Routes = [
  { 
    path: '', 
    component: HomePage,
    title: 'الرئيسية'
  },
  { 
    path: 'categories', 
    component: CategoriesPage,
    title: 'التصنيفات'
  },
  { 
    path: 'product/:id', 
    component: ProductDetailsComponent,
    title: 'تفاصيل المنتج'
  },
  {
    path: 'cart',
    component: CartPage,
    title: 'سلة المشتريات'
  },
  {
    path: 'payment',
    component: PaymentComponent,
    title: 'إتمام الطلب'
  },
  {
    path: 'about',
    component: AboutPage,
    title: 'عن كيوب كارد'
  },
  {
    path: 'order/success/:id',
    component: OrderSuccessComponent,
    title: 'تم الطلب بنجاح'
  },
  {
    path: 'order/failed/:id',
    component: OrderFailedPage,
    title: 'فشل الطلب'
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }