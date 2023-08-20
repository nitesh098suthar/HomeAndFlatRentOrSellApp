import mongoose from "mongoose";
const roomSchema = new mongoose.Schema({
  sellerId: {
    type: mongoose.SchemaTypes.ObjectId,
    rel: "UserModel",
  },
  dimension: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: [true, "Please Provide Pricing"],
  },
  contactNumber: {
    type: String,
    required: [true, "Please Provide a Contact Number"],
    maxLength: [10, "Contact Number can't Exceed 10 numbers"],
  },
  category: {
    type: String,
    required: true,
  },
  sellType: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    maxLength: [1000, "Description can't exceed 1000 characters"],
  },
  genderSpecificity: {
    type: String,
    required: [true, "Please provide Gender Specificity for your room/flat"],
  },
  roomImg: {
    url: {
      type: String,
      required: true,
    },
    public_id: {
      type: String,
      required: true,
    },
  },
});

const RoomModel = mongoose.model("RoomModel", roomSchema);
export default RoomModel;
