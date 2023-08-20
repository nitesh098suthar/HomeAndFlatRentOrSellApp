import UserModel from "../model/UserModel.js";
import catchAsyncError from "../utils/catchAsyncError.js";
import ErrorHandler from "../utils/ErrorHandler.js";

//checking if logged in user is admin or not with role key from usermodel
const isAdminMiddleware = catchAsyncError(async (req, res, next) => {
  const userId = req.id;
  const user = await UserModel.findById(userId);
  if (!user)
    return next(
      new ErrorHandler(404, "user/admin not found! Please Login again")
    );

  if (user.role === "admin") {
    next();
  } else {
    return next(new ErrorHandler(402, "only admin can access"));
  }
});

export default isAdminMiddleware;
