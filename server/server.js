import { app } from "./app.js";
import connectDB from './config/connectDB.js'
import cloudinary from 'cloudinary'
const port = 5000 || process.env.PORT;
connectDB();


//cloudinary configuration
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.listen(port, () => {
  console.log("Server is up " + port);
});
