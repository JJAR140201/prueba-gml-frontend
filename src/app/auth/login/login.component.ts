import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

// Importar módulos de Angular Material
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [
    FormsModule,
    HttpClientModule,
    RouterModule,
    MatButtonModule, // Botones con Material Design
    MatFormFieldModule, // Campos de formulario
    MatInputModule, // Entradas de texto
  ],
  templateUrl: '../login/login.component.html',
  styleUrls: ['../login/login.component.scss'], // Si tiene un archivo de estilos asociado
})
export class LoginComponent {
  nombreUsuario = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/admin']); // Redirige al admin si ya está autenticado
    }
  }

  login() {
    this.authService
      .login({ nombreUsuario: this.nombreUsuario, password: this.password })
      .subscribe({
        next: (response) => {
          console.log('Login exitoso', response);
          // Guardar token en localStorage (opcional)
          localStorage.setItem('token', response.token);
          this.router.navigate(['/admin']); // Cambia '/dashboard' a la ruta de tu pantalla principal
        },
        error: (err) => console.error('Error en login', err),
      });
  }
}