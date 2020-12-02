const express = require('express');

const app = express();

app.use('/api/posts', (req, res, next) => {
  const posts = [
    {
      id: 'hiah8324ye',
      Title: 'My first post',
      Content: 'using Express framework for building the backend'
    },
    {
      id: 'hiah8324ye',
      Title: 'Another post',
      Content: 'Enhancing the backend'
    }
  ];
  return res.status(200).json({
    message: 'Posts fetched successfully',
    posts: posts
  });
});

module.exports = app;
