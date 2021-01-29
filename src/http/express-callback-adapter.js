import errorHandler from './error-handler.js';

const adaptRequest = (request) => {
  const {
    body, query, params,
  } = request;

  return {
    body,
    query,
    params,
    headers: {
      authorization: request.get('Authorization'),
    },
  };
};

const makeCallback = (callback) => async (req, res) => {
  const httpRequest = adaptRequest(req);

  try {
    const { statusCode, data } = await callback(httpRequest);
    res.status(statusCode).json(data);
  } catch (error) {
    const { statusCode, message } = errorHandler(error);
    res.status(statusCode).json({ message });
  }
};

export default makeCallback;
export { makeCallback, adaptRequest };
