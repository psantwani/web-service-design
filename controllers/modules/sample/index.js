/** Class */
class Sample {
  constructor(appCtx) {
    this.create = require("./create")(appCtx);
    this.retrieve = require("./retrieve")(appCtx);
    // Add more sub-modules here - delete, modify, etc
  }
}

/** Exports */
module.exports = Sample;
