import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.sass']
})
export class ForgotPasswordComponent implements OnInit {
  email: string;
  forgotPasswordForm: FormGroup
  get emailInput() { return this.forgotPasswordForm.get('email'); }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService,
    private notificationService: NotificationService
  ) {
    this.email = this.route.snapshot.queryParams.email;
  }

  ngOnInit(): void {
    this.forgotPasswordForm = new FormGroup({
      email: new FormControl(this.email, [Validators.email, Validators.required]),
    });
  }

  onRecoverPassword() {
    this.auth.forgotPassword(this.emailInput.value)
      .then((data: any) => {
        const queryParams: Params = { email: this.emailInput.value };
        this.notificationService.showSuccess(`An email was sent to ${this.emailInput.value} with a confirmation code`);
        this.router.navigate(['auth/reset-password-with-code'], { queryParams });
      })
      .catch(err => this.notificationService.showError(err.message));
  }

}
