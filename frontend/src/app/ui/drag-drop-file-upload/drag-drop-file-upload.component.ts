import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { CourseService } from 'src/app/courses/course.service';

@Component({
  selector: 'app-drag-drop-file-upload',
  templateUrl: './drag-drop-file-upload.component.html',
  styleUrls: ['./drag-drop-file-upload.component.sass']
})
export class DragDropFileUploadComponent implements OnInit {
  @Input() placeholder = 'Drag file or click';
  @HostBinding('class.error') error = false;

  successMsg: string;
  progress = 0;

  constructor(
    private courseService: CourseService

  ) { }

  ngOnInit() {
  }

  upload(e) {
    const fileList: any = Array.from(e);

    if (fileList.length > 1 || fileList[0].type !== 'video/mp4') {
      this.error = true;
      return;
    }
    this.error = false;
    const mp4File = fileList[0];

    // Upload to server
    this.courseService.uploadVideoLecture('0', '0', mp4File)
      .subscribe((event: HttpEvent<any>) => {
        switch (event.type) {
          case HttpEventType.Sent:
            console.log('Request has been made!');
            break;
          case HttpEventType.ResponseHeader:
            console.log('Response header has been received!');
            break;
          case HttpEventType.UploadProgress:
            this.progress = Math.round(event.loaded / event.total * 100);
            console.log(`Uploaded! ${this.progress}%`);
            break;
          case HttpEventType.Response:
            this.progress = 0;
            this.successMsg = 'Video uploaded!';
        }
      });
  }

}
