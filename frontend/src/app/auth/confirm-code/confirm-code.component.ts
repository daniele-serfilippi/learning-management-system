import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import Auth from '@aws-amplify/auth';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'app-confirm-code',
  templateUrl: './confirm-code.component.html',
  styleUrls: ['./confirm-code.component.sass']
})
export class ConfirmCodeComponent implements OnInit {

  email = environment.confirm.email;
  confirmForm: FormGroup = new FormGroup({
    email: new FormControl({ value: this.email, disabled: true }),
    code: new FormControl('', [Validators.required, Validators.min(3)])
  });

  get codeInput() { return this.confirmForm.get('code'); }

  constructor(
    private router: Router,
    private notificationService: NotificationService
  ) { }

  ngOnInit() {
    if (!this.email) {
      this.router.navigate(['auth/signup']);
    } else {
      Auth.resendSignUp(this.email);
    }
  }

  sendAgain() {
    Auth.resendSignUp(this.email)
      .then(() => this.notificationService.showSuccess('A code has been emailed to you'))
      .catch(() => this.notificationService.showError('An error occurred'));
  }

  confirmCode() {
    Auth.confirmSignUp(this.email, this.codeInput.value)
      .then((data: any) => {
        console.log(data);
        if (data === 'SUCCESS' &&
          environment.confirm.email &&
          environment.confirm.password) {
          Auth.signIn(this.email, environment.confirm.password)
            .then(() => {
              this.router.navigate(['']);
            }).catch((error: any) => {
              this.router.navigate(['auth/signin']);
            });
        }
      })
      .catch((error: any) => {
        console.log(error);
        this.notificationService.showError(error.message);
      });
  }

}
