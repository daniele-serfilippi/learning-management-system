const path = require("path");
const fs = require("fs");

const clearMedia = filePath => {
  if (filePath) {
    filePath = path.join(__dirname, "..", filePath);
    fs.unlink(filePath, err => console.log(err));
  }
};

exports.clearMedia = clearMedia;
