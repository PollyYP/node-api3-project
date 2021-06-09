const db = require("../users/users-model");

function logger(req, res, next) {
  // DO YOUR MAGIC
  const time = new Date().toISOString();
  console.log(
    `${req.ip} made a ${req.method} request to ${req.url} at ${time}`
  );
  next();
}

async function validateUserId(req, res, next) {
  // DO YOUR MAGIC

  try {
    const user = await db.getById(req.params.id);

    if (user) {
      req.user = user;
      next();
    } else {
      res.status(404).json({
        message: "User not found",
      });
    }
  } catch (err) {
    next(err);
  }
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC

  if (!req.body.name) {
    return res.status(400).json({
      message: "missing required name field",
    });
  }
  next();
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC

  if (!req.body.text) {
    return res.status(400).json({
      message: "missing required text field",
    });
  }
  next();
}

// do not forget to expose these functions to other modules

module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost,
};
