import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  numOfRooms: { type: Number, default: 0 },
  numOfUsers: { type: Number, default: 0 },
  numOfSellers: { type: Number, default: 0 },
  numOfClients: { type: Number, default: 0 },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const AdminModel = mongoose.model("AdminModel", adminSchema);
export default AdminModel;
