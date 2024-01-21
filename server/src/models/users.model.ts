import mongoose from "mongoose";

const userSchema = new mongoose.Schema();

const Users = mongoose.model("users", userSchema);

export default Users;
