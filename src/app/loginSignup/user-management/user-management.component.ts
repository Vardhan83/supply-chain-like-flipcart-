
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { HttpClient } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [
   MatFormFieldModule,
   MatSelectModule,
   FormsModule,
   CommonModule
  ],
  templateUrl: './user-management.component.html',
})
export class UserManagementComponent implements OnInit{
  selectedRole = 'USER';
  selectedUsername = '';
  users: any[] = [];
  constructor(public authService: AuthService, private http: HttpClient) {}
  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.authService.getAllUsers().subscribe({
      next: (data) => (this.users= data),
      error: (err) => alert('Failed to load users: ' + err.message)
    });
  }


  updateUserRole() {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser?.role !== 'ADMIN') {
      alert('Access denied. Only admin can update roles.');
      return;
    }

    const roleup = {
      username: this.selectedUsername,
      newRole: this.selectedRole
    };
    this.authService.updateRole(roleup).subscribe({
      next:()=>
        alert('successfully updated the role'),
      error:(err)=>alert('Error: ' + err.error)
    });
    this.selectedUsername="";
  }
}
