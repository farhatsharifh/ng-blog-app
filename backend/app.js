const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Post = require('./models/post');

const app = express();

// to connect to mongodb atlas
// mongoose.connect("mongodb+srv://farhat:abc111@cluster0.swrsp.mongodb.net/ngblogdb?retryWrites=true&w=majority", { useNewUrlParser: true , useUnifiedTopology: true })
mongoose.connect("mongodb://localhost:27017/ngblogdb", { useNewUrlParser: true , useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to database!');
  })
  .catch((e) => {
    console.log('Connecntion failed due to ', e);
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
  next();
});

app.post("/api/posts", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save()
    .then(newPost => {
      res.status(201).json({
        message: 'New post added successfully!',
        postId: newPost._id
      });
    });
});

app.get("/api/posts", (req, res, next) => {
  Post.find()
    .then(documents => {
      res.status(200).json({
        message: 'Posts fetched successfully',
        posts: documents
      });
    });
});

app.get("/api/posts/:id", (req, res, next) => {
  Post.findById(req.params.id)
  .then(post => {
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({message: "Post not found"});
    }
  });
});

app.put("/api/posts/:id", (req, res, next) => {
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content
  });
  Post.updateOne({_id: req.params.id}, post)
    .then(result => {
      console.log(result);
      res.status(200).json({
        message: "Post updated successfully!"
      });
    });
});

app.delete("/api/posts/:id", (req, res, next) => {
  Post.deleteOne({ _id: req.params.id })
    .then((result) => {
      console.log('Delete result ', result);
      res.status(200).json({message: 'Post deleted successfully!'});
    });
});

module.exports = app;
