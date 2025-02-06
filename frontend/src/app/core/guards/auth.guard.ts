// import { Injectable } from '@angular/core';
// import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
// @Injectable({
//   providedIn: 'root',
// })
// export class AuthGuard implements CanActivate {
//   constructor(private router: Router) {}

//   async canActivate(
//     next: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot
//   ): Promise<boolean> {

//     const token = sessionStorage.getItem('authToken');
//     if (token) 
//       return true;
//     this.router.navigate(['/login']);
//     return false;
     
    
//   }

//   isAuthenticated(): boolean {
//     const token = localStorage.getItem('accessToken'); // Adjust based on your token storage
//     return !!token; // Return true if token exists, otherwise false
//   }
// }
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor( private router: Router) {}

  canActivate(): boolean {
    if (this.isAuthenticated()) {
      // User is authenticated, allow access to route
      return true;
    } else {
      // User is not authenticated, redirect to login
      this.router.navigate(['/login']);
      return false;
    }
  }
  isAuthenticated(): boolean {
    const token = sessionStorage.getItem('authToken'); // Adjust based on your token storage
    // const token1=localStorage.getItem('accessToken');  //new
    return !!token; // Return true if token exists, otherwise false
  }
}