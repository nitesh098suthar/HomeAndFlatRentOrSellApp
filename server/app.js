import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import middlewareError from "./utils/error.js";
import cors from "cors";

import dotenv from "dotenv";
dotenv.config({ path: "./config/.env" });

export const app = express();
//import routes/
import userRouter from "./routes/userRouter.js"
import adminRouter from "./routes/adminRouter.js"
import sellerRouter from './routes/sellerRouter.js'

const corsOptions = {
  origin: process.env.FRONTEND_URI,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());


//routes here
app.use("/api/v1/user", userRouter);
app.use('/api/v1/seller', sellerRouter);
app.use("/api/v1/admin", adminRouter);


// middleware for error
app.use(middlewareError);