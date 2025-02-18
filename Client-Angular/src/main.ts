import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes'; // 👈 Importa las rutas
import { importProvidersFrom } from '@angular/core';
import { FormsModule } from '@angular/forms';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withFetch()),
    provideRouter(routes), // 👈 Usa las rutas definidas en `app.routes.ts`
    importProvidersFrom(FormsModule) // 👈 Importa FormsModule correctamente
  ]
})
  .catch(err => console.error(err));
