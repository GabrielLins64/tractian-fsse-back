import mongoose, { Schema, Document } from "mongoose";
import { IImage } from "./image";
import { IUnit } from "./unit";

type Status = "Running" | "Alerting" | "Stopped";

export interface IAsset extends Document {
  image: IImage["_id"];
  name: string;
  description: string;
  model: string;
  owner: string;
  status: Status;
  health: number;
  unit: IUnit["_id"];
}

const assetSchema: Schema = new Schema({
  image: {
    type: Schema.Types.ObjectId,
    required: [true, "Please specify the asset's image"],
  },
  name: {
    type: String,
    required: [true, "Please specify the asset's name"],
  },
  description: {
    type: String,
    required: [true, "Please specify the asset's description"],
  },
  model: {
    type: String,
    required: [true, "Please specify the asset's model"],
  },
  owner: {
    type: String,
    required: [true, "Please specify the asset's owner"],
  },
  status: {
    type: String,
    required: [true, "Please specify the asset's status"],
  },
  health: {
    type: Number,
    required: [true, "Please specify the asset's health"],
    min: 0,
    max: 1,
  },
  unit: {
    type: Schema.Types.ObjectId,
    required: [true, "Please specify the asset's unit"],
  },
});

const Asset = mongoose.model<IAsset>("Asset", assetSchema);

export default Asset;
