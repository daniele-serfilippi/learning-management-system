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
      }
    ]
  },
  {
    path: '',
    redirectTo: '/courses',
    pathMatch: 'full',
    canActivate: [AuthGuard]
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
    canActivate: [AuthGuard],
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
