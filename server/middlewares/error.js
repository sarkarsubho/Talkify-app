const errorMiddleware = (err, req, res, next) => {
  err.message ||= "Internal server Error";
  err.statusCode ||= 500;

  return res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};

export { errorMiddleware };
