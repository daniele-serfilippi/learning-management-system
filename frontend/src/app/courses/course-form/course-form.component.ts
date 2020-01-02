import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

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
    private apollo: Apollo
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

    const mutationResult = this.apollo.mutate({
      mutation: createCourse,
      variables: {
        ...this.courseForm.value,
        image: this.courseForm.value.image.files[0]
      },
      context: {
        useMultipart: true
      }
    }).subscribe(res => {
      console.log("mutation result: ", res);
    });
  }
}
