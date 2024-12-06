import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card'; // Opcional para envolver el formulario

import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-register',
  imports: [
    FormsModule,
    HttpClientModule,
    RouterModule,
    MatButtonModule, // Botones
    MatFormFieldModule, // Campos de formulario
    MatInputModule, // Entradas de texto
    MatCardModule, // Tarjetas (opcional)
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'], // Si tienes un archivo de estilos
})
export class RegisterComponent {
  nombre = '';
  nombreUsuario = '';
  emails = '';
  password = '';
  roles = ['CONSULTA_USUARIO', 'ACTUALIZA_USUARIO'];

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/admin']); // Redirige al admin si ya está autenticado
    }
  }

  register() {
    this.authService
      .register({
        nombre: this.nombre,
        nombreUsuario: this.nombreUsuario,
        emails: this.emails,
        password: this.password,
        roles: this.roles,
      })
      .subscribe({
        next: (response) => {
          console.log('Registro exitoso', response);
          this.router.navigate(['/login']); // Redirige al login
        },
        error: (err) => console.error('Error en registro', err),
      });
  }
}