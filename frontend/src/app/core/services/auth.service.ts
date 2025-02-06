import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:4000/api/v1/password-reset';

  constructor(private http: HttpClient) {}

  requestPasswordReset(data: { email: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/request-password-reset`, data);
  }

//   resetPassword(data: { token: string, newPassword: string }): Observable<any> {
//     return this.http.post(`${this.apiUrl}/reset-password`, data);
//   }
  resetPassword(data: { token: string; newPassword: string }) {
    return this.http.post(`${this.apiUrl}/reset-password`, data);
  }
  
}
