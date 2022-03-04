import mongoose, { Schema, Document } from "mongoose";

export interface IImage extends Document {
  contentType: string;
  data: Buffer;
}

const imageSchema: Schema = new Schema({
  contentType: String,
  data: Buffer,
});

const Image = mongoose.model<IImage>("Image", imageSchema);

export default Image;
