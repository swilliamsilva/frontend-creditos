import 'zone.js';
import { bootstrapApplication } from '@angular/platform-browser';
import { 
  provideHttpClient, 
  withInterceptorsFromDi,
  HTTP_INTERCEPTORS 
} from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { ErrorInterceptor } from './app/core/interceptors/error.interceptor';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }
  ]
}).catch(err => console.error(err));