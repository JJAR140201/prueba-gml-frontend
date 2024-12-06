import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';

// Importar módulos de Angular Material
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; 
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(), // Esto asegura que HttpClient está disponible
    provideRouter(routes),
    importProvidersFrom(
      HttpClientModule, // Asegúrate de incluir HttpClientModule aquí
      MatButtonModule,
      MatFormFieldModule,
      MatInputModule,
      MatCardModule
    ),
  ],
}).catch((err) => console.error(err));