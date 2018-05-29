let ctx;

/** Write Business Logic here */
const retrieve = async params => {
  return new Promise((resolve, reject) => {
    // code here
    resolve({ sub_module: "retrieve" });
  });
};

/** Exports */
module.exports = appCtx => {
  ctx = appCtx;
  return retrieve;
};
