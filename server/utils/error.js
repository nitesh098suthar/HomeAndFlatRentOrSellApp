const ErrorMiddleware = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal server Error";

  res.status(Number(err.statusCode)).json({
    success: false,
    message:err.message,
    // message: err.stack,
  });
};
export default ErrorMiddleware;
