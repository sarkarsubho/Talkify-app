const errorMiddleware = (err, req, res, next) => {
  err.message ||= "Internal server Error";
  err.statusCode ||= 500;

  return res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};

const tryCatch=(passedFunction)=>async(req,res,next)=>{
    try {
        await passedFunction(req,res,next);
    } catch (error) {
        next(error);
    }
}

export { errorMiddleware,tryCatch };
