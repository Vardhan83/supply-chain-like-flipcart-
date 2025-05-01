
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { UserDialogComponent } from './loginSignup/user-dialog/user-dialog.component';
import { AuthService } from './auth.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatTooltipModule,
    MatDialogModule,
    MatIconModule
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  username: string = '';
  private userSub?: Subscription;

  constructor(private dialog: MatDialog, private authService: AuthService, private router :Router) {}

  ngOnInit() {
    this.userSub = this.authService.currentUser$.subscribe(user => {
      this.username = user?.username || '';
    });
  }

  openUserDialog() {
    this.dialog.open(UserDialogComponent, {
      width: '350px',
      data: { username: this.username }
    });
  }

  ngOnDestroy() {
    this.userSub?.unsubscribe();
  }
  logout(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }
  hasRole(role: string): boolean {
    return this.authService.hasRole(role);
  }
  
}
