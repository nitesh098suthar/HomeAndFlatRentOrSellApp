import multer from "multer";

//creating memorystorage multer to store file as buffer
const storage = multer.memoryStorage();

//configuring  multer with options and single upload file
const multiPartUpload = multer({ storage }).single("file");

export default multiPartUpload;
