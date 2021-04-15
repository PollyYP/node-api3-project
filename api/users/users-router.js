const express = require("express");
const users = require("./users-model");
const posts = require("../posts/posts-model");

const {
  validateUserId,
  validateUser,
  validatePost,
} = require("../middleware/middleware");

// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required

const router = express.Router();

router.get("/", async (req, res, next) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  try {
    const allUsers = await users.get();
    res.status(200).json(allUsers);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", validateUserId(), (req, res) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
  res.json(req.user);
});

router.post("/", validateUser(), async (req, res, next) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
  try {
    const newUser = await users.insert(req.body);
    res.status(201).json(newUser);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", validateUserId(), validateUser(), async (req, res, next) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  try {
    const updatedUser = users.update(req.params.id, req.body);
    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", validateUserId(), async (req, res, next) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  try {
    const deleted = await users.remove(req.params.id);
    console.log(deleted);
    res.status(200).json({
      message: "The user has been deleted",
    });
  } catch (err) {
    next(err);
  }
});

router.get("/:id/posts", validateUserId(), async (req, res, next) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id

  try {
    const allPosts = await users.getUserPosts(req.params.id);
    res.status(200).json(allPosts);
  } catch (err) {
    next(err);
  }
});

router.post(
  "/:id/posts",
  validateUserId(),
  validatePost(),
  async (req, res, next) => {
    // RETURN THE NEWLY CREATED USER POST
    // this needs a middleware to verify user id
    // and another middleware to check that the request body is valid
    try {
      const newPost = await posts.insert(req.body);
      res.status(200).json(newPost);
    } catch (err) {
      next(err);
    }
  }
);

// do not forget to export the router

module.exports = router;
