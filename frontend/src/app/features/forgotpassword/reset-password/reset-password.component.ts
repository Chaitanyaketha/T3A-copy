// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { AuthService } from '../../../core/services/auth.service';

// @Component({
//   selector: 'app-reset-password',
//   templateUrl: './reset-password.component.html',
//   styleUrls: ['./reset-password.component.css']
// })
// export class ResetPasswordComponent implements OnInit {
//   resetPasswordForm: FormGroup;
//   token: string = '';
//   message: string = '';
//   error: string = '';

//   constructor(
//     private route: ActivatedRoute,
//     private router: Router,
//     private fb: FormBuilder,
//     private authService: AuthService
//   ) {
//     this.resetPasswordForm = this.fb.group({
//       newPassword: ['', [Validators.required, Validators.minLength(6)]]
//     });
//   }

//   ngOnInit() {
//     this.token = this.route.snapshot.queryParams['token'];
//   }

//   onSubmit() {
//     if (this.resetPasswordForm.valid) {
//       const payload = { token: this.token, newPassword: this.resetPasswordForm.value.newPassword };
//       this.authService.resetPassword(payload).subscribe({
//         next: (res) => {
//           this.message = res.message;
//           setTimeout(() => this.router.navigate(['/login']), 3000);
//         },
//         error: (err) => this.error = err.error.message
//       });
//     }
//   }
// }

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  message: string = '';
  error: string = '';
  token: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.resetPasswordForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  ngOnInit() {
    this.token = this.route.snapshot.queryParamMap.get('token') || '';
    if (!this.token) {
      this.error = "Invalid or expired password reset link.";
    }
  }

  passwordMatchValidator(formGroup: FormGroup) {
    return formGroup.get('newPassword')?.value === formGroup.get('confirmPassword')?.value
      ? null : { mismatch: true };
  }

  onSubmit() {
    if (this.resetPasswordForm.valid) {
      const requestData = {
        token: this.token,  // Pass the token from the URL
        newPassword: this.resetPasswordForm.value.newPassword
      };
  
      this.authService.resetPassword(requestData).subscribe({
        next: () => {
          this.message = "Your password has been successfully reset.";
          this.error = "";
          setTimeout(() => this.router.navigate(['/login']), 3000);
        },
        error: () => {
          this.error = "Failed to reset password. Please try again.";
          this.message = "";
        }
      });
    }
  }
  
}
