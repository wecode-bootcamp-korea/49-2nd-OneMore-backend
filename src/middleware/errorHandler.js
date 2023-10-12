const routerNotFoundHandler = (req, _, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
};

const errorHandler = (err, _, res, next) => {
  res.status(err.status || 500);
  return res.json({
    error: `${err.status ? err.status : ""} ${err.message}`,
  });
};

module.exports = {
  routerNotFoundHandler,
  errorHandler,
};
