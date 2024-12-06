import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { UserManagementComponent } from '../app/admin/user-management.component';
import { AuthGuard } from './authGuard/AuthGuard.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'admin',
    component: UserManagementComponent,
    canActivate: [AuthGuard], // Protege esta ruta
  },
  { path: '**', redirectTo: '/login' }, // Ruta para manejar páginas no encontradas
];