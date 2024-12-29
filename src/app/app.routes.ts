import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./core/components/home/pages/home.page').then(m => m.HomePage),
    title: 'الرئيسية'
  },
  {
    path: 'cart',
    loadComponent: () => import('./core/components/cart/pages/cart.page').then(m => m.CartPage),
    title: 'سلة المشتريات'
  },
  {
    path: 'categories',
    loadComponent: () => import('./core/components/categories/pages/categories.page').then(m => m.CategoriesPage),
    title: 'التصنيفات'
  },
  {
    path: 'product/:id',
    loadComponent: () => import('./core/components/products/pages/product-details/product-details.component').then(m => m.ProductDetailsComponent),
    title: 'تفاصيل المنتج'
  },
  {
    path: 'payment',
    loadComponent: () => import('./core/components/payment/pages/payment.component').then(m => m.PaymentComponent),
    title: 'إتمام الطلب'
  },
  {
    path: 'about',
    loadComponent: () => import('./core/components/about/pages/about.page').then(m => m.AboutPage),
    title: 'عن كيوب كارد'
  },
  {
    path: 'login',
    loadComponent: () => import('./core/components/auth/pages/login/login.component').then(m => m.LoginComponent),
    title: 'تسجيل الدخول'
  },
  {
    path: 'register',
    loadComponent: () => import('./core/components/auth/pages/register/register.component').then(m => m.RegisterComponent),
    title: 'إنشاء حساب'
  },
  {
    path: 'profile',
    loadComponent: () => import('./core/components/profile/pages/profile.page').then(m => m.ProfilePage),
    canActivate: [AuthGuard],
    title: 'الملف الشخصي'
  },
  {
    path: 'orders',
    loadComponent: () => import('./core/components/orders/pages/orders.page').then(m => m.OrdersPage),
    canActivate: [AuthGuard],
    title: 'طلباتي'
  },
  {
    path: 'orders/:uuid',
    loadComponent: () => import('./core/components/orders/pages/order-details/order-details.page').then(m => m.OrderDetailsPage),
    canActivate: [AuthGuard],
    title: 'تفاصيل الطلب'
  },
  {
    path: 'order/success/:id',
    loadComponent: () => import('./core/components/order/pages/order-success/order-success.component').then(m => m.OrderSuccessComponent),
    title: 'تم الطلب بنجاح'
  },
  {
    path: 'order/failed/:id',
    loadComponent: () => import('./core/components/order/pages/order-failed/order-failed.page').then(m => m.OrderFailedPage),
    title: 'فشل الطلب'
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];