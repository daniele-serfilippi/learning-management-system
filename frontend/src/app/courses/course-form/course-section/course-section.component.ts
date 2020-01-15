import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ConfirmDialogComponent, ConfirmDialogModel } from 'src/app/ui/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-course-section',
  templateUrl: './course-section.component.html',
  styleUrls: ['./course-section.component.sass']
})
export class CourseSectionComponent implements OnInit {
  @Input() sectionFormGroup: FormGroup;
  @Input() courseForm: FormGroup;
  @Input() sectionIndex: number;

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
  ) { }

  ngOnInit() { }

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
        const control = this.courseForm.controls['sections'] as FormArray;
        control.removeAt(index);
      }
    });
  }

  onAddLecture() {

  }
}
