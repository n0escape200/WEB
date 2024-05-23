import express from "express";
import User from "./Routes/User.js";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import Car from "./Routes/Car.js";
import Data from "./Routes/Data.js";
const uri =
  "mongodb+srv://john:canalulu1!@cluster0.njq1wv3.mongodb.net/VehicleApp?retryWrites=true&w=majority";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.static("photos"));

app.use("/api/user", User);
app.use("/api/car", Car);
app.use("/api/data", Data);

app.listen(3000, async () => {
  console.log("App listening on port 3000");
  try {
    await mongoose.connect(uri);
    console.log("Connection with databse has been made");
  } catch (error) {
    console.log(error);
  }
});
