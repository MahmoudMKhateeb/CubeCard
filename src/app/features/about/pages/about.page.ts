import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  template: `
    <div class="min-h-screen bg-cyber-surface py-8">
      <div class="container-content">
        <!-- Breadcrumb -->
        <nav class="mb-8" aria-label="Breadcrumb">
          <ol class="flex items-center space-x-4">
            <li>
              <a routerLink="/" class="text-cyber-text-secondary hover:text-cyber-accent-primary">الرئيسية</a>
            </li>
            <li>
              <span class="mx-2 text-cyber-border">/</span>
              <span class="text-cyber-text-primary">عن كيوب كارد</span>
            </li>
          </ol>
        </nav>

        <!-- About Content -->
        <div class="bg-cyber-card rounded-lg shadow-card p-8">
          <!-- Logo and Title -->
          <div class="text-center mb-12">
            <img src="/assets/images/logo.png" alt="Cubecard" class="h-24 mx-auto mb-6">
            <h1 class="text-3xl font-bold text-cyber-text-primary mb-4">كيوب كارد</h1>
            <p class="text-xl text-cyber-text-secondary">منصتك الموثوقة لبطاقات الألعاب والخدمات الرقمية</p>
          </div>

          <!-- Main Content -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
            <!-- About Us Section -->
            <div>
              <h2 class="text-2xl font-bold text-cyber-accent-primary mb-6">من نحن</h2>
              <div class="space-y-4 text-cyber-text-primary">
                <p>
                  كيوب كارد هي منصة رائدة في مجال توفير البطاقات الرقمية وحلول الدفع الإلكتروني في المملكة العربية السعودية والشرق الأوسط.
                </p>
                <p>
                  نقدم مجموعة واسعة من الخدمات الرقمية التي تشمل بطاقات الألعاب، بطاقات التسوق، بطاقات الاتصالات، والمزيد من الخدمات الرقمية.
                </p>
              </div>
            </div>

            <!-- Our Values Section -->
            <div>
              <h2 class="text-2xl font-bold text-cyber-accent-primary mb-6">قيمنا</h2>
              <div class="space-y-6">
                <div class="flex items-start gap-4">
                  <div class="w-12 h-12 rounded-lg bg-cyber-accent-primary bg-opacity-10 flex items-center justify-center flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-cyber-accent-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <h3 class="text-lg font-semibold text-cyber-text-primary mb-2">الأمان والموثوقية</h3>
                    <p class="text-cyber-text-secondary">نضمن أعلى معايير الأمان في جميع معاملاتنا وخدماتنا</p>
                  </div>
                </div>

                <div class="flex items-start gap-4">
                  <div class="w-12 h-12 rounded-lg bg-cyber-accent-primary bg-opacity-10 flex items-center justify-center flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-cyber-accent-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h3 class="text-lg font-semibold text-cyber-text-primary mb-2">سرعة التنفيذ</h3>
                    <p class="text-cyber-text-secondary">نوفر خدمة فورية وسريعة لجميع طلباتكم</p>
                  </div>
                </div>

                <div class="flex items-start gap-4">
                  <div class="w-12 h-12 rounded-lg bg-cyber-accent-primary bg-opacity-10 flex items-center justify-center flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-cyber-accent-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 class="text-lg font-semibold text-cyber-text-primary mb-2">دعم متواصل</h3>
                    <p class="text-cyber-text-secondary">فريق دعم فني متخصص متواجد على مدار الساعة</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class AboutPage {}
