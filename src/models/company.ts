import mongoose, { Schema, Document } from "mongoose";

export interface ICompany extends Document {
  name: string;
}

const companySchema: Schema = new Schema({
  name: {
    type: String,
    required: [true, "Please specify the name"],
    unique: true
  },
});

const Company = mongoose.model<ICompany>("Company", companySchema);

export default Company;
