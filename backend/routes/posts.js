const express = require('express');

const checkAuth = require("../middleware/check-auth");
const extractFile = require("../middleware/file");
const PostsController = require("../controllers/posts");

const router = express.Router();

router.post("", checkAuth, extractFile, PostsController.createPost);

router.get("", PostsController.getAllPosts);

router.get("/:id", PostsController.getPost);

router.put("/:id", checkAuth, extractFile, PostsController.updatePost);

router.delete("/:id", checkAuth, PostsController.deletePost);

module.exports = router;
