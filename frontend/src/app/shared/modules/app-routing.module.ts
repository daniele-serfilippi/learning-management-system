import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoursesComponent } from 'src/app/courses/courses.component';
import { CourseFormComponent } from 'src/app/courses/course-form/course-form.component';
import { CoursesListComponent } from 'src/app/courses/courses-list/courses-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/courses', pathMatch: 'full' },
  { path: 'course', component: CoursesComponent, children: [
    { path: 'create', component: CourseFormComponent },
    { path: 'edit/:id', component: CourseFormComponent },
    { path: '', component: CoursesListComponent }
  ]},
  { path: 'courses', component: CoursesComponent, children: [
    { path: '', component: CoursesListComponent }
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
