import mongoose, { Schema } from "mongoose";

var validateEmail = function (email: string) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

import { Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
}

const userSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please specify the user's username"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please specify the user's email"],
      unique: true,
      lowercase: true,
      validate: [validateEmail, "Please fill a valid email address"],
    },
    password: {
      type: String,
      required: [true, "Please specify the user's password"],
    },
  },
  { timestamps: true }
);

const User = mongoose.model<IUser>("User", userSchema);

export default User;
