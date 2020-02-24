import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPasswordWithCodeComponent } from './reset-password-with-code.component';

describe('ResetPasswordWithCodeComponent', () => {
  let component: ResetPasswordWithCodeComponent;
  let fixture: ComponentFixture<ResetPasswordWithCodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResetPasswordWithCodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetPasswordWithCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
