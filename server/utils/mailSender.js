import { createTransport } from "nodemailer";
import catchAsyncError from "./catchAsyncError.js";

export const mailSender = catchAsyncError(async ({ to, subject, html }) => {
  //creating transporter for nodemailer
  const transporter = createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_MAIL,
      pass: process.env.SMTP_ACCESS_TOKEN,
    },
  });

  //options to send mail
  const options = {
    from: process.env.SMTP_MAIL,
    to,
    subject,
    html,
  };
  // sending mail
  await transporter.sendMail(options);
});
