/** Routes */

const create = async (request, response) => {
  // Forms Input
  const appCtx = request.app.get("appCtx");
  const { input } = appCtx.helpers.formInput(
    request.params,
    request.query,
    request.body
  );

  // BL
  const { err, result } = await appCtx.helpers.invoker(
    appCtx.controllers.sample.create(input)
  );
  if (err) {
    throw err;
  }

  // Returns
  response.status(200);
  return response.send(result);
};

const retrieve = async (request, response) => {
  // Forms Input
  const appCtx = request.app.get("appCtx");
  const { input } = appCtx.helpers.formInput(
    request.params,
    request.query,
    request.body
  );

  // BL
  const { err, result } = await appCtx.helpers.invoker(
    appCtx.controllers.sample.retrieve(input)
  );
  if (err) {
    throw err;
  }

  // Returns
  response.status(200);
  return response.send(result);
};

module.exports = {
  create,
  retrieve
};
