
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { User, LoginRequest, RegisterRequest ,UserResponse} from './models/loginAndSignup';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5050/api/auth';
  private currentUserSubject = new BehaviorSubject<User | null>(this.getCurrentUserFromStorage());
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(credentials: LoginRequest): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/login`, credentials).pipe(
      tap((user: User) => {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
      })
    );
  }

  register(userData: RegisterRequest): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/register`, userData);
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
  getAllUsers(): Observable<UserResponse[]> {
    return this.http.get<UserResponse[]>(`${this.apiUrl}/users`);
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  private getCurrentUserFromStorage(): User | null {
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem('currentUser');
      return user ? JSON.parse(user) : null;
    }
    return null;
  }

  isLoggedIn(): boolean {
    return this.getCurrentUser() !== null;
  }
  updatePassword(data: { username: string; oldPassword: string; newPassword: string }): Observable<any> {
    return this.http.patch(`${this.apiUrl}/update-password`, data,{
        responseType: 'text' });
  }
  
  // private getStoredUser(): User | null {
  //   if (typeof window !== 'undefined') {
  //     const user = localStorage.getItem('currentUser');
  //     return user ? JSON.parse(user) : null;
  //   }
  //   return null;
  // }

  checkUsername(username: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/check-username?username=${username}`);
  }



  hasRole(role: string): boolean {
    const currentUser = this.getCurrentUser();
    return currentUser?.role === role;
  }
  updateRole(data: { username: string; newRole: string; }): Observable<any> {
    return this.http.patch(`${this.apiUrl}/update-role`, data,{
        responseType: 'text' });

  }
  
  
}

