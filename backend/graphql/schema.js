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
        lessons: [Lesson!]!
    }

    type Lesson {
        _id: ID!
        title: String!
        duration: String!
        videoUrl: String!
        isFree: Boolean
        completed: Boolean
    }

    input CourseInputData {
        title: String!
        subtitle: String!
        description: String!
        image: Upload!
        rating: Float
        price: Float
    }

    type RootQuery {
        courses: [Course!]!
    }

    type RootMutation {
        createCourse(courseInput: CourseInputData!): Course!
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);
