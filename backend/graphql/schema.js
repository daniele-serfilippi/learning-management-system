const { buildSchema } = require('graphql');

module.exports = buildSchema(`
    scalar Upload

    type Course {
        _id: ID!
        title: String!
        subtitle: String!
        description: String!
        imageUrl: String!
        rating: Int
        price: Float
        sections: [Section!]!
        createdAt: String!
        updatedAt: String!
    }

    type Section {
        _id: ID!
        title: String!
        lectures: [Lecture!]!
    }

    type Lecture {
        _id: ID!
        title: String
        type: String
        videoUrl: String
        duration: String
        text: String
        isFree: Boolean
    }

    input CourseInput {
        title: String!
        subtitle: String!
        description: String!
        image: Upload
        price: Float
        sections: [SectionInput!]!
    }

    input SectionInput {
        id: ID
        title: String!
        lectures: [LectureInput]
    }

    input LectureInput {
        id: ID
        title: String!
        type: String
        videoUrl: String
        text: String
        isFree: Boolean
    }

    type RootQuery {
        courses: [Course!]!
        course(id: ID!): Course!
    }

    type RootMutation {
        createCourse(courseInput: CourseInput!): Course!
        updateCourse(id: ID!, courseInput: CourseInput!): Course!
        deleteCourse(id: ID!): Boolean
        deleteSection(id: ID!, courseId: ID!): Boolean
        deleteLecture(id: ID!): Boolean
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);
