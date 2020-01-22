const fs = require("fs");
const validator = require("validator");
const { GraphQLUpload } = require("graphql-upload");
const { getVideoDurationInSeconds } = require('get-video-duration');

const { clearMedia } = require("../utils/file");
const { toHHMMSS } = require("../utils/datetime");

const Course = require("../models/course");
const Lecture = require("../models/lecture");

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

const validateCourseInput = courseInput => {
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
}

module.exports = {
  Upload: GraphQLUpload,

  courses: async function() {
    const courses = await Course.find().sort({ createdAt: -1 });
    return courses.map(c => {
      return {
        ...c._doc,
        _id: c._id.toString()
      };
    });
  },

  createCourse: async function({ courseInput }, req) {
    validateCourseInput(courseInput);

    const { filename, mimetype, createReadStream } = await courseInput.image;
    const stream = createReadStream();
    const pathObj = await storeFS({ stream, filename });
    const fileLocation = pathObj.path;

    const course = new Course({
      ...courseInput,
      imageUrl: fileLocation
    });

    const createdCourse = await course.save();
    return {
      ...createdCourse._doc,
      _id: createdCourse._id.toString(),
      createdAt: createdCourse.createdAt.toISOString(),
      updatedAt: createdCourse.updatedAt.toISOString()
    };
  },

  course: async function({ id }, req) {
    const course = await Course.findById(id).populate('sections.lectures');
    return course;
  },

  updateCourse: async function({ id, courseInput }, req) {
    const course = await Course.findById(id);
    if (!course) {
      const error = new Error('No course found');
      error.code = 404;
      throw error;
    }

    validateCourseInput(courseInput);

    course.title = courseInput.title;
    course.subtitle = courseInput.subtitle;
    course.description = courseInput.description;
    course.price = courseInput.price;
    // saving lectures
    for (const section of courseInput.sections) {
      for (const lecture of section.lectures) {
        let lectureDocument;
        if (lecture.id) {
          lectureDocument = await Lecture.findById(lecture.id);
          if (!lectureDocument) {
            const error = new Error('No lecture found with ID ' + lecture.id);
            error.code = 404;
            throw error;
          }
        } else {
          lectureDocument = new Lecture();
        }

        const oldVideoUrl = lectureDocument.videoUrl;
        lectureDocument.title = lecture.title;
        lectureDocument.videoUrl = lecture.videoUrl;
        lectureDocument.isFree = lecture.isFree;
        if (! lectureDocument.duration || oldVideoUrl !== lecture.videoUrl) {
          const duration = await getVideoDurationInSeconds(lecture.videoUrl);
          lectureDocument.duration = toHHMMSS(duration);
        }
        const savedLecture = await lectureDocument.save();
        lecture.id = savedLecture.id;

        if (oldVideoUrl && oldVideoUrl !== lecture.videoUrl) {
          clearMedia(oldVideoUrl);
        }
      }
    }
    // saving sections
    course.sections = courseInput.sections.map(section => {
      return {
        ...section,
        lectures: section.lectures.map(lecture => {
          return lecture.id ? lecture.id : null // save lecture ids only
        })
      }
    });

    const uploadedImage = await courseInput.image;

    if (uploadedImage) {
      const oldImageUrl = course.imageUrl;
      const { filename, mimetype, createReadStream } = uploadedImage;
      const stream = createReadStream();
      const pathObj = await storeFS({ stream, filename });
      const fileLocation = pathObj.path;
      course.imageUrl = fileLocation;
    }

    const updatedCourse = await course.save();

    if (updatedCourse && typeof oldImageUrl !== 'undefined') {
      clearMedia(oldImageUrl);
    }

    return {
      ...updatedCourse._doc,
      _id: updatedCourse._id.toString(),
      createdAt: updatedCourse.createdAt.toISOString(),
      updatedAt: updatedCourse.updatedAt.toISOString()
    };
  },

  deleteCourse: async function({ id }, req) {
    const course = await Course.findById(id);
    clearMedia(course.imageUrl);
    await Course.findByIdAndRemove(id);
    return true;
  }
};
