import catchAsyncError from "../utils/catchAsyncError.js";
import UserModel from "../model/UserModel.js";
import RoomModel from "../model/RoomModel.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import cloudinary from "cloudinary";
// ==================== list all user controller - admin ==================
export const listAllUser = catchAsyncError(async (req, res, next) => {
  const users = await UserModel.find().select("-password");
  if (!users) return next(new ErrorHandler(404, "user not found"));
  res.status(200).json({ success: true, users });
});
// ==================== list all user controller - admin ==================
export const listAllClients = catchAsyncError(async (req, res, next) => {
  const users = await UserModel.find().select("-password");
  if (!users) return next(new ErrorHandler(404, "user not found"));
  const clients = users.filter((user) => user.role === "client");
  res.status(200).json({ success: true, clients });
});

// ==================== update single user controller - admin ==================
export const editAnyUser = catchAsyncError(async (req, res, next) => {
  //getting userid from params userid
  const userId = req.params.userid;
  const user = await UserModel.findById(userId);
  if (!user) return next(new ErrorHandler(404, "user not found"));

  if (user.role !== "admin") user.role = "admin";
  else user.role = "client";

  //updating user
  await user.save();
  res.status(200).json({ success: true, msg: "user updated" });
});

// ============================ delete any user - admin controller ==========================
export const deleteAnyUser = catchAsyncError(async (req, res, next) => {
  //getting userid from params userid
  const userId = req.params.userid;
  const user = await UserModel.findById(userId);
  if (!user) return next(new ErrorHandler(404, "user not found"));

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
  //deleting user images from cloudinary
  if (user.avatar) {
    await cloudinary.v2.uploader.destroy(user.avatar.public_id);
  }
  //removing user
  await user.deleteOne();
  res.status(200).json({ success: true, msg: "User Deleted" });
});

// ======================== remove any room ================================
export const deleteAnyRoom = catchAsyncError(async (req, res, next) => {
  //getting userid from params userid
  const roomId = req.params.roomId;
  const room = await RoomModel.findById(roomId);
  if (!room) return next(new ErrorHandler(404, "Room not found"));
  //deleting room assets from cloudinary
  await cloudinary.v2.uploader.destroy(room.roomImg.public_id);
  //removing room
  await room.deleteOne();
  res.status(200).json({ success: true, msg: "Room Removed" });
});
