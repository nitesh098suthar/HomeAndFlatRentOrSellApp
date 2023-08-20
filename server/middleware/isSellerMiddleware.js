import UserModel from "../model/UserModel.js";
import catchAsyncError from "../utils/catchAsyncError.js";
import ErrorHandler from "../utils/ErrorHandler.js";

//checking if logged in user is seller or not
const isSellerMiddleware = catchAsyncError(async (req, res, next) => {
  const userId = req.id;
  const user = await UserModel.findById(userId);
  if (!user)
    return next(new ErrorHandler(404, "Unauthorized! Please Login again"));

  if (user.role === "seller") {
    next();
  } else {
    return next(new ErrorHandler(402, "only seller can access"));
  }
});

export default isSellerMiddleware;
