import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../app/services/user.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

// Importar módulos de Angular Material
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss'],
  imports: [
    FormsModule,
    HttpClientModule,
    RouterModule,
    MatButtonModule, // Botones con Material Design
    MatFormFieldModule, // Campos de formulario
    MatInputModule,
    MatTableModule, 
    MatPaginatorModule,
    MatIconModule,
    ReactiveFormsModule // Entradas de texto
  ]
})
export class UserManagementComponent implements OnInit {
  users: any[] = [];
  displayedColumns: string[] = ['id', 'nombre', 'email', 'acciones'];
  userFormGroup: FormGroup;
  editingUser: any = null;

  constructor(
    private userService: UserService,
    private dialog: MatDialog,
    private fb: FormBuilder
  ) {
    this.userFormGroup = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      nombreUsuario: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe((data) => (this.users = data));
  }

  openUserForm(user: any = null) {
    this.editingUser = user;
    if (user) {
      this.userFormGroup.patchValue(user);
    } else {
      this.userFormGroup.reset();
    }
  }

  saveUser() {
    if (this.userFormGroup.valid) {
      const user = this.userFormGroup.value;
      if (this.editingUser) {
        this.userService.updateUser(this.editingUser.id, user).subscribe(() => this.loadUsers());
      } else {
        this.userService.createUser(user).subscribe(() => this.loadUsers());
      }
    }
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe(() => this.loadUsers());
  }

  editUser(user: any) {
    this.openUserForm(user); // Usa el mismo método que abre el formulario, pero pasa el usuario a editar.
  }
  
}