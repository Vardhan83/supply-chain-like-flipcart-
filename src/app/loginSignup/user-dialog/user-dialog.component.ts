
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ChangePasswordDialogComponent } from '../change-password-dialog/change-password-dialog.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-dialog',
  standalone: true,
  imports: [MatDialogModule, MatTooltipModule, MatIconModule],
  templateUrl: './user-dialog.component.html',
  styleUrl: './user-dialog.component.scss'
})
export class UserDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { username: string },
    private dialogRef: MatDialogRef<UserDialogComponent>,
    private dialog: MatDialog,
    private authService: AuthService,
    private router: Router
  ) {}

  openChangePassword() {
    this.dialogRef.close();
    this.dialog.open(ChangePasswordDialogComponent, {
      width: '400px',
      data: { username: this.data.username }
    });
  }

  logout() {
    this.authService.logout();
    this.dialogRef.close();
    this.router.navigate(['/login']);
  }
}
