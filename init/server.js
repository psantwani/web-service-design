/** Requires */
const express = require("express");
const bodyParser = require("body-parser");
const router = require("../router.js");
const path = require("path");

/** Functions */
function init(appCtx) {
  const app = express();

  app.set("appCtx", appCtx);

  app.use(bodyParser.json());
  app.use("/", router);
  app.set("view engine", "ejs");
  app.use(express.static(path.join(process.cwd(), "public")));

  console.log(`Listening @ ${appCtx.config.port}`);
  app.listen(`${appCtx.config.port}`);

  app.get("/app", (req, res) => {
    res.render("index");
  });
}

/** Exports */
module.exports.init = init;
