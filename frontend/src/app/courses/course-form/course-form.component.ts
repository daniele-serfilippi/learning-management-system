import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import { Router, ActivatedRoute} from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import { CourseService } from '../course.service';
import { environment } from 'src/environments/environment';
import { Course } from '../course.model';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.sass']
})
export class CourseFormComponent implements OnInit {
  id: string;
  course: Course;
  courseForm: FormGroup;
  backendUrl: string = environment.backendURL;
  showImageInput = false;

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

  setForm(course?): FormGroup {
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
    this.courseForm = this.setForm();

    if (this.route.snapshot.params.id) { // editing mode
      const id = this.route.snapshot.params.id;
      this.courseService
        .getCourse(id)
        .subscribe( ({ data }: any) => {
          const course = data.course;
          this.course = new Course(
            course.title,
            course.subtitle,
            course.description,
            course.imageUrl,
            course.rating,
            course.price,
            course._id
          );
          this.courseForm = this.setForm(course);
        });
    }
  }

  onSubmit() {
    const formValue = {...this.courseForm.value};
    if (formValue.image && formValue.image.files) {
      formValue.image = formValue.image.files[0];
    }
    if (this.course.id) { // edit mode
      this.courseService
        .updateCourse(this.course.id, formValue)
        .subscribe(( { data }: any) => {
          const updatedCourse = data.updateCourse;
          this.course = new Course(
            updatedCourse.title,
            updatedCourse.subtitle,
            updatedCourse.description,
            updatedCourse.imageUrl,
            updatedCourse.rating,
            updatedCourse.price,
            updatedCourse._id
          );
          this.courseForm = this.setForm(updatedCourse);
          this.notificationService.showSuccess('Course successfully updated');
        });
    } else {
      this.courseService
        .createCourse(formValue)
        .subscribe(course => {
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

  onChangeImage() {
    this.showImageInput = true;
  }
}
