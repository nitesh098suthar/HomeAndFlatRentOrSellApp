//errorhandling alternative of try catch block
const catchAsyncError = (catchAsyncError) => (req, res, next) => {
  // if promise is rejected calling next middleware in catch
  Promise.resolve(catchAsyncError(req, res, next)).catch(next);
};
export default catchAsyncError;