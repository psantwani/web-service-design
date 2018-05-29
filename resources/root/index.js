/** Requires */
const express = require("express");
const router = express.Router();

/** Routes */
router.get("/", async (request, response) => {
  response.send({
    message: "Welcome, visitor!"
  });
});

router.get("/ping", async (request, response) => {
  response.status(200);
  response.send("pong");
});

/** Exports */
module.exports = router;
