//load variables on .env files
require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const rfs = require("rotating-file-stream");

//setup morgan

//logging request to file using rfs stream
const rfsStream = rfs.createStream(process.env.LOG_FILE || "log.txt", {
  //rotate evvery 10 megabytes written
  size: process.env.LOG_SIZE || "10M",
  //rotate daily
  interval: process.env.LOG_INTERVAL || "1d",
  //compress rotated files
  compress: "gzip",
});

//add log streams to morgan to log in files
app.use(morgan(process.env.LOG_FORMAT || "dev"), {
  stream: process.env.LOG_FILE ? rfsStream : process.stdout,
});

//another logger to show logs in console
if (process.env.LOG_FILE) {
  app.use(morgan(process.env.LOG_FORMAT || "dev"));
}

// Create an express app
const app = express();

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
