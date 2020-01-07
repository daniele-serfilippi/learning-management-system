import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseLectureComponent } from './course-lecture.component';

describe('CourseLectureComponent', () => {
  let component: CourseLectureComponent;
  let fixture: ComponentFixture<CourseLectureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseLectureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseLectureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
