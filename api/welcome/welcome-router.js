const express = require("express");

const router = express.Router();

router.get("/welcome", (req, res) => {
  res.status(200).json({
    message: `Welcome ${process.env.COHORT}`,
    fact: process.env.FUN_FACT || "I have no fun facts",
    port: process.env.PORT,
  });
});

module.exports = router;
