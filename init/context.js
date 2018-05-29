/**
 * Creating a context object that composes depedencies across the application,
 * so that the object can be passed to all the app as a argument (Dependency injection)
 */
/** Requires */
const DatabaseEngine = require("../database-engine");
const CacheEngine = require("../cache-engine");
const Controller = require("../controllers");
const DataAccessLayer = require("../data-access-layer");
const helpers = require("../libs/helpers");

/** Function (main) */
function init(config) {
  return new Promise(async (resolve, reject) => {
    // Initialises Datastores (sampleDB, Cache)
    let { err, result } = await helpers.invoker(
      initDS({
        sampleDBConfig: config.sampleDBConfig,
        cacheConfig: config.cache
      })
    );
    if (err) {
      reject(err);
    }
    let { sampleDB, cache } = result;

    // Initialises Controllers (Business Logic)
    ({ err, result } = initControllers({ config, sampleDB, cache }));
    if (err) {
      return reject(err);
    }
    const { controllers } = result;

    // Initializes DAL (Data access layer)
    const dataAccessLayer = new DataAccessLayer({ sampleDB, cache });

    // Returns
    return resolve({ config, controllers, dataAccessLayer, helpers });
  });
}

/** Functions (child) */
async function initDS(params) {
  return new Promise(async (resolve, reject) => {
    // Destructures
    const { sampleDBConfig, cacheConfig } = params;

    // Init sampleDB
    let sampleDB;
    let { type, host, port, db, auth } = sampleDBConfig;

    try {
      sampleDB = new DatabaseEngine({ type });
    } catch (err) {
      reject(err);
    }

    await helpers.invoker(sampleDB.pseudoConstructor({ host, port, db, auth }));

    // Init Cache
    let cache;
    ({ type, host, port, db } = cacheConfig);

    try {
      cache = new CacheEngine({ type, host, port, db });
    } catch (err) {
      return reject(err);
    }

    // Returns
    return resolve({ sampleDB, cache });
  });
}

function initControllers(params) {
  // Destructures
  const { config, sampleDB, cache } = params;

  // Init BL
  let controllers;
  try {
    controllers = new Controller({ config, sampleDB, cache });
  } catch (err) {
    return {
      err,
      result: null
    };
  }

  // Returns
  return {
    err: null,
    result: { controllers }
  };
}

/** Exports */
module.exports.init = init;
