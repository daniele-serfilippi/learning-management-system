const fs = require("fs");
const validator = require("validator");
const { GraphQLUpload } = require("graphql-upload");

const Course = require("../models/course");

const storeFS = ({ stream, filename }) => {
  const uploadDir = "images";
  const newFilename = new Date().getTime() + "-" + filename;
  const path = `${uploadDir}/${newFilename}`;
  return new Promise((resolve, reject) =>
    stream
      .on("error", error => {
        if (stream.truncated)
          // delete the truncated file
          fs.unlinkSync("./" + path);
        reject(error);
      })
      .pipe(fs.createWriteStream("./" + path))
      .on("error", error => reject(error))
      .on("finish", () => resolve({ path }))
  );
};

module.exports = {
  Upload: GraphQLUpload,

  createCourse: async function({ courseInput }, req) {
    const errors = [];
    if (validator.isEmpty(courseInput.title)) {
      errors.push({ message: "Title is required." });
    }
    if (validator.isEmpty(courseInput.subtitle)) {
      errors.push({ message: "Subtitle is required." });
    }
    if (validator.isEmpty(courseInput.description)) {
      errors.push({ message: "Description is required." });
    }
    if (validator.isEmpty(courseInput.price.toString())) {
      errors.push({ message: "Price is required." });
    }
    if (errors.length > 0) {
      const error = new Error("Invalid input.");
      error.data = errors;
      error.code = 422;
      throw error;
    }

    const { filename, mimetype, createReadStream } = await courseInput.image;
    const stream = createReadStream();
    const pathObj = await storeFS({ stream, filename });
    const fileLocation = pathObj.path;

    const course = new Course({
      ...courseInput,
      imageUrl: fileLocation,
      rating: 0
    });

    const createdCourse = await course.save();
    return {
      ...createdCourse._doc,
      _id: createdCourse._id.toString(),
      createdAt: createdCourse.createdAt.toISOString(),
      updatedAt: createdCourse.updatedAt.toISOString()
    };
  },

  courses: async function() {
    const courses = await Course.find().sort({ createdAt: -1 });
    return courses.map(c => {
      return {
        ...c._doc,
        _id: c._id.toString()
      };
    });
  },

  deleteCourse: async function() {
    
  }
};
