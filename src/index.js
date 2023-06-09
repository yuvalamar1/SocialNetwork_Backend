/* eslint-disable import/extensions */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
import express from "express";
import cors from "cors";
import authRouter from "./routes/AuthRoute.js";
import connectDB from "./config/connectDB.js";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import mongoose from "mongoose";

dotenv.config();
const app = express();

const configureApp = () => {
  app.use(cors());
};

const addRouters = () => {
  app.use("/", authRouter);
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  console.log("New request from HomePage.");
  res.json({ message: "Hi from srever" });
});

const startServer = async () => {
  configureApp();
  addRouters();
  await connectDB();
  const port = process.env.PORT || 4000;
  app.listen(port, () => {
    console.log(`Server is up and running at port: ${port}`);
  });
};

await startServer();
