const express = require('express');

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
  next();
});

app.use('/api/posts', (req, res, next) => {
  const posts = [
    {
      id: 'hiah8324ye',
      title: 'My first post',
      content: 'using Express framework for building the backend'
    },
    {
      id: 'hiah8324ye',
      title: 'Another post',
      content: 'Enhancing the backend'
    }
  ];
  return res.status(200).json({
    message: 'Posts fetched successfully',
    posts: posts
  });
});

module.exports = app;
