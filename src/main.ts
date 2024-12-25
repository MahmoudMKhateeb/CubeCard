import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/core/components/app/app.component';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { routes } from './app/app.routes';
import { authInterceptor } from './app/core/interceptors/auth.interceptor';
import { ngrokInterceptor } from './app/core/interceptors/ngrok.interceptor';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([authInterceptor, ngrokInterceptor])
    ),
    importProvidersFrom(
      IonicModule.forRoot({
        mode: 'ios',
        backButtonText: ''
      })
    )
  ]
}).catch(err => console.error(err));