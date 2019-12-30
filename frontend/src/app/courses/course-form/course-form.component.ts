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
    this.http
      .post(
        environment.apiURL,
        courseData
      )
      .subscribe(responseData => {
        console.log(responseData);
      });
  }

}
