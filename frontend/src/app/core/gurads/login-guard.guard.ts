import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {
  rotuer:Router=inject(Router)  //to use route
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.isAuthenticated()){
      this.rotuer.navigate(['/dashboard'])
      return false;
    }else{
      return true;
    }
  }
  isAuthenticated(): boolean {
    const token = sessionStorage.getItem('authToken'); // Adjust based on your token storage
    // const token1=localStorage.getItem('accessToken');  //new
    return !!token; // Return true if token exists, otherwise false
  }
}
