import {
  login,
  register,
  changePassword,
  forgetPassword,
  resetPassword,
  getMyDetails,
  logout,
  contactAdmin,
  editMyDetails,
} from "../controller/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";

import express from "express";
import multiPartUpload from "../middleware/multipartUpload.js";
const router = express.Router();

//user basic authentication routes
router.route("/login").post(login);
router.route("/logout").get(authMiddleware, logout);
router.route("/register").post(multiPartUpload, register);
router.route("/changepassword").put(authMiddleware, changePassword);
router.route("/forgetpassword").post(forgetPassword);
router.route("/resetpassword/:token").put(resetPassword);
//contact route
router.route("/contact").post(contactAdmin);

//user details and update details routes
router
  .route("/me")
  .get(authMiddleware, getMyDetails)
  .put(authMiddleware, editMyDetails);

//change user avatar
// router.route('/changeavatar').put(authMiddleware, changeAvatar)

export default router;
