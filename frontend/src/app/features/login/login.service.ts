// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// import { environment } from 'src/environments/environment';
// @Injectable({
//   providedIn: 'root',
// })
// export class LoginService {
//   private apiUrl = `${environment.apiUrl}/api/v1/user/login`;

//   constructor(private http: HttpClient) {}

//   login(identifier: string, password: string): Observable<any> {
//     const loginData = { identifier, password };
//     return this.http.post<any>(this.apiUrl, loginData);
//   }

//   accessToken(token: string): void {
//     ////new
//     localStorage.setItem('accessToken', token);
//   }

//   storeToken(token: string): void {
//     sessionStorage.setItem('authToken', token);
//   }

//   r_storeToken(token: string): void {
//     sessionStorage.setItem('r_authToken', token);
//   }
// }
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private apiUrl = `${environment.apiUrl}/api/v1/user/login`;

  constructor(private http: HttpClient) {}

  login(identifier: string, password: string): Observable<any> {
    const loginData = { identifier, password };
    return this.http.post<any>(this.apiUrl, loginData).pipe(
      tap((response) => {
        if (response?.token) {
          this.accessToken(response.token);
        }
        if (response?.rtoken) {
          this.r_storeToken(response.rtoken);
        }
        if (response?.user?.role) {
          this.storeUserRole(response.user.role);
        }
      })
    );
  }

  accessToken(token: string): void {
    localStorage.setItem('accessToken', token);
  }

  storeToken(token: string): void {
    sessionStorage.setItem('authToken', token);
  }

  r_storeToken(token: string): void {
    sessionStorage.setItem('r_authToken', token);
  }

  storeUserRole(role: string): void {
    console.log('Storing user role:', role);
    sessionStorage.setItem('userRole', role);
  }

  getUserRole(): string | null {
    return sessionStorage.getItem('userRole');
  }
}
