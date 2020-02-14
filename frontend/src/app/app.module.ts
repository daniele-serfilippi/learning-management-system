import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { MaterialModule } from './shared/modules/material.module';
import { GraphQLModule } from './shared/modules/graphql.module';
import { AppRoutingModule } from './shared/modules/app-routing.module';

import { GlobalErrorHandler } from './shared/errorHandlers/global-error-handler';
import { ServerErrorInterceptor } from './shared/errorHandlers/server-error.interceptor';

import { AmplifyAngularModule, AmplifyService, AmplifyModules } from 'aws-amplify-angular';
import Auth from '@aws-amplify/auth';

import { AppComponent } from './app.component';
import { CoursesComponent } from './courses/courses.component';
import { CourseFormComponent } from './courses/course-form/course-form.component';
import { CoursesListComponent } from './courses/courses-list/courses-list.component';
import { ConfirmDialogComponent } from './shared/ui/confirm-dialog/confirm-dialog.component';
import { CourseSectionComponent } from './courses/course-form/course-section/course-section.component';
import { CourseLectureComponent } from './courses/course-form/course-section/course-lecture/course-lecture.component';
import { DragDropVideoUploadComponent } from './shared/ui/drag-drop-video-upload/drag-drop-video-upload.component';
import { DragDropVideoUploadDirective } from './shared/ui/drag-drop-video-upload/drag-drop-video-upload.directive';
import { QuillMaterialComponent } from './shared/ui/quill-material/quill-material.component';
import { BottomToolbarComponent } from './shared/ui/bottom-toolbar/bottom-toolbar.component';

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
    QuillMaterialComponent,
    BottomToolbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    GraphQLModule,
    AmplifyAngularModule
  ],
  providers: [
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    { provide: HTTP_INTERCEPTORS, useClass: ServerErrorInterceptor, multi: true },
    {
      provide: AmplifyService,
      useFactory:  () => {
        return AmplifyModules({
          Auth
        });
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
