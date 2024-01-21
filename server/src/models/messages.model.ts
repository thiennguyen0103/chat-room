import mongoose from "mongoose";

const messageSchema = new mongoose.Schema();

const Messages = mongoose.model("messages", messageSchema);

export default Messages;
