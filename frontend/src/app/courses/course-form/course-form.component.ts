import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.sass']
})
export class CourseFormComponent implements OnInit {
  courseForm: FormGroup;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private apollo: Apollo,
    private router: Router,
    private notificationService: NotificationService
  ) { }

  ngOnInit() {
    this.courseForm = this.fb.group({
      title: [null, Validators.required],
      subtitle: [null, Validators.required],
      description: [null, Validators.required],
      image: [null, Validators.required],
      price: [null, Validators.required],
    });
  }

  onSubmit() {
    const createCourse = gql`
      mutation createCourse(
        $title: String!,
        $subtitle: String!,
        $description: String!,
        $image: Upload!,
        $rating: Float,
        $price: Float
      ) {
          createCourse(courseInput: {
            title: $title,
            subtitle: $subtitle,
            description: $description,
            image: $image,
            rating: $rating,
            price: $price
          }) {
            title
          }
      }
    `;

    this.apollo.mutate({
      mutation: createCourse,
      variables: {
        ...this.courseForm.value,
        image: this.courseForm.value.image.files[0]
      },
      context: {
        useMultipart: true
      }
    }).subscribe(res => {
      this.notificationService.showSuccess('Course successfully saved');
      this.router.navigate(['courses']);
    });
  }
}
