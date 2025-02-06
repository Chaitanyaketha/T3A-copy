
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AuthGuard } from './core/guards/auth.guard';
import { LoginComponent } from './features/login/login.component';
import { SignUpComponent } from './features/register/register.component';

import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { XlImportsComponent } from './features/imports/xl-imports.component';
import { ChatComponent } from './features/chat/chat.component';
import { ForgotPasswordComponent } from './features/forgotpassword/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './features/forgotpassword/reset-password/reset-password.component';
import { AuthService } from './core/services/auth.service';

@NgModule({
  declarations: [AppComponent, LoginComponent, SignUpComponent, ForgotPasswordComponent, ResetPasswordComponent],
  imports: [BrowserModule, ReactiveFormsModule, HttpClientModule, AppRoutingModule,FormsModule, BrowserAnimationsModule,
     ToastrModule.forRoot({
    timeOut: 2000, 
    positionClass: 'toast-top-right',
    preventDuplicates: true, 
  })],
  providers: [  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true ,
  }, AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
