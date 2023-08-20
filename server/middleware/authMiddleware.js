import catchAsyncError from "../utils/catchAsyncError.js";
import jwt from "jsonwebtoken";
import ErrorHandler from "../utils/ErrorHandler.js";

//auth middleware checking if user is logged in and ideal or not
const authMiddleware = catchAsyncError(async (req, res, next) => {
  //fetching token from cookie if exist else throwing error
  const { token } = req.cookies;
  if (!token)
    return next(
      new ErrorHandler(401, "user must login to access this resource")
    );

  //checking if token is ideal or not else throwing error
  const user = jwt.verify(token, process.env.JWT_SEC);
  if (!user) return next(new ErrorHandler(402, "unauthorized access"));

  // getting user id from token payload and then initializing to req.id
  req.id = user.id;
  next();
});

export default authMiddleware;
