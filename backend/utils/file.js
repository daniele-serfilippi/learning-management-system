const path = require("path");
const fs = require("fs");

const clearMedia = filePath => {
  if (filePath) {
    filePath = path.join(__dirname, "..", filePath);
    fs.unlink(filePath, err => console.log(err));
  }
};

const storeImage = ({ stream, filename }) => {
  const uploadDir = "images";
  const newFilename = new Date().getTime() + "-" + filename;
  const imagePath = path.join(uploadDir, newFilename);

  return new Promise((resolve, reject) =>
    stream
      .on("error", error => {
        if (stream.truncated)
          // delete the truncated file
          fs.unlinkSync("./" + imagePath);
        reject(error);
      })
      .pipe(fs.createWriteStream("./" + imagePath))
      .on("error", error => reject(error))
      .on("finish", () => resolve({ imagePath }))
  );
};

exports.clearMedia = clearMedia;
exports.storeImage = storeImage;
