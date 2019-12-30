const validator = require("validator");

const Course = require("../models/course");

module.exports = {
  createCourse: async function({ courseInput }, req) {
    const errors = [];
    if (
      validator.isEmpty(courseInput.title) ||
      !validator.isLength(courseInput.title, { min: 5 })
    ) {
      errors.push({ message: "Title is invalid." });
    }
    if (
      validator.isEmpty(courseInput.subtitle) ||
      !validator.isLength(courseInput.subtitle, { min: 5 })
    ) {
      errors.push({ message: "Subtitle is invalid." });
    }
    if (errors.length > 0) {
      const error = new Error("Invalid input.");
      error.data = errors;
      error.code = 422;
      throw error;
    }
    const course = new Course({
      title: courseInput.title,
      subtitle: courseInput.subtitle,
      description: courseInput.description,
      imageUrl: courseInput.imageUrl,
      rating: 0,
      price: courseInput.price
    });

    // would it work?
    
    // const course = new Course({
    //   ...courseInput
    // });

    const createdCourse = await course.save();
    return {
      ...createdCourse._doc,
      _id: createdCourse._id.toString(),
      createdAt: createdCourse.createdAt.toISOString(),
      updatedAt: createdCourse.updatedAt.toISOString()
    };
  }
};
