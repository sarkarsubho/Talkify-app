const errorMiddleware = (err, req, res, next) => {
  err.message ||= "Internal server Error";
  err.statusCode ||= 500;

  // handling duplicate key error
  if (err.code === 11000) {
    const duplicateFields = Object.keys(err.keyPattern).join(",");
    err.message = `Duplicate Field - ${duplicateFields}`;
    err.statusCode = 400;
  }
  if (err.name === "CastError") {
    err.message = `Invalid format  of - ${err.path}`;
    err.statusCode = 400;
  }
  return res.status(err.statusCode).json({
    success: false,
    message: process.env.NODE_ENV === "DEVELOPMENT" ? err : err.message,
  });
};

const tryCatch = (passedFunction) => async (req, res, next) => {
  try {
    await passedFunction(req, res, next);
  } catch (error) {
    next(error);
  }
};

export { errorMiddleware, tryCatch };
