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
import Storage from '@aws-amplify/storage';

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
import { LoaderComponent } from './shared/ui/loader/loader.component';
import { AuthComponent } from './auth/auth.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { ConfirmCodeComponent } from './auth/confirm-code/confirm-code.component';
import { ProfileComponent } from './auth/profile/profile.component';
import { AvatarComponent } from './auth/profile/avatar/avatar.component';
import { AuthService } from './auth/auth.service';
import { LayoutModule } from '@angular/cdk/layout';
import { NavComponent } from './shared/nav/nav.component';
import { TopBarComponent } from './shared/top-bar/top-bar.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatPasswordStrengthModule } from '@angular-material-extensions/password-strength';
import { PasswordStrengthConfirmComponent } from './auth/password-strength-confirm/password-strength-confirm.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { ResetPasswordWithCodeComponent } from './auth/reset-password-with-code/reset-password-with-code.component';

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
    BottomToolbarComponent,
    LoaderComponent,
    AuthComponent,
    SignInComponent,
    SignUpComponent,
    ConfirmCodeComponent,
    ProfileComponent,
    AvatarComponent,
    NavComponent,
    TopBarComponent,
    PasswordStrengthConfirmComponent,
    ForgotPasswordComponent,
    ResetPasswordWithCodeComponent
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
    AmplifyAngularModule,
    LayoutModule,
    FlexLayoutModule,
    MatPasswordStrengthModule
  ],
  providers: [
    AuthService,
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    { provide: HTTP_INTERCEPTORS, useClass: ServerErrorInterceptor, multi: true },
    {
      provide: AmplifyService,
      useFactory:  () => {
        return AmplifyModules({
          Auth,
          Storage
        });
      }
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [ LoaderComponent ]
})
export class AppModule { }
