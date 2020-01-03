const path = require('path');
const fs = require('fs');

const clearImage = filePath => {
  filePath = path.join(__dirname, '..', filePath);
  fs.unlink(filePath, err => console.log(err));
};

exports.clearImage = clearImage;