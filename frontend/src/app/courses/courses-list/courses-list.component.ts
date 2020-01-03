import { Component, OnInit } from '@angular/core';

import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.sass']
})
export class CoursesListComponent implements OnInit {
  courses: [];
  backendUrl: string;

  constructor(
    private apollo: Apollo
  ) {
    this.backendUrl = environment.backendURL;
   }

  ngOnInit() {
    const graphqlQuery = gql`
      {
        courses {
          _id
          title
          subtitle
          imageUrl
          createdAt
        }
      }
    `;

    this.apollo.query({
      query: graphqlQuery,
    })
    .subscribe((res: any) => this.courses = res.data.courses.slice());
  }

}
