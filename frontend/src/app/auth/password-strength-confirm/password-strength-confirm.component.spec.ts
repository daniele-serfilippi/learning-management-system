import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordStrengthConfirmComponent } from './password-strength-confirm.component';

describe('PasswordStrengthConfirmComponent', () => {
  let component: PasswordStrengthConfirmComponent;
  let fixture: ComponentFixture<PasswordStrengthConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasswordStrengthConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordStrengthConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
