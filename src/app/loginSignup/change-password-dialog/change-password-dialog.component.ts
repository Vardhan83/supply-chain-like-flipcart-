
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Component, Inject } from '@angular/core';
import { AuthService } from '../../auth.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-change-password-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './change-password-dialog.component.html',
  styleUrl: './change-password-dialog.component.scss'
})
export class ChangePasswordDialogComponent {
  hideOldPassword = true;
  hideNewPassword = true;
  errorMessage = new BehaviorSubject<string | null>(null);

  form = this.fb.group({
    username: [this.data.username, Validators.required],
    oldPassword: ['', Validators.required],
    newPassword: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private dialogRef: MatDialogRef<ChangePasswordDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { username: string },
    private authService:AuthService
  ) {}

  submit() {
    if (this.form.valid) {
      const { username, oldPassword, newPassword } = this.form.value;
  
      const payload = {
        username: username ?? '',
        oldPassword: oldPassword ?? '',
        newPassword: newPassword ?? ''
      };
  
      this.authService.updatePassword(payload).subscribe({
        next: () => {

          alert("password successfully update");
          this.dialogRef.close();
        },
        error: () => {
          this.errorMessage.next('Failed to update the password. Try again later.');
          
        }
      });
    }
  }
  
  close(){
    this.dialogRef.close();
  }

}
