import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CourseService } from 'src/app/services/course.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-course-lecture',
  templateUrl: './course-lecture.component.html',
  styleUrls: ['./course-lecture.component.sass']
})
export class CourseLectureComponent implements OnInit {
  changeVideoSubject: Subject<void> = new Subject<void>();

  @Input() lectureFormGroup: FormGroup;
  @Input() sectionFormGroup: FormGroup;
  @Input() courseFormGroup: FormGroup;
  @Input() lectureIndex: number;

  progress = 0;
  successMsg = '';
  lectureId: string;
  sectionId: string;
  courseId: string;

  backendURL = environment.backendURL;

  constructor(
    private courseService: CourseService
  ) { }

  ngOnInit() {
    this.lectureId = this.lectureFormGroup.get('id').value;
    this.sectionId = this.sectionFormGroup.get('id').value;
    this.courseId = this.courseFormGroup.get('id').value;
  }

  onVideoSelected(videoFile: File) {
      // Upload to server
      this.courseService
        .uploadVideoLecture(videoFile, this.lectureId, this.sectionId, this.courseId)
        .subscribe((event: HttpEvent<any>) => {
          switch (event.type) {
            case HttpEventType.UploadProgress:
              this.progress = Math.round(event.loaded / event.total * 100);
              break;
            case HttpEventType.Response:
              this.lectureFormGroup.get('videoUrl').setValue(event.body.filePath);
              this.progress = 0;
          }
      });
  }

  onChangeVideo() {
    this.changeVideoSubject.next();
  }

}
