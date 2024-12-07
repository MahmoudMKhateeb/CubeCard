import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomePage } from './features/home/pages/home.page';
import { ProductDetailsComponent } from './features/products/pages/product-details/product-details.component';
import { CategoriesPage } from './features/categories/pages/categories.page';
import { CartPage } from './features/cart/pages/cart.page';
import { PaymentComponent } from './features/payment/pages/payment.component';
import { AboutPage } from './features/about/pages/about.page';
import { OrderSuccessPage } from './features/order/pages/order-success/order-success.page';
import { OrderFailedPage } from './features/order/pages/order-failed/order-failed.page';

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
    component: OrderSuccessPage,
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