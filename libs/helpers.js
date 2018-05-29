// Wrapper for async requests
async function invoker(prom) {
  try {
    const result = await prom;
    return {
      err: null,
      result: result
    };
  } catch (err) {
    return {
      err: err,
      result: null
    };
  }
}

// Extracts payload from an API request
function formInput(params, query, body) {
  const input = Object.assign(params, query, body);
  return { input };
}

module.exports = { invoker, formInput };
