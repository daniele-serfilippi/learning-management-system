import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { MaterialModule } from './ui/material.module';
import { GraphQLModule } from './graphql.module';
import { AppRoutingModule } from './app-routing.module';

import { GlobalErrorHandler } from './errorHandlers/global-error-handler';
import { ServerErrorInterceptor } from './errorHandlers/server-error.interceptor';

import { AppComponent } from './app.component';
import { CoursesComponent } from './courses/courses.component';
import { CourseFormComponent } from './courses/course-form/course-form.component';
import { CoursesListComponent } from './courses/courses-list/courses-list.component';
import { ConfirmDialogComponent } from './ui/confirm-dialog/confirm-dialog.component';
import { CourseSectionComponent } from './courses/course-form/course-section/course-section.component';
import { CourseLectureComponent } from './courses/course-form/course-section/course-lecture/course-lecture.component';
import { DragDropVideoUploadComponent } from './ui/drag-drop-video-upload/drag-drop-video-upload.component';
import { DragDropVideoUploadDirective } from './ui/drag-drop-video-upload/drag-drop-video-upload.directive';
import { QuillMaterialComponent } from './ui/quill-material/quill-material.component';

@NgModule({
  declarations: [
    AppComponent,
    CoursesComponent,
    CourseFormComponent,
    CoursesListComponent,
    ConfirmDialogComponent,
    CourseSectionComponent,
    CourseLectureComponent,
    DragDropVideoUploadComponent,
    DragDropVideoUploadDirective,
    QuillMaterialComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    GraphQLModule
  ],
  providers: [
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    { provide: HTTP_INTERCEPTORS, useClass: ServerErrorInterceptor, multi: true }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
