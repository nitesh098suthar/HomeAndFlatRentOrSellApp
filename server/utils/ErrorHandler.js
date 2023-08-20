// creating own error class
class ErrorHandler extends Error {
  constructor(statusCode, message) {
    super(message);
    statusCode = this.statusCode;
    Error.captureStackTrace(this, message);
  }
}

export default ErrorHandler;
