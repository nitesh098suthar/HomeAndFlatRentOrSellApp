import catchAsyncError from "../utils/catchAsyncError.js";
import { resSender } from "../utils/resSender.js";
import UserModel from "../model/UserModel.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import crypto from "crypto";
import { mailSender } from "../utils/mailSender.js";
import RoomModel from "../model/RoomModel.js";
import cloudinary from "cloudinary";
import getFileURI from "../utils/getFileURI.js";

// ==================== login controller ==============================
export const login = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    return next(new ErrorHandler(401, "Please fill all fields!"));
  const user = await UserModel.findOne({ email }).select("+password");
  if (!user) return next(new ErrorHandler(404, "user not found!"));
  const authUser = await user.comparePassword(password);
  if (!authUser) return next(new ErrorHandler(401, "Wrong Password!"));
  resSender(200, user, "LoggedIn Successfully", res);
});
// =================== register controller ============================
export const register = catchAsyncError(async (req, res, next) => {
  const { name, email, password, role } = req.body;
  const file = req.file;
  if (!name || !email || !password || !role || !file)
    return next(new ErrorHandler(401, "Please fill all fields!"));
  const sanitizedRole = role.toLowerCase().trim();
  if (sanitizedRole === "admin")
    return next(new ErrorHandler(401, "Dont hack me :'( "));
  const user = await UserModel.findOne({ email });
  if (user) return next(new ErrorHandler(404, "user already exist!"));

  const fileURI = getFileURI(file);


  // cloudinary
  const myCloud = await cloudinary.v2.uploader.upload(fileURI.content, {
    folder: "RSTATE"
  })
  //creating user
  const newUser = await UserModel.create({
    name,
    role: sanitizedRole,
    email,
    password,
    avatar: {
      public_id: myCloud.public_id,
      url : myCloud.secure_url
    }
  });
  resSender(200, newUser, "Registered Successfully", res);
});

// =================== change password - authenticated user only ==================
export const changePassword = catchAsyncError(async (req, res, next) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword)
    return next(new ErrorHandler(401, "Please fill all fields!"));
  //getting logged in user's id
  const userId = req.id;
  const user = await UserModel.findById(userId).select("+password");
  if (!user) return next(new ErrorHandler(404, "Please Login Properly"));
  const authUser = await user.comparePassword(currentPassword);
  if (!authUser)
    return next(new ErrorHandler(401, "Current Password is Wrong!"));

  //checking password length and throwing error if password is short
  if (newPassword.length < 8)
    return next(new ErrorHandler(401, "Password is too short"));

  //changing passwords
  user.password = newPassword;
  await user.save();
  res
    .status(200)
    .json({ success: true, msg: "user password updated successfully" });
});

// ===================== forget password controller =========================
export const forgetPassword = catchAsyncError(async (req, res, next) => {
  const { email } = req.body;
  if (!email) return next(new ErrorHandler(401, "Please provide an Email!"));
  const user = await UserModel.findOne({ email });
  if (!user) return next(new ErrorHandler(404, "user not found!"));

  // generating random token using crypto
  const resetToken = crypto.randomBytes(20).toString("hex");

  //link variable from backend to frontend with reset token
  const link = `${process.env.FRONTEND_URI}/password/reset/${resetToken}`;

  //send email here
  const options = {
    to: email,
    subject: "RState - Reset Password Link",

    //sending html as mail body
    html: `<div class="parent" style="background-color:#11001a; color:#eee; height:80vh; width:100vw; display:grid; place-items:center;">
    <div class="container" style="padding:5rem;">
    <h1 style="color:#9f7aea">
      RState
    </h1>
      <br/>
    <h3 style="color:#e4b3ff;">
      As per your request here is your reset password link:
    </h3>
    <a href=${link}>${link}</a>
      <br/>
      <br/>
      <br/>
      <br/>
    <p style="background-color:#32004d; padding:1rem; border-radius:.5rem;">
        <strong>Note:&nbsp;&nbsp;</strong>
      if not requested, please ignore and don't share this link with anyone
    </p>
    </div>
    </div>`,
  };
  mailSender(options);

  // saving token to the database along with validation
  await user.updateOne({
    resetToken,
    resetExpireToken: Date.now() + 15 * 60 * 1000,
  });

  res.status(200).json({
    success: true,
    msg: "Mail is sent to your Email address\nPlease check your inbox or Spam",
  });
});

// =========================== reset password controller ============================
export const resetPassword = catchAsyncError(async (req, res, next) => {
  const { newPassword } = req.body;
  if (!newPassword)
    return next(new ErrorHandler(401, "Please Provide an Password!"));
  const resetToken = req.params.token;

  //password length
  if (newPassword.length < 8)
    return next(new ErrorHandler(401, "Password is too short"));

  //checking if token from params is available in usermodel if yes then checking if token has been expired or not
  const user = await UserModel.findOne({
    resetToken,
    resetExpireToken: { $gt: Date.now() },
  });

  if (!user)
    return next(
      new ErrorHandler(404, "unauthorized or reset link has been expired")
    );

  //changing password and making resetToken and resetExpireToken null
  user.password = newPassword;
  user.resetToken = null;
  user.resetExpireToken = null;
  await user.save();
  res
    .status(200)
    .json({ success: true, msg: "password changed successfully :)" });
});

// ================== get loggedin user information - authenticated =====================
export const getMyDetails = catchAsyncError(async (req, res, next) => {
  //id of logged in user from auth - middleware
  const userId = req.id;
  const user = await UserModel.findById(userId).select("-password");
  if (!user) return next(new ErrorHandler(404, "user not fonund"));
  res.status(200).json({ success: true, user });
});

// ==================== logout user controller ====================
export const logout = catchAsyncError(async (req, res, next) => {
  //making saved cookie to null
  res
    .status(200)
    .cookie("token", null, {
      expires: new Date(Date.now()),
      sameSite: "none",
      secure: true,
      httpOnly: true,
    })
    .json({ success: true, msg: "user logout successfully" });
});

// ===================== contactAdmin controller =========================
export const contactAdmin = catchAsyncError(async (req, res, next) => {
  const { email, name, feedback } = req.body;
  if (!email || !name || !feedback)
    return next(new ErrorHandler(401, "Please fill all fields!"));

  //send email here
  const options = {
    to: process.env.SMTP_MAIL,
    subject: "RState - Feedback or Contact",

    //sending html as mail body
    html: `<div class="parent" style="background-color:#11001a; color:#eee; height:80vh; width:100vw; display:grid; place-items:center;">
    <div class="container" style="padding:3rem;">
    <h1 style="color:#9f7aea">
      RState
    </h1>
      <br/>
      <p style="background-color:#32004d; padding:1rem; border-radius:.5rem;">
        <strong>Name:&nbsp;&nbsp;</strong>
     ${name}
     </p>
 <p style="background-color:#32004d; padding:1rem; border-radius:.5rem;">
        <strong>Email:&nbsp;&nbsp;</strong>
${email}
    </p>
    <p style="background-color:#32004d; padding:1rem; border-radius:.5rem;">
        <strong>Feedback or Request:&nbsp;&nbsp;</strong>
     ${feedback}
    </p>
    </div>
    </div>`,
  };
  mailSender(options);

  res.status(200).json({
    success: true,
    msg: "mail sent successfully",
  });
});

// ================ update logged in user's information - authenticated =================
export const editMyDetails = catchAsyncError(async (req, res, next) => {
  const { role } = req.body;
  const sanitizedRole = role.toLowerCase().trim();
  if (sanitizedRole !== "client" && role !== "seller")
    return next(new ErrorHandler(401, "invalid role"));
  if (sanitizedRole === "admin")
    return next(new ErrorHandler(401, "Dont hack me :'( "));
  //logged in user's id from authmiddleware
  const userId = req.id;
  const isUser = await UserModel.findById(userId);
  if (!isUser) return next(new ErrorHandler(401, "unauthorized"));

  if (isUser.role === "seller") {
    const rooms = await RoomModel.find({});
    //deleting seller's room assets from cloudinary
    const cnt = rooms.length;
    for (let i = 0; i < cnt; i++) {
      if (rooms[i].sellerId.toString() === userId) {
        await cloudinary.v2.uploader.destroy(rooms[i].roomImg.public_id);
        //deleting document(s)
        await rooms[i].deleteOne();
      }
    }
  }
  isUser.role = sanitizedRole;
  await isUser.save();
  res.status(200).json({ success: true, msg: "user updated Successfully" });
});
// ================================================================
