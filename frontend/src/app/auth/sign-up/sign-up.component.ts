import { Component, OnInit, ChangeDetectionStrategy, ViewEncapsulation, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignUpComponent implements OnInit {
  @ViewChild('passwordStrengthConfirm', {static: true})
  passwordStrengthConfirm;

  signupForm: FormGroup;

  get emailInput() { return this.signupForm.get('email'); }
  get passwordInput() { return this.signupForm.get('password'); }
  get firstnameInput() { return this.signupForm.get('firstname'); }
  get lastnameInput() { return this.signupForm.get('lastname'); }
  get phoneInput() { return this.signupForm.get('phone'); }

  constructor(
    private router: Router,
    private authService: AuthService,
    private notificationService: NotificationService
  ) { }

  ngOnInit() {
    this.signupForm = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: this.passwordStrengthConfirm.passwordComponent.passwordFormControl,
      confirmPassword: this.passwordStrengthConfirm.passwordComponent.passwordConfirmationFormControl,
      phone: new FormControl(''),
      firstname: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required])
    });
  }

  signUp() {
    this.authService.signUp({
      "email": this.emailInput.value,
      "password": this.passwordInput.value,
      "firstName": this.firstnameInput.value,
      "lastName": this.lastnameInput.value,
      "phone": this.phoneInput.value
    })
    .then((data) => {
      environment.confirm.email = this.emailInput.value;
      environment.confirm.password = this.passwordInput.value;
      this.router.navigate(['auth/confirm']);
    })
    .catch((error) => this.notificationService.showError(error.message));
  }

}
