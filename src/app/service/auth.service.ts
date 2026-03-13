import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

export interface AuthResponse {
  token: string;
  id: number;
  email: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // private apiUrl = 'http://localhost:8080/api/auth/login';
  private apiUrl = 'http://localhost:5000/api/auth';

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string) {
    this.http.post<AuthResponse>(this.apiUrl + '/login', { email, password })
      .subscribe({
        next: (res) => {
          localStorage.setItem('token', res.token);
          localStorage.setItem('userId', res.id.toString()); // ✅ now works
          localStorage.setItem('email', res.email);
          this.router.navigate(['/homepage']);
        },
        error: () => alert('Invalid credentials')
      });
  }
  
  register(email: string, password: string) {
  this.http.post(this.apiUrl + '/register', { email, password })
    .subscribe({
      next: () => {
        alert('Registration successful, please login.');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        // Handle both lowercase and uppercase property names
        const errorMsg = err.error?.message || err.error?.Message || err.message || 'Unknown error';
        alert('Registration failed: ' + errorMsg);
        console.error('Registration error:', err); // ✅ log full error for debugging
      }
    });
  }

   forgotPassword(email: string) {
  this.http.post(this.apiUrl + '/forgot-password', { email })
    .subscribe({
      next: (res: any) => {
        alert('Reset token sent to your email (demo: ' + res.token + ')');
      },
      error: (err) => alert('Error: ' + (err.error?.message || 'Unknown'))
    });
  }

  resetPassword(email: string, token: string, newPassword: string) {
  this.http.post(this.apiUrl + '/reset-password', { email, token, newPassword })
    .subscribe({
      next: () => {
        alert('Password reset successful, please login.');
        this.router.navigate(['/login']);
      },
      error: (err) => alert('Reset failed: ' + (err.error?.message || 'Unknown'))
    });
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
