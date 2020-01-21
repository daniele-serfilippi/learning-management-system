const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const courseSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    subtitle: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    imageUrl: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    rating: {
      type: Number,
      required: false,
      default: 0
    },
    sections: [{
      title: {
        type: String,
        required: true
      },
      lectures: [{
        type: Schema.Types.ObjectId,
        ref: 'Lecture',
        required: true
      }]
    }]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);
