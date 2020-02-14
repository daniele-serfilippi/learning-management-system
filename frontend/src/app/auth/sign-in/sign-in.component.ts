import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { CognitoUser } from '@aws-amplify/auth';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { LoaderService } from 'src/app/shared/ui/loader/loader.service';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.sass']
})
export class SignInComponent {

  signinForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  hide = true;

  get emailInput() { return this.signinForm.get('email'); }
  get passwordInput() { return this.signinForm.get('password'); }

  constructor(
    public auth: AuthService,
    private notificationService: NotificationService,
    private router: Router,
    private loaderService: LoaderService
  ) { }

  getEmailInputError() {
    if (this.emailInput.hasError('email')) {
      return 'Please enter a valid email address.';
    }
    if (this.emailInput.hasError('required')) {
      return 'An Email is required.';
    }
  }

  getPasswordInputError() {
    if (this.passwordInput.hasError('required')) {
      return 'A password is required.';
    }
    if (this.passwordInput.hasError('minlength')) {
      const minLength = this.passwordInput.errors.minlength.requiredLength;
      return `Minimum password length is ${minLength} characters`;
    }
    return JSON.stringify(this.passwordInput.errors);
  }

  signIn() {
    this.loaderService.show();
    this.auth.signIn(this.emailInput.value, this.passwordInput.value)
      .then((user: CognitoUser | any) => {
        this.loaderService.hide();
        this.router.navigate(['']);
      })
      .catch((error: any) => {
        this.loaderService.hide();
        this.notificationService.showError(error.message);
        switch (error.code) {
          case "UserNotConfirmedException":
            environment.confirm.email = this.emailInput.value;
            environment.confirm.password = this.passwordInput.value;
            this.router.navigate(['auth/confirm']);
            break;
          case "UsernameExistsException":
            this.router.navigate(['auth/signin']);
            break;
        }
      })
  }

  async signInWithFacebook() {
    const socialResult = await this.auth.socialSignIn(AuthService.FACEBOOK);
    console.log('fb Result:', socialResult);
  }

  async signInWithGoogle() {
    const socialResult = await this.auth.socialSignIn(AuthService.GOOGLE);
    console.log('google Result:', socialResult);
  }
}
