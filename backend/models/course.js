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
    rating: {
      type: Number,
      required: false
    },
    price: {
      type: Number,
      required: true
    },
    sections: [{
      title: {
        type: String,
        required: true
      },
      lectures: {
        type: Array,
        requred: true
      }
    }]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);
