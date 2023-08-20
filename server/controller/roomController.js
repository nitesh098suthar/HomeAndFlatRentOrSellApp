import RoomModel from "../model/RoomModel.js";
import UserModel from "../model/UserModel.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import catchAsyncError from "../utils/catchAsyncError.js";
import getFileURI from "../utils/getFileURI.js";
import cloudinary from "cloudinary";

export const createRoom = catchAsyncError(async (req, res, next) => {
  const id = req.id;
  const {
    dimension,
    price,
    sellType,
    description,
    contactNumber,
    address,
    category,
    genderSpecificity,
  } = req.body;
  const file = req.file;
  if (
    !dimension ||
    !price ||
    !sellType ||
    !description ||
    !contactNumber ||
    !address ||
    !category ||
    !genderSpecificity ||
    !file
  ) {
    return next(new ErrorHandler(404, "Please fill all fields"));
  }
  //imgs from multer ================
  if (!id)
    return next(new ErrorHandler(401, "Unauthorized, Please login again"));
  const seller = await UserModel.findById(id);
  if (!seller || seller.role.toString() !== "seller")
    return next(new ErrorHandler(401, "unauthorized user"));

  // changing file buffer into string
  const fileURI = getFileURI(file);

  // uploading filestring onto cloudinary
  const cloudinaryResponse = await cloudinary.v2.uploader.upload(
    fileURI.content,
    {
      folder: "RSTATE", 
    }
  );

  await RoomModel.create({
    sellerId: seller._id,
    category,
    contactNumber,
    price,
    sellType,
    genderSpecificity,
    description,
    address,
    dimension,
    roomImg: {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    },
  });
  res.status(201).json({ success: true, msg: "New Room Created" });
});
// edit room info
export const editRoom = catchAsyncError(async (req, res, next) => {
  const roomId = req.params.roomId;
  const room = await RoomModel.findById(roomId);
  if (!room) return next(new ErrorHandler(404, "Room not found"));
  const id = req.id;
  const {
    dimension,
    price,
    sellType,
    description,
    contactNumber,
    address,
    category,
    genderSpecificity,
  } = req.body;

  if (!id)
    return next(new ErrorHandler(401, "Unauthorized, Please login again"));
  const seller = await UserModel.findById(id);
  if (!seller || seller.role.toString() !== "seller")
    return next(new ErrorHandler(401, "unauthorized user"));

  // checking if room belongs to seller before updating info
  const roomSellerId = room.sellerId.toString();
  if (roomSellerId !== seller._id.toString())
    return next(new ErrorHandler(401, "unauthorized to take action"));

  await room.updateOne({
    category,
    contactNumber,
    price,
    sellType,
    genderSpecificity,
    description,
    address,
    dimension,
  });
  res.status(201).json({ success: true, msg: "Room info Updated" });
});

// delete room
export const deleteRoom = catchAsyncError(async (req, res, next) => {
  const id = req.id;
  const roomId = req.params.roomId;
  if (!id)
    return next(new ErrorHandler(401, "Unauthorized, Please login again"));
  const seller = await UserModel.findById(id);
  if (!seller || seller.role.toString() !== "seller")
    return next(new ErrorHandler(401, "unauthorized user"));
  const room = await RoomModel.findById(roomId);
  if (!room) return next(new ErrorHandler(404, "Room not found"));
  // checking if room belongs to seller before updating info
  const roomSellerId = room.sellerId.toString();
  if (roomSellerId !== seller._id.toString())
    return next(new ErrorHandler(401, "unauthorized to take action"));
  // deleting imgs from cloudinary for specific room=========
  await cloudinary.v2.uploader.destroy(room.roomImg.public_id);
  await room.deleteOne();
  res.status(200).json({ success: true, msg: "Room Deleted" });
});
// get seller specific rooms
export const getMyRoom = catchAsyncError(async (req, res, next) => {
  const rooms = await RoomModel.find({});
  const sellerId = req.id;
  if (!sellerId) return next(new ErrorHandler(401, "unauthorized seller"));
  const myRooms = rooms.filter((room) => room.sellerId.toString() === sellerId);
  res.status(200).json({ success: true, msg: myRooms });
});
//get all room
export const getAllRoom = catchAsyncError(async (req, res, next) => {
  const rooms = await RoomModel.find({});
  res.status(200).json({ success: true, msg: rooms });
});

// get single room
export const getSingleRoom = catchAsyncError(async (req, res, next) => {
  const roomId = req.params.roomId;
  if (!roomId) return next(new ErrorHandler(404, "Room ID not found"));
  const room = await RoomModel.findById(roomId);
  if (!room) return next(new ErrorHandler(404, "Room Not found"));
  res.status(200).json({ success: true, msg: room });
});
// ==================== list all user controller - admin ==================
export const listAllSellers = catchAsyncError(async (req, res, next) => {
  const users = await UserModel.find().select("-password");
  if (!users) return next(new ErrorHandler(404, "user not found"));
  const sellers = users.filter((user) => user.role === "seller");
  res.status(200).json({ success: true, sellers });
});