import DataURIParser from "datauri/parser.js";
import path from "path";

// changing file buffer into string
const getFileURI = (file) => {
  // initialize datauriparser
  const datauri = new DataURIParser();
  //since format method asks for extention : here getting one
  const extention = path.extname(file.originalname).toString();
  //sending datauri
  return datauri.format(extention, file.buffer);
};

export default getFileURI;
