const express = require("express");
const { logger } = require("./middleware/middleware");
const usersRouter = require("./users/users-router");
const cors = require("cors");
const server = express();

// remember express by default cannot parse JSON in request bodies

// global middlewares and the user's router need to be connected here

server.use(express.json());
server.use(logger);
server.use(usersRouter);
server.use(cors());

// server.get("/", (req, res) => {
//   res.send(`<h2>Let's write some middleware!</h2>`);
// });

server.use((err, req, res, next) => {
  console.log(err);

  res.status(500).json({
    message: "Something went wrong",
  });
});

module.exports = server;
