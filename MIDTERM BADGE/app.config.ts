import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    // ⭐ CRITICAL: This enables HTTP requests!
    // Without this line, all HTTP calls will fail silently
    provideHttpClient(withFetch())
  ]
};
