import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { ConfirmDialogComponent, ConfirmDialogModel } from 'src/app/ui/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

import { CourseService } from 'src/app/services/course.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-course-section',
  templateUrl: './course-section.component.html',
  styleUrls: ['./course-section.component.sass']
})
export class CourseSectionComponent implements OnInit {
  @Input() sectionFormGroup: FormGroup;
  @Input() courseFormGroup: FormGroup;
  @Input() sectionIndex: number;

  private sectionId: string;
  private courseId: string;

  constructor(
    private courseService: CourseService,
    private notificationService: NotificationService,
    private fb: FormBuilder,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.sectionId = this.sectionFormGroup.get('id').value;
    this.courseId = this.courseFormGroup.get('id').value;
  }

  onRemoveSection(index: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: new ConfirmDialogModel(
        'Confirm deletion',
        'Are you sure you want to delete the section and all the associated lectures?'
      ),
      maxWidth: '400px'
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.courseService
          .deleteSection(this.sectionId, this.courseId)
          .subscribe(res => {
            const control = this.courseFormGroup.get('sections') as FormArray;
            control.removeAt(index);
            this.notificationService.showSuccess('Lecture successfully deleted');
          });
      }
    });
  }

  onAddLecture() {
    (this.sectionFormGroup.get('lectures') as FormArray).push(
      this.fb.group({
        id: null,
        title: [null, Validators.required],
        videoUrl: null,
        isFree: false
      })
    );
  }

  drop(event: CdkDragDrop<FormGroup[]>) {
    moveItemInArray(this.sectionFormGroup.get('lectures')['controls'], event.previousIndex, event.currentIndex);
    moveItemInArray(this.sectionFormGroup.controls.lectures.value, event.previousIndex, event.currentIndex);
    this.courseFormGroup.updateValueAndValidity();
  }
}
