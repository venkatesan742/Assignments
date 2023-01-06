import express from "express";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js"
import usersRoute from "./routes/users.js"
import postsRoute from "./routes/posts.js"
import infosRoute from "./routes/info.js"
import dotevn from "dotenv";
import cookieParser from "cookie-parser";
dotevn.config();
mongoose.set('strictQuery', false);

const app = express();

const connect = async () => { 
    try {
    await mongoose.connect(process.env.MONGO);
    console.log("connected to mongoDB");
  } catch (error) {
    throw(error);
  }};

  mongoose.connection.on("disconnected", () => {
    console.log("mongoDB Disconnected");
  })

  mongoose.connection.on("connected", () => {
    console.log("mongoDB connected");
  })


  app.use(express.json())
  app.use(cookieParser())

  app.use("/api/auth", authRoute);
  app.use("/api/users", usersRoute);
  app.use("/api/posts", postsRoute);
  app.use("/api/infos", infosRoute);


app.listen(8800, ()=>{
    connect()
    console.log("connected to backend.");
})