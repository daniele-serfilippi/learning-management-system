import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Course } from 'src/app/shared/models/course.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(
    private apollo: Apollo,
    private http: HttpClient
  ) { }

  getCourses() {
    const query = gql`
      {
        courses {
          _id
          title
          subtitle
          imageUrl
          createdAt
        }
      }
    `;

    return this.apollo.query({
      query,
      fetchPolicy: 'network-only'
    });
  }

  createCourse(course: Course) {
    const mutation = gql`
      mutation createCourse(
        $title: String!,
        $subtitle: String!,
        $description: String!,
        $image: Upload!,
        $price: Float,
        $sections: [SectionInput!]!
      ) {
          createCourse(courseInput: {
            title: $title,
            subtitle: $subtitle,
            description: $description,
            image: $image,
            price: $price,
            sections: $sections
          }) {
            _id
          }
      }
    `;

    return this.apollo.mutate({
      mutation,
      variables: {...course},
      context: {
        useMultipart: true
      }
    });
  }

  getCourse(id: string) {
    const query = gql`
      query course($id: ID!){
        course(id: $id) {
          _id
          title
          subtitle
          description
          imageUrl
          price
          rating
          sections {
            _id
            title
            lectures {
              _id
              title
              type
              videoUrl
              duration
              text
              isFree
            }
          }
          createdAt
          updatedAt
        }
      }
    `;

    return this.apollo.query({
      query,
      variables: {id},
      fetchPolicy: 'network-only'
    });
  }

  updateCourse(id: string, course: Course) {
    const mutation = gql`
      mutation updateCourse(
        $id: ID!,
        $title: String!,
        $subtitle: String!,
        $description: String!,
        $image: Upload,
        $price: Float,
        $sections: [SectionInput!]!
      ) {
        updateCourse(
          id: $id,
          courseInput: {
            title: $title,
            subtitle: $subtitle,
            description: $description,
            image: $image,
            price: $price,
            sections: $sections
          }) {
            _id
            title
            subtitle
            description
            imageUrl
            rating
            price
            sections {
              title
              lectures {
                _id
                title
                type
                videoUrl
                duration
                text
                isFree
              }
            }
          }
      }
    `;

    return this.apollo.mutate({
      mutation,
      variables: {...course},
      context: {
        useMultipart: true
      }
    });
  }

  deleteCourse(id: string) {
    const mutation = gql`
      mutation deleteCourse(
        $id: ID!
      ) {
          deleteCourse(id: $id)
      }
    `;

    return this.apollo.mutate({
      mutation,
      variables: {
        id
      }
    });
  }

  deleteSection(id: string, courseId: string) {
    const mutation = gql`
      mutation deleteSection(
        $id: ID!
        $courseId: ID!
      ) {
          deleteSection(id: $id, courseId: $courseId)
      }
    `;

    return this.apollo.mutate({
      mutation,
      variables: {
        id,
        courseId
      }
    });
  }

  deleteLecture(id: string) {
    const mutation = gql`
      mutation deleteLecture(
        $id: ID!
      ) {
          deleteLecture(id: $id)
      }
    `;

    return this.apollo.mutate({
      mutation,
      variables: {
        id
      }
    });
  }

  uploadVideoLecture(video: File, lectureId: string, sectionId: string, courseId: string) {
      const formData = new FormData();
      formData.append('lectureId', lectureId);
      formData.append('sectionId', sectionId);
      formData.append('courseId', courseId);
      formData.append('video', video);

      return this.http.post(environment.backendURL + 'uploadVideoLecture', formData, {
        reportProgress: true,
        observe: 'events'
      }).pipe(
        catchError((error: HttpErrorResponse) => {
          let errorMessage = '';
          if (error.error instanceof ErrorEvent) {
            // Get client-side error
            errorMessage = error.error.message;
          } else {
            // Get server-side error
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
          }
          console.log(errorMessage);
          return throwError(errorMessage);
        })
      );
  }
}
