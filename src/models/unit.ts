import mongoose, { Schema, Document } from "mongoose";
import { ICompany } from "./company";

export interface IUnit extends Document {
  name: string;
  address?: string;
  company: ICompany["_id"];
}

const unitSchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
  address: { type: String, required: false },
  company: { type: Schema.Types.ObjectId, required: true },
});

const Unit = mongoose.model<IUnit>("Unit", unitSchema);

export default Unit;
