import {
  Component,
  OnInit,
  Input,
  HostBinding,
  ViewChild,
  ElementRef,
  OnDestroy,
  Output,
  EventEmitter
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-drag-drop-file-upload',
  templateUrl: './drag-drop-file-upload.component.html',
  styleUrls: ['./drag-drop-file-upload.component.sass']
})
export class DragDropFileUploadComponent implements OnInit, OnDestroy {
  @ViewChild('fileField') fileField: ElementRef<HTMLElement>;
  @Input() placeholder = 'Drag file or click';
  @Input() onChangeVideo: Observable<void>;
  @Output() videoSelected = new EventEmitter<File>();
  @HostBinding('class.error') error = false;

  private onChangeVideoSubscription: Subscription;

  constructor() { }

  ngOnInit() {
    this.onChangeVideoSubscription = this.onChangeVideo.subscribe(
      () => this.fileField.nativeElement.click()
    );
  }

  ngOnDestroy() {
    this.onChangeVideoSubscription.unsubscribe();
  }

  onReceivingFiles(e) {
    const fileList: any = Array.from(e);

    if (fileList.length > 1 || fileList[0].type !== 'video/mp4') {
      this.error = true;
      return;
    }
    this.error = false;
    this.videoSelected.emit(fileList[0]);
  }

}
