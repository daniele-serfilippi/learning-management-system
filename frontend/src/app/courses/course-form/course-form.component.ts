import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import { Router, ActivatedRoute} from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import { CourseService } from '../course.service';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.sass']
})
export class CourseFormComponent implements OnInit {
  id: string;
  courseForm: FormGroup;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private router: Router,
    private notificationService: NotificationService,
    private courseService: CourseService,
    private route: ActivatedRoute
  ) { }

  getSections(sections): FormGroup[] {
    if (!sections) {
      return [
        this.fb.group({
          title: [null, Validators.required],
          lectures: [[]]
        })
      ];
    }

    const formGroups = [];
    for (const section of sections) {
      formGroups.push(
        this.fb.group({
          title: [section.title, Validators.required],
          lectures: [[]]
        })
      );
    }
    return formGroups;
  }

  createForm(course?): FormGroup {
    if (!course) {
      course = {};
    }
    return this.fb.group({
      id: course._id,
      title: [course.title, Validators.required],
      subtitle: [course.subtitle, Validators.required],
      description: [course.description, Validators.required],
      image: null,
      price: [course.price, Validators.required],
      sections: this.fb.array(this.getSections(course.sections))
    });
  }

  ngOnInit() {
    this.courseForm = this.createForm();

    if (this.route.snapshot.params.id) { // editing mode
      this.id = this.route.snapshot.params.id;
      this.courseService
        .getCourse(this.id)
        .subscribe( ({ data }: any) => {
          this.courseForm = this.createForm(data.course);
        });
    }
  }

  onSubmit() {
    const formValue = {...this.courseForm.value};
    if (formValue.image && formValue.image.files) {
      formValue.image = formValue.image.files[0];
    }
    if (this.id) { // edit mode
      this.courseService
        .updateCourse(this.id, formValue)
        .subscribe(res => {
          this.notificationService.showSuccess('Course successfully updated');
        });
    } else {
      this.courseService
        .createCourse(formValue)
        .subscribe(res => {
          this.notificationService.showSuccess('Course successfully created');
          this.router.navigate(['courses']);
        });
    }
  }

  onAddSection() {
    (this.courseForm.get('sections') as FormArray).push(
      this.fb.group({
        title: [null, Validators.required],
        lectures: [[]]
      })
    );
  }
}
