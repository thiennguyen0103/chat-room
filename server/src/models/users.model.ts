import * as bcryptNodejs from "bcrypt-nodejs";
import mongoose from "mongoose";
import { IUser } from "../interfaces/models/users.interface";

export interface IUserModel extends IUser, mongoose.Document {
  comparePassword(password: string, cb: any): string;
  validPassword(password: string, cb: any): string;
}

export const UserSchema = new mongoose.Schema<IUserModel>(
  {
    email: { type: String, unique: true },
    fullName: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    passwordResetToken: { type: String },
    passwordResetExpires: Date,
    imageUrl: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.methods.comparePassword = function (
  _requestPassword: string,
  _cb: any
): any {
  bcryptNodejs.compare(_requestPassword, this.password, (_err, _isMatch) => {
    return _cb(_err, _isMatch);
  });
};

const Users = mongoose.model("users", UserSchema);

export default Users;
