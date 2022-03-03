import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { json } from "body-parser";
import { companyRouter } from "./routes/company";
import { unitRouter } from "./routes/unit";

dotenv.config();
const port: string = process.env.PORT || "3000";
const mongoURI: string = process.env.MONGO_URI || "";

const app = express();
app.use(json());

app.use("/company", companyRouter);
app.use("/unit", unitRouter);

mongoose.connect(mongoURI, () => {
  console.log(`Connected to database`);
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
