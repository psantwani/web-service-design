// Requires
const Mongo = require("./mongo.js");
const Elasticsearch = require("./elasticsearch.js");

// Class Definition
class DatabaseEngine {
  constructor(params) {
    this.type = params.type;
    /* eslint-disable */
    switch (this.type.trim().toLowerCase()) {
      case "elasticsearch":
        this.instance = new Elasticsearch(params);
        break;
      case "mongo":
        this.instance = new Mongo();
        break;
      default:
        throw new Error("Function not implemented");
    }
    /* eslint-enable */
  }

  // Function to pseudoConstructor.
  async pseudoConstructor(params) {
    const response = await this.instance.pseudoConstructor(params);
    return response;
  }

  createModel(params) {
    const response = this.instance.createModel(params);
    return response;
  }

  // Function to insert the record.
  async insert(params) {
    const response = await this.instance.insert(params);
    return response;
  }

  // Function to get the records
  async fetch(params) {
    const response = await this.instance.fetch(params);
    return response;
  }

  // Function to Update the record.
  async modify(params) {
    const response = await this.instance.modify(params);
    return response;
  }
}

// Exports
module.exports = DatabaseEngine;
