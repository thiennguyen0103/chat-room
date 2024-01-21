import mongoose from "mongoose";

const roomSchema = new mongoose.Schema();

const Rooms = mongoose.model("rooms", roomSchema);

export default Rooms;
