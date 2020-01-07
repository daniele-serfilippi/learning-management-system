import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseSectionComponent } from './course-section.component';

describe('CourseSectionComponent', () => {
  let component: CourseSectionComponent;
  let fixture: ComponentFixture<CourseSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
