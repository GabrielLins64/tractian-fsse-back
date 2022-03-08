import express from "express";
import mongoose from "mongoose";
import bodyParser, { json } from "body-parser";
import router from "./routes";
import logger from "./middlewares/logs";
import configs from "./config";

const app = express();
app.use(json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger);
app.use(router);

mongoose.connect(configs.DATABASE_URI, () => {
  console.log(`Connected to database`);
});

app.listen(configs.PORT, () => {
  console.log(`Server is up on port ${configs.PORT}`);
});
