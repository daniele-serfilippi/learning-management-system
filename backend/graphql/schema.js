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
        title: String!
        lectures: [Lecture!]!
    }

    type Lecture {
        _id: ID!
        title: String!
        videoUrl: String!
        duration: String
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
        title: String!
        lectures: [LectureInput]
    }

    input LectureInput {
        title: String!
        videoUrl: String!
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
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);
