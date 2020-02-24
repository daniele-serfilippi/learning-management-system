import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-password-strength-confirm',
  templateUrl: './password-strength-confirm.component.html',
  styleUrls: ['./password-strength-confirm.component.sass']
})
export class PasswordStrengthConfirmComponent implements OnInit {
  @ViewChild('passwordComponent', {static: true})
  passwordComponent;

  hidePassword = true;

  constructor() { }

  ngOnInit(): void {
  }

}
