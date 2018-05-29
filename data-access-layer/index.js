/**
 * The Data Access Layer is hard-tied to the datastore (MongoDB, etc.) of our choice
 * and manages every interaction with it. It also makes moving from one
 * database to another a much less painful process.
 */
const helpers = require("../libs/helpers");
const schema = require("./schema");

/** Functions */
class DataAccessLayer {
  constructor(params) {
    // Creates Sample Model
    let { err, result } = params.sampleDB.createModel({
      table: "samples",
      schema: schema.sample
    });
    if (err) {
      throw err;
    }
    const { model: sampleModel } = result;

    // Assigns
    this.sampleDB = params.sampleDB;
    this.models = {
      sample: sampleModel
    };
  }

  createEntity(params) {
    return new Promise(async (resolve, reject) => {
      // DS Call
      let { err, result } = await helpers.invoker(this.sampleDB.insert(params));
      if (err) {
        return reject(err);
      }
      const { id } = result;

      // Returns
      return resolve({ id });
    });
  }

  fetchEntity(params) {
    return new Promise(async (resolve, reject) => {
      // DS Call
      let { err, result } = await helpers.invoker(this.sampleDB.fetch(params));
      if (err) {
        return reject(err);
      }
      const { record } = result;

      // Returns
      return resolve({ record });
    });
  }

  updateEntity(params) {
    return new Promise(async (resolve, reject) => {
      // DS Call
      let { err, result } = await helpers.invoker(this.sampleDB.modify(params));
      if (err) {
        return reject(err);
      }
      const { id } = result;

      // Returns
      return resolve({ id });
    });
  }
}

/** Exports */
module.exports = DataAccessLayer;
