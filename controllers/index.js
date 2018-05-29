/**
 * Your business modules comes here
 */

/** Requires */
const Sample = require("./modules/sample");

/** Class */
class Controller {
  constructor(params) {
    const { appCtx } = params;
    this.sample = new Sample(appCtx);
    // add more modules here - Sample2, Sample3, etc
  }
}

/** Exports */
module.exports = Controller;
