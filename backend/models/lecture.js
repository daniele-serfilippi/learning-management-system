const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const lectureSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    videoUrl: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    isFree: {
        type: Boolean,
        required: true,
        default: false
    }
});

module.exports = mongoose.model("Lecture", lectureSchema);