// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators} from '@angular/forms';
// import { Router } from '@angular/router';
// import { ToastrService } from 'ngx-toastr';
// import { LoginService } from './login.service';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.scss']
// })

//  export class LoginComponent {
//   loginForm: FormGroup;


//   constructor(private fb: FormBuilder, private loginService: LoginService, private router: Router,private toastr: ToastrService) {
//     this.loginForm = this.fb.group({
//       identifier: ['', [Validators.required]],
//       password: ['', [Validators.required, Validators.minLength(6)]],
//     });
//   }

//   onSubmit(): void {
//     if (this.loginForm.invalid){
//       this.toastr.error('Please fill all required fields correctly.', 'Error');
//      return;
// } 

//     const { identifier, password } = this.loginForm.value;
//     this.loginService.login(identifier, password).subscribe(
//       (response) => {
//         console.log(response.rtoken);
//         this.loginService.storeToken(response.token);
//         this.loginService.r_storeToken(response.rtoken);
//         this.loginService.accessToken(response.accessToken);
//         this.toastr.success("login successful",'success');
//         this.router.navigate(['/dashboard']); 

//       },
//       (err) => {
//         this.toastr.error(err.error.error.message,'error');
//         this.toastr.error("Invalid credentials. Please check your email and password.", 'error');
//         window.alert("Invalid credentials. Please check your email and password.");
//       }
//     );
//   }
// }

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.loginForm = this.fb.group({
      identifier: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.toastr.error('Please fill all required fields correctly.', 'Error');
      return;
    }

    const { identifier, password } = this.loginForm.value;

    this.loginService.login(identifier, password).subscribe(
      (response) => {
        this.loginService.storeToken(response.token);
        this.loginService.r_storeToken(response.rtoken);
        this.loginService.accessToken(response.accessToken);
        this.toastr.success('Login successful', 'Success');
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        const errorMessage = error?.error?.message || 'Invalid credentials. Please try again.';
        this.toastr.error(errorMessage, 'Error');
      }
    );
  }
}
