import { Component, OnInit } from '@angular/core';
import { Course } from '../course.model';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.sass']
})
export class CoursesListComponent implements OnInit {
  courses: Course[];

  constructor() { }

  ngOnInit() {
    this.courses = [
      new Course(
        'Angular 8 - The Complete Guide (2019+ Edition)',
        'Super complete course',
        'A complete Angular deep dive',
        'https://i.udemycdn.com/course/240x135/756150_c033_2.jpg',
        5,
        19.90),
      new Course(
        'React - The Complete Guide (incl Hooks, React Router, Redux)',
        'Dive in and learn React.js from scratch! Learn Reactjs, Hooks, Redux, React Routing, Animations, Next.js and way more!',
        'This course is fully up-to-date with the latest version of React and includes React Hooks! Of course it will be kept up-to-date in the future :-)',
        'https://i.udemycdn.com/course/240x135/1362070_b9a1_2.jpg',
        5,
        19.90),
      new Course(
        'NodeJS - The Complete Guide (incl. MVC, REST APIs, GraphQL)',
        'Master Node JS, build REST APIs with Node.js, GraphQL APIs, add Authentication, use MongoDB, SQL & much more!',
        'Join the most comprehensive Node.js course on Udemy and learn Node in both a practical as well as theory-based way!',
        'https://i.udemycdn.com/course/240x135/1879018_95b6.jpg',
        5,
        19.90)
    ];
  }

}
