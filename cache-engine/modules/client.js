// Require
const Redis = require("./redis");

class CacheEngine {
  constructor(params) {
    this.type = params.type;
    /* eslint-disable */
    switch (this.type.trim().toLowerCase()) {
      case "redis":
        this.instance = new Redis(params);
        break;

      default:
        return "Requested cache not implemented";
    }
    /* eslint-enable */
  }

  async insert(params) {
    const response = await this.instance.insert(params);
    return response;
  }

  async fetch(params) {
    const response = await this.instance.fetch(params);
    return response;
  }

  async remove(params) {
    const response = await this.instance.remove(params);
    return response;
  }

  async incr(params) {
    const response = await this.instance.incr(params);
    return response;
  }

  async decr(params) {
    const response = await this.instance.decr(params);
    return response;
  }

  async ttl(params) {
    const response = await this.instance.ttl(params);
    return response;
  }
}

// Exports
module.exports = CacheEngine;
