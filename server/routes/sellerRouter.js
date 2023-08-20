import express from "express";
import {
  createRoom,
  deleteRoom,
  editRoom,
  getAllRoom,
  getMyRoom,
  getSingleRoom,
  listAllSellers,
} from "../controller/roomController.js";
import isSellerMiddleware from "../middleware/isSellerMiddleware.js";
import authMiddleware from "../middleware/authMiddleware.js";
import multiPartUpload from "../middleware/multipartUpload.js";
const router = express.Router();
router.route("/myroom").get(authMiddleware, isSellerMiddleware, getMyRoom);
router
  .route("/room")
  .get(getAllRoom)
  .post(authMiddleware, isSellerMiddleware, multiPartUpload, createRoom);
router
  .route("/room/:roomId")
  .get(getSingleRoom)
  .put(authMiddleware, isSellerMiddleware, editRoom)
  .delete(authMiddleware, isSellerMiddleware, deleteRoom);
  router.route("/sellers").get(listAllSellers);
export default router;
