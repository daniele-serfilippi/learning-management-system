import { Directive, EventEmitter, Output, HostListener, HostBinding } from '@angular/core';

@Directive({
  selector: '[appDragDropVideoUpload]'
})
export class DragDropVideoUploadDirective {

  @Output() fileDropped = new EventEmitter<any>();

  @HostBinding('class.hover') hover = false;

  // Dragover Event
  @HostListener('dragover', ['$event']) dragOver(event) {
    event.preventDefault();
    event.stopPropagation();
    this.hover = true;
  }

  // Dragleave Event
  @HostListener('dragleave', ['$event']) dragLeave(event) {
    event.preventDefault();
    event.stopPropagation();
    this.hover = false;
  }

  // Drop Event
  @HostListener('drop', ['$event']) drop(event) {
    event.preventDefault();
    event.stopPropagation();
    this.hover = false;
    const files = event.dataTransfer.files;
    if (files.length > 0) {
      this.fileDropped.emit(files);
    }
  }

}
