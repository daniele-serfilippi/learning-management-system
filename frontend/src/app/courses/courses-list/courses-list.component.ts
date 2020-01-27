import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ConfirmDialogComponent, ConfirmDialogModel } from 'src/app/shared/ui/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { CourseService } from 'src/app/shared/services/course.service';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.sass']
})
export class CoursesListComponent implements OnInit {
  courses: [];
  backendUrl: string = environment.backendURL;

  constructor(
    private courseService: CourseService,
    private dialog: MatDialog,
    private notificationService: NotificationService
  ) { }

  ngOnInit() {
    this.getCourses();
  }

  getCourses() {
    this.courseService
    .getCourses()
    .subscribe(({ data }: any) => {
      this.courses = data.courses.slice();
    });
  }

  onDeleteCourse(id: string) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: new ConfirmDialogModel(
        'Confirm deletion',
        'WARNING: This operation is not recoverable. Are you sure you want to delete the course and all its contents?'
      ),
      maxWidth: '400px'
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.courseService
          .deleteCourse(id)
          .subscribe(res => {
            this.notificationService.showSuccess('Course successfully deleted');
            this.getCourses();
          });
      }
    });
  }

}
