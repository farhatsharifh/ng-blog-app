const express = require('express');

const app = express();

app.use((req, res, next) => {
  console.log('first req');
  next();
});

app.use((req, res, next) => {
  res.send("my response back");
});

module.exports = app;
