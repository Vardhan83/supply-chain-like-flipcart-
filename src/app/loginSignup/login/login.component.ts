

import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../auth.service';
import { LoginRequest } from '../../models/loginAndSignup';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTooltipModule,
    MatIconModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  credentials = signal<LoginRequest>({
    username: '',
    password: ''
  });
  isLoading = signal(false);
  errorMessage = signal('');
  showPassword = signal(false);

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  togglePasswordVisibility() {
    this.showPassword.set(!this.showPassword());
  }

  onSubmit(): void {
    this.isLoading.set(true);
    this.errorMessage.set('');

    this.authService.login(this.credentials()).subscribe({
      next: () => {
        this.router.navigate(['sales/products']);
       
      },
      error: () => {
        this.errorMessage.set('Invalid username or password');
        this.isLoading.set(false);
      }
    });
  }
}
