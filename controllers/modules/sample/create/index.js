const errors = require("./errors");
const schema = require("./schema");
let ctx;

/** Write Business Logic here */
const create = async params => {
  return new Promise((resolve, reject) => {
    // code here
    resolve({ sub_module: "create" });
  });
};

/** Exports */
module.exports = appCtx => {
  ctx = appCtx;
  return create;
};
