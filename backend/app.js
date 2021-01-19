const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const postRoutes = require("./routes/posts");
const userRoutes = require("./routes/user");

const app = express();

// to connect to mongodb atlas
/* mongoose.connect("mongodb+srv://farhat:" +
  process.env.MONGO_ATLAS_PW +
  "@cluster0.swrsp.mongodb.net/ngblogdb?retryWrites=true&w=majority",
  { useNewUrlParser: true , useUnifiedTopology: true, useCreateIndex: true })
 */ mongoose.connect("mongodb://localhost:27017/ngblogdb", { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then(() => {
    console.log('Connected to database!');
  })
  .catch((e) => {
    console.log('Connecntion failed due to ', e);
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join("backend/images")));
app.use(cors());

app.use("/api/posts", postRoutes);
app.use("/api/user", userRoutes);

module.exports = app;
