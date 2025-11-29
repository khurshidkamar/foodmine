import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { loadingInterceptor } from './shared/interceptors/loading.interceptor';
import { authInterceptor } from './auth/guards/auth.interceptor'


export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),
  provideHttpClient(withInterceptors([loadingInterceptor, authInterceptor])), provideAnimations(),
  provideToastr({
    timeOut: 3000,
    positionClass: 'toast-bottom-right',
    newestOnTop: false
  })]
};
