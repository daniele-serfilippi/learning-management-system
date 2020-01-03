import { Component, OnInit } from '@angular/core';

import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

import { environment } from 'src/environments/environment';
import { ConfirmDialog } from 'src/app/ui/confirm-dialog/confirm-dialog.component';

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

  onDeleteCourse(id: string) {
    const confirm = new ConfirmDialog(
      'Confirm deletion',
      'Are you sure you want to delete the course?',
      (res) => {
        if (res) {
          alert('Deleted')
        } else {
          alert("aborted")
        }
      }
    ).show();
  }

}
