const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const lectureSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    videoUrl: {
        type: String,
        required: false
    },
    duration: {
        type: String,
        required: false
    },
    isFree: {
        type: Boolean,
        required: false,
        default: false
    }
},
{ timestamps: true }
);

module.exports = mongoose.model("Lecture", lectureSchema);