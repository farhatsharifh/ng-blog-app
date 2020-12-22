const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

exports.createUser =  (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then((hashPassword) => {
      const user = new User({
        email: req.body.email,
        password: hashPassword
      });
      user.save()
        .then((result) => {
          res.status(201).json({
            message: 'User created successfully!',
            result: result
          });
        })
        .catch(err => {
          res.status(500).json({
            message: "User already exists!"
          });
        });
    });
}

exports.userLogin = (req, res, next) => {
  let fetchedUser;
  User.findOne({ email: req.body.email })
    .then(user => {
      if(!user) {
        return res.status(401).json({
          message: "Authentication failed"
        });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {
      if(!result) {
        return res.status(401).json({
          message: "Authentication failed"
        });
      }
      const token = jwt.sign(
        { email: fetchedUser.email, userId: fetchedUser._id },
        process.env.JWT_KEY,
        { expiresIn: "1h" }
      );
      res.status(201).json({
        token: token,
        expiresIn: 3600,
        userId: fetchedUser._id
      });
    })
    .catch(err => {
      return res.status(401).json({
        message: "Invalid authentication credentials!"
      });
    });
}

