import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
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

  ngOnInit() {
    this.courseForm = this.fb.group({
      id: null,
      title: [null, Validators.required],
      subtitle: [null, Validators.required],
      description: [null, Validators.required],
      image: [null, Validators.required],
      price: [null, Validators.required],
    });

    if (this.route.snapshot.params.id) { // editing mode
      this.id = this.route.snapshot.params.id;
      this.courseService
        .getCourse(this.id)
        .subscribe( ({ data }: any) => {
          const course = data.course;
          this.courseForm = this.fb.group({
            id: course._id,
            title: [course.title, Validators.required],
            subtitle: [course.subtitle, Validators.required],
            description: [course.description, Validators.required],
            image: null,
            price: [course.price, Validators.required],
          });
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
}
