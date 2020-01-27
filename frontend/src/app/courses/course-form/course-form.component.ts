import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import _ from 'lodash';

import { NotificationService } from 'src/app/shared/services/notification.service';
import { CourseService } from 'src/app/shared/services/course.service';
import { environment } from 'src/environments/environment';
import { Course } from '../course.model';
import { MatDialog } from '@angular/material';
import { ConfirmDialogComponent, ConfirmDialogModel } from 'src/app/shared/ui/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.sass']
})
export class CourseFormComponent implements OnInit {
  course: Course;
  courseFormGroup: FormGroup;
  backendUrl: string = environment.backendURL;
  editMode = false;
  showImageInput = false;
  formValueHasChanged = false;
  private originalFormValue: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private notificationService: NotificationService,
    private courseService: CourseService,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) { }

  getFormGroupLectures(lectures: any): FormGroup[] {
    if (!lectures || lectures.length === 0) {
      return [
        this.fb.group({
          id: null,
          title: [null, Validators.required],
          type: ['video', Validators.required],
          videoUrl: null,
          text: null,
          isFree: false,
        })
      ];
    }

    const formGroup = [];
    for (const lecture of lectures) {
      formGroup.push(
        this.fb.group({
          id: lecture._id,
          title: [lecture.title, Validators.required],
          type: [lecture.type, Validators.required],
          videoUrl: lecture.videoUrl,
          text: lecture.text,
          isFree: lecture.isFree
        })
      );
    }
    return formGroup;
  }

  getFormGroupSections(sections: any): FormGroup[] {
    if (!sections) {
      return [
        this.fb.group({
          id: null,
          title: [null, Validators.required],
          lectures: this.fb.array(this.getFormGroupLectures(null))
        })
      ];
    }

    const formGroup = [];
    for (const section of sections) {
      formGroup.push(
        this.fb.group({
          id: section._id,
          title: [section.title, Validators.required],
          lectures: this.fb.array(this.getFormGroupLectures(section.lectures))
        })
      );
    }

    return formGroup;
  }

  setForm(course?): FormGroup {
    if (!course) {
      course = {};
    }

    const formGroup = this.fb.group({
      id: course._id,
      title: [course.title, Validators.required],
      subtitle: [course.subtitle, Validators.required],
      description: [course.description, Validators.required],
      image: [null, this.editMode ? null : Validators.required],
      price: [course.price, Validators.required],
      sections: this.fb.array(this.getFormGroupSections(course.sections))
    });

    this.originalFormValue = formGroup.value;
    this.formValueHasChanged = false;

    formGroup.valueChanges.subscribe(
      changedFormValue => { this.formValueHasChanged = !_.isEqual(this.originalFormValue, changedFormValue) }
    );

    return formGroup;
  }

  ngOnInit() {
    this.courseFormGroup = this.setForm();

    if (this.route.snapshot.params.id) { // editing mode
      const id = this.route.snapshot.params.id;
      this.courseService
        .getCourse(id)
        .subscribe(({ data }: any) => {
          this.editMode = true;
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
          this.courseFormGroup = this.setForm(course);
        });
    }
  }

  onSubmit() {
    const formValue = { ...this.courseFormGroup.value };
    if (formValue.image && formValue.image.files) {
      formValue.image = formValue.image.files[0];
    }
    if (this.editMode) {
      this.courseService
        .updateCourse(this.course.id, formValue)
        .subscribe(({ data }: any) => {
          const updatedCourse = data.updateCourse;
          this.course = new Course(
            updatedCourse.title,
            updatedCourse.subtitle,
            updatedCourse.description,
            updatedCourse.imageUrl,
            updatedCourse.rating,
            updatedCourse.price,
            updatedCourse.setions,
            updatedCourse._id
          );
          this.courseFormGroup = this.setForm(updatedCourse);
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
    (this.courseFormGroup.get('sections') as FormArray).push(
      this.fb.group({
        id: null,
        title: [null, Validators.required],
        lectures: this.fb.array(this.getFormGroupLectures(null))
      })
    );
  }

  onChangeImage() {
    this.showImageInput = true;
  }

  onBack() {
    if (!this.formValueHasChanged) {
      this.router.navigate(['/courses']);
    } else {
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        data: new ConfirmDialogModel(
          'Confirm action',
          'The course contains unsaved changes. Are you sure you want to go back?'
        ),
        maxWidth: '400px'
      });

      dialogRef.afterClosed().subscribe(res => {
        if (res) {
          this.router.navigate(['/courses']);
        }
      });
    }
  }
}
