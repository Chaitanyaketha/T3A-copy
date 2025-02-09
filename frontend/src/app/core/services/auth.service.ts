import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:4000/api/v1/password-reset';

  constructor(private http: HttpClient) {}

  requestPasswordReset(data: { email: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/request-password-reset`, data);
  }

  resetPassword(data: { token: string; newPassword: string }) {
    return this.http.post(`${this.apiUrl}/reset-password`, data);
  }
}

// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { tap, catchError } from 'rxjs/operators';
// import { environment } from 'src/environments/environment';
// @Injectable({
//   providedIn: 'root',
// })
// export class AuthService {
//   private apiUrl = `${environment.apiUrl}/api/v1/user/login`;

//   constructor(private http: HttpClient) {}

//   login(identifier: string, password: string): Observable<any> {
//     const loginData = { identifier, password };
//     return this.http.post<any>(this.apiUrl, loginData).pipe(
//       tap((response) => {
//         if (response?.user?.role) {
//           this.storeUserRole(response.user.role);
//         }
//       })
//     );
//   }

//   requestPasswordReset(data: { email: string }): Observable<any> {
//     return this.http
//       .post(
//         `http://localhost:4000/api/v1/password-reset/request-password-reset`,
//         data
//       )
//       .pipe(
//         catchError((error) => {
//           console.error('Password reset request failed:', error);
//           throw error;
//         })
//       );
//   }

//   resetPassword(data: { token: string; newPassword: string }) {
//     return this.http
//       .post(`http://localhost:4000/api/v1/password-reset/reset-password`, data)
//       .pipe(
//         catchError((error) => {
//           console.error('Password reset failed:', error);
//           throw error;
//         })
//       );
//   }

//   storeUserRole(role: string) {
//     if (role) {
//       console.log('Storing user role in sessionStorage:', role);
//       sessionStorage.setItem('userRole', role);
//       console.log('Stored role:', sessionStorage.getItem('userRole')); // Debugging step
//     } else {
//       console.warn('Invalid role, not storing');
//     }
//   }

//   getUserRole(): string | null {
//     return sessionStorage.getItem('userRole');
//   }
// }
