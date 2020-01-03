import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { environment } from 'src/environments/environment';
import { ConfirmDialogComponent, ConfirmDialogModel } from 'src/app/ui/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.sass']
})
export class CoursesListComponent implements OnInit {
  courses: [];
  backendUrl: string;

  constructor(
    private apollo: Apollo,
    private dialog: MatDialog,
    private notificationService: NotificationService
  ) {
    this.backendUrl = environment.backendURL;
  }

  ngOnInit() {
    this.getCoursesList();
  }

  getCoursesList() {
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
      fetchPolicy: 'network-only'
    }).subscribe((res: any) => {
      this.courses = res.data.courses.slice();
    });
  }

  onDeleteCourse(id: string) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: new ConfirmDialogModel(
        'Confirm deletion',
        'Are you sure you want to delete the course?'
      ),
      maxWidth: '400px'
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        const createCourse = gql`
            mutation deleteCourse(
              $id: ID!
            ) {
                deleteCourse(id: $id)
            }
          `;

        this.apollo.mutate({
          mutation: createCourse,
          variables: {
            id
          }
        }).subscribe(res => {
          this.notificationService.showSuccess('Course successfully deleted');
          this.getCoursesList();
        });
      }
    });
  }

}
