import {
  listAllUser,
  editAnyUser,
  deleteAnyUser,
  listAllClients,
  deleteAnyRoom,
} from "../controller/adminAuthController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import isAdminMiddleware from "../middleware/isAdminMiddleware.js";

import express from "express";
const router = express.Router();

//admin routes
router
  .route("/action/:userid")
  .delete(authMiddleware, isAdminMiddleware, deleteAnyUser)
  .put(authMiddleware, isAdminMiddleware, editAnyUser);
router
  .route("/room/:roomId")
  .delete(authMiddleware, isAdminMiddleware, deleteAnyRoom);

router.route("/users").get(authMiddleware, isAdminMiddleware, listAllUser);
router.route("/clients").get(authMiddleware, isAdminMiddleware, listAllClients);
//get dashboard details
// router
// .route("/dashboardInfo")
// .get(authMiddleware, isAdminMiddleware, getDashboardInfo);
//update dashboard details
// router
// .route("/dashboardInfo")
// .put(authMiddleware, isAdminMiddleware, updateDashboardInfo);

export default router;
