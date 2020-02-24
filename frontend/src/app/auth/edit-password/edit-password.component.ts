import { Component, OnInit, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-password',
  templateUrl: './edit-password.component.html',
  styleUrls: ['./edit-password.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditPasswordComponent implements OnInit {
  @ViewChild('passwordStrengthConfirm', { static: true })
  passwordStrengthConfirm;
  editPasswordForm: FormGroup;
  hideOldPassword = true;

  get oldPasswordInput() { return this.editPasswordForm.get('oldPassword'); }
  get passwordInput() { return this.editPasswordForm.get('password'); }

  constructor(
    private router: Router,
    private authService: AuthService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.editPasswordForm = new FormGroup({
      oldPassword: new FormControl('', [Validators.required]),
      password: this.passwordStrengthConfirm.passwordComponent.passwordFormControl,
      confirmPassword: this.passwordStrengthConfirm.passwordComponent.passwordConfirmationFormControl
    });
  }

  onSavePassword() {
    this.authService.editPassword(this.oldPasswordInput.value, this.passwordInput.value)
      .then(() => {
        this.notificationService.showSuccess('Your password has been succesfully saved');
        this.router.navigate(['auth/profile']);
      })
      .catch(err => {
        this.notificationService.showError(err.message)
      })
  }

}
