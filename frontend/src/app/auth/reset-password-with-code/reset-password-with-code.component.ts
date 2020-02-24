import { Component, OnInit, ViewChild, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { AuthService } from '../auth.service';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password-with-code.component.html',
  styleUrls: ['./reset-password-with-code.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResetPasswordWithCodeComponent implements OnInit {
  @ViewChild('passwordStrengthConfirm', { static: true })
  passwordStrengthConfirm;
  resetPasswordWithCodeForm: FormGroup
  email: string;

  get emailInput() { return this.resetPasswordWithCodeForm.get('email'); }
  get codeInput() { return this.resetPasswordWithCodeForm.get('code'); }
  get passwordInput() { return this.resetPasswordWithCodeForm.get('password'); }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private notificationService: NotificationService
  ) {
    this.email = this.route.snapshot.queryParams.email;
  }

  ngOnInit(): void {
    this.resetPasswordWithCodeForm = new FormGroup({
      email: new FormControl({value: this.email, disabled: true}, [Validators.email, Validators.required]),
      code: new FormControl('', [Validators.required]),
      password: this.passwordStrengthConfirm.passwordComponent.passwordFormControl,
      confirmPassword: this.passwordStrengthConfirm.passwordComponent.passwordConfirmationFormControl
    });
  }

  onResetPassword() {
    this.authService.resetPasswordWithCode(this.emailInput.value, this.codeInput.value, this.passwordInput.value)
    .then(() => {
      this.notificationService.showSuccess('Your password has been succesfully reset. You can now login');
      this.router.navigate(['auth/signin']);
    })
    .catch(err => {
      const queryParams: Params = { email: this.email };
      this.notificationService.showError(err.message)
      if (err.code === 'ExpiredCodeException') {
        this.router.navigate(['auth/forgot-password'], { queryParams });
      }
    })
  }

}
