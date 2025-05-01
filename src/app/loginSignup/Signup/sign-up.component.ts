
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../auth.service';
import { RegisterRequest } from '../../models/loginAndSignup';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    FormsModule,
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    CommonModule
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
 
})
export class SignupComponent {
  userData = signal<RegisterRequest>({
    username: '',
    password: '',
    confirmPassword: ''
  });
  isLoading = signal(false);
  errorMessage = signal('');
  showpassword=signal(false);
  showConfirmpassword=signal(false);

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}
  
  toggle(){
    this.showpassword.set(!this.showpassword());
  }
  toggleConfirmPassword(){
    this.showConfirmpassword.set(!this.showConfirmpassword());
  }


  // onSubmit(): void {
  //   if (this.userData().password !== this.userData().confirmPassword) {
  //     this.errorMessage.set('Passwords do not match');
  //     return;
  //   }
  
  //   this.isLoading.set(true);
  //   this.errorMessage.set('');

  //   const registerData: RegisterRequest = this.userData();

  //   this.authService.register(registerData).subscribe({
  //     next: (user) => {
  //       localStorage.setItem('currentUser', JSON.stringify(user));
  //       this.router.navigate(['/login']);
  //     },
  //     error: (err) => {
  //       this.errorMessage.set('Registration failed. Please try again.');
  //       this.isLoading.set(false);
  //     }
  //   });
  // }
  onSubmit(): void {
    if (this.userData().password !== this.userData().confirmPassword) {
      this.errorMessage.set('Passwords do not match');
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set('');

    const username = this.userData().username;

    this.authService.checkUsername(username).subscribe({
      next: (exists) => {
        if (exists) {
          this.errorMessage.set('Username already exists');
          this.isLoading.set(false);
        } else {
          this.registerUser();
        }
      },
      error: () => {
        this.errorMessage.set('Failed to check username. Try again later.');
        this.isLoading.set(false);
      }
    });
  }

  registerUser(): void {
    const registerData: RegisterRequest = this.userData();
    this.authService.register(registerData).subscribe({
      next: (user) => {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.router.navigate(['/login']);
      },
      error: () => {
        this.errorMessage.set('Registration failed. Please try again.');
        this.isLoading.set(false);
      }
    });
  }


  //password check
  getPasswordComparison(): { char: string; match: boolean }[] {
    const pwd = this.userData().password;
    const confirm = this.userData().confirmPassword;
    const length = Math.max(pwd.length, confirm.length);
  
    const result = [];
    for (let i = 0; i < length; i++) {
      const char = confirm[i] || '';
      result.push({ char, match: pwd[i] === confirm[i] });
    }
    return result;
  }
  
}