import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoursesComponent } from 'src/app/courses/courses.component';
import { CourseFormComponent } from 'src/app/courses/course-form/course-form.component';
import { CoursesListComponent } from 'src/app/courses/courses-list/courses-list.component';
import { AuthComponent } from 'src/app/auth/auth.component';
import { SignInComponent } from 'src/app/auth/sign-in/sign-in.component';
import { UnauthGuard } from 'src/app/auth/unauth.guard';
import { SignUpComponent } from 'src/app/auth/sign-up/sign-up.component';
import { ConfirmCodeComponent } from 'src/app/auth/confirm-code/confirm-code.component';
import { ProfileComponent } from 'src/app/auth/profile/profile.component';
import { AuthGuard } from 'src/app/auth/auth.guard';
import { ForgotPasswordComponent } from 'src/app/auth/forgot-password/forgot-password.component';
import { ResetPasswordWithCodeComponent } from 'src/app/auth/reset-password-with-code/reset-password-with-code.component';
import { EditPasswordComponent } from 'src/app/auth/edit-password/edit-password.component';

const routes: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      {
        path: 'signin',
        component: SignInComponent,
        canActivate: [UnauthGuard]
      },
      {
        path: 'forgot-password',
        component: ForgotPasswordComponent,
        canActivate: [UnauthGuard]
      },
      {
        path: 'reset-password-with-code',
        component: ResetPasswordWithCodeComponent,
        canActivate: [UnauthGuard]
      },
      {
        path: 'signup',
        component: SignUpComponent,
        canActivate: [UnauthGuard]
      },
      {
        path: 'confirm',
        component: ConfirmCodeComponent,
        canActivate: [UnauthGuard]
      },
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'edit-password',
        component: EditPasswordComponent,
        canActivate: [AuthGuard]
      },
      {
        path: '',
        redirectTo: 'profile',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/courses',
    pathMatch: 'full'
  },
  {
    path: 'course',
    component: CoursesComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'create', component: CourseFormComponent },
      { path: 'edit/:id', component: CourseFormComponent },
      { path: '', component: CoursesListComponent }
    ]
  },
  {
    path: 'courses',
    component: CoursesComponent,
    children: [
      { path: '', component: CoursesListComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
