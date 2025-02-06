// import { Component } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { AuthService } from '../../../core/services/auth.service';

// @Component({
//   selector: 'app-forgot-password',
//   templateUrl: './forgot-password.component.html',
//   styleUrls: ['./forgot-password.component.css']
// })
// export class ForgotPasswordComponent {
//   forgotPasswordForm: FormGroup;
//   message: string = '';
//   error: string = '';

//   constructor(private fb: FormBuilder, private authService: AuthService) {
//     this.forgotPasswordForm = this.fb.group({
//       email: ['', [Validators.required, Validators.email]]
//     });
//   }

//   onSubmit() {
//     if (this.forgotPasswordForm.valid) {
//       this.authService.requestPasswordReset(this.forgotPasswordForm.value).subscribe({
//         next: (res) => this.message = res.message,
//         error: (err) => this.error = err.error.message
//       });
//     }
//   }
// }
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  forgotPasswordForm: FormGroup;
  message: string = '';
  error: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    if (this.forgotPasswordForm.valid) {
      this.authService.requestPasswordReset(this.forgotPasswordForm.value).subscribe({
        next: (res) => {
          this.message = "If your email is associated with an account, you will receive a reset link shortly.";
          this.error = "";
        },
        error: () => {
          this.error = "This email is not associated with an account. Please check and try again.";
          this.message = "";
        }
      });
    }
  }
}
