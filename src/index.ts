import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bodyParser, { json } from "body-parser";
import { companyRouter } from "./routes/company";
import { unitRouter } from "./routes/unit";
import { assetRouter } from "./routes/asset";

dotenv.config();
const port: string = process.env.PORT || "3000";
const mongoURI: string = process.env.MONGO_URI || "";

const app = express();
app.use(json());
app.use(bodyParser.urlencoded({extended: true}));

app.use("/company", companyRouter);
app.use("/unit", unitRouter);
app.use("/asset", assetRouter);

mongoose.connect(mongoURI, () => {
  console.log(`Connected to database`);
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
