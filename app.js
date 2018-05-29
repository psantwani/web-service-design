/** Requires */
const config = require("./config")(process.env.NODE_ENV);
const cluster = require("cluster");
const numCPUs = require("os").cpus().length;
const threads = process.env.NODE_ENV === "development" ? 1 : numCPUs - 1;

const context = require("./init/context");
const server = require("./init/server");

/** Cluster */
if (cluster.isMaster) {
  for (let i = 0; i < threads; i += 1) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`Worker exited: ${worker} \nCode: ${code} \nSignal: ${signal}`);
    // Forks a new process if app crashes
    if (code !== 0) {
      cluster.fork();
    }
  });

  cluster.on("online", worker => {
    console.log(`Worker online: ${worker}`);
  });

  cluster.on("listening", (worker, address) => {
    console.log(`Worker: ${worker}, in listening to address: ${address}`);
  });
} else if (cluster.isWorker) {
  // Init
  (async () => {
    try {
      // Context
      const appCtx = await context.init(config);
      console.log("context initiated successfully");

      // Server
      server.init(appCtx);
    } catch (err) {
      console.log("@main->err", err);
    }
  })();

  // Handles uncaught exception
  process.on("uncaughtException", err => {
    console.log(`Uncaught exception in a thread : ${JSON.stringify(err)}`);
    throw err;
  });

  // Process exits
  process.on("exit", () => {
    console.log("Thread exits");
  });
}
