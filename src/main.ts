import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/core/components/app/app.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { authInterceptor } from './app/core/interceptors/auth.interceptor';
import { importProvidersFrom } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { NgEventBus } from 'ng-event-bus';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(
      withInterceptors([authInterceptor])
    ),
    provideRouter(routes),
    importProvidersFrom(
      IonicModule.forRoot({
        mode: 'ios',
        backButtonText: ''
      })
    ),
    NgEventBus
  ]
}).catch(err => console.error(err));