import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connection = await mongoose.connect("mongodb://0.0.0.0:27017/", {
      dbName: "RState",
    });
    connection && console.log("Connected to Database");
  } catch (error) {
    console.log(error);
  }
};
export default connectDB;
