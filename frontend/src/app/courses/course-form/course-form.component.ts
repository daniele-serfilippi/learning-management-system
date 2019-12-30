import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Course } from '../course.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.sass']
})
export class CourseFormComponent implements OnInit {
  srcResult: string;

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  onSubmitCourse(courseData: Course) {
    const graphqlQuery = {
      query: `
        mutation createCourseMutation(
          $title: String!,
          $subtitle: String!,
          $description: String!,
          $imageUrl: String!,
          $rating: Float,
          $price: Float) {
            createCourse(courseInput: {
              title: $title,
              subtitle: $subtitle,
              description: $description,
              imageUrl: $imageUrl,
              rating: $rating,
              price: $price
            }) {
              title
            }
        }
      `,
      variables: {
        ...courseData,
        imageUrl: 'https://inteng-storage.s3.amazonaws.com/img/iea/nZwXYxR8Ov/sizes/codingbundle_resize_md.jpg'
      }
    };
    this.http
      .post(
        environment.apiURL,
        graphqlQuery
      )
      .subscribe(responseData => {
        console.log(responseData);
      });
  }

}
