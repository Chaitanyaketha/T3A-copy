import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { SignUpComponent } from './features/register/register.component';
import { AuthGuard } from './core/guards/auth.guard';
import { ForgotPasswordComponent } from './features/forgotpassword/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './features/forgotpassword/reset-password/reset-password.component';
import { LoginGuardGuard } from './core/gurads/login-guard.guard';


const routes: Routes = [
  { path: 'login', component: LoginComponent,canActivate:[LoginGuardGuard] },
  { path: 'register', component: SignUpComponent },
  { 
    path: 'dashboard', canActivate:[AuthGuard],
    loadChildren: () => import('./features/dashboard/dashboard.module').then(m => m.DashboardModule), 
    
  },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'forgot-password', component: ForgotPasswordComponent },
    { path: 'reset-password', component: ResetPasswordComponent },
  
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
