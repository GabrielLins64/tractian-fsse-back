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
  image: { type: Schema.Types.ObjectId, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  model: { type: String, required: true },
  owner: { type: String, required: true },
  status: { type: String, required: true },
  health: { type: Number, required: true, min: 0, max: 1 },
  unit: { type: Schema.Types.ObjectId, required: true },
});

const Asset = mongoose.model<IAsset>("Asset", assetSchema);

export default Asset;
