const throwError = (statusCode, message) => {
  const error = new Error(message);
  let status = parseInt(statusCode);
  if (!status) status = 500;

  error.status = status;
  throw error;
};

module.exports = {
  throwError,
};
