import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomePage } from './features/home/pages/home.page';
import { ProductDetailsComponent } from './features/products/pages/product-details/product-details.component';
import { CategoriesPage } from './features/categories/pages/categories.page';
import { CartPage } from './features/cart/pages/cart.page';
import { PaymentPage } from './features/payment/pages/payment.page';
import { AboutPage } from './features/about/pages/about.page';

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
    component: PaymentPage,
    title: 'إتمام الطلب'
  },
  {
    path: 'about',
    component: AboutPage,
    title: 'عن كيوب كارد'
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