const path = require('path');
const fs = require('fs');
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const graphqlHttp = require('express-graphql');
const { graphqlUploadExpress } = require('graphql-upload')
const multer = require('multer');
const morgan = require('morgan');
const graphqlSchema = require('./graphql/schema');
const graphqlResolver = require('./graphql/resolvers');
const { clearMedia } = require("./utils/file");

const environment = process.env.NODE_ENV || 'development';

const app = express();

// loggin with morgan
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, 'access.log'),
  { flags: 'a' }
);
app.use(morgan('combined', { stream: accessLogStream }));

app.use(bodyParser.json());

// static resources
if (!fs.existsSync("./images")){
  fs.mkdirSync("./images");
}
if (!fs.existsSync("./videos")){
  fs.mkdirSync("./videos");
}
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/videos', express.static(path.join(__dirname, 'videos')));
app.use('/', express.static(path.join(__dirname, 'angular')));

// CORS headers
app.use((req, res, next) => {
  if (environment !== 'production') {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "OPTIONS, GET, POST, PUT, PATCH, DELETE"
    );
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  }
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

// video upload
const videoStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'videos');
  },
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + '-' + file.originalname);
  }
});

const videoFilter = (req, file, cb) => {
  if (file.mimetype === 'video/mp4') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
app.use(multer({ storage: videoStorage, fileFilter: videoFilter }).single('video'));

app.post('/uploadVideoLecture', (req, res, next) => {
  if (!req.file) {
    return res.status(200).json({ message: 'No video provided' });
  }
  if (req.body.oldPath) {
    clearMedia(req.body.oldPath);
  }
  return res
    .status(201)
    .json({ message: 'Video successfully uploaded', filePath: req.file.path });
});

// GraphQL
app.use(
  '/graphql',
  graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }),
  graphqlHttp({
    schema: graphqlSchema,
    rootValue: graphqlResolver,
    graphiql: true,
    customFormatErrorFn(err) {
      console.log(err)
      if (!err.originalError) {
        return err;
      }
      const data = err.originalError.data;
      const message = `${err.message} on ${err.path}` || 'An error occurred.';
      const code = err.originalError.code || 500;
      return { message: message, status: code, data: data };
    }
  })
);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "angular", "index.html"));
});

mongoose
  .connect(process.env.MONGODB_CONNECTION_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
  .then(result => {
    app.listen(process.env.PORT || 8080);
  })
  .catch(err => console.log(err));
