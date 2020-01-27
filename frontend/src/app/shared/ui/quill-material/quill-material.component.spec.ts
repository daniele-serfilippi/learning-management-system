import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuillMaterialComponent } from './quill-material.component';

describe('QuillMaterialComponent', () => {
  let component: QuillMaterialComponent;
  let fixture: ComponentFixture<QuillMaterialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuillMaterialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuillMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
