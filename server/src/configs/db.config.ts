import "dotenv/config";
import mongoose, { ConnectOptions } from "mongoose";

const connectDB = async () => {
  try {
    console.log(process.env.MONGO_URI);
    await mongoose.connect(process.env.MONGO_URI, {} as ConnectOptions);

    console.log("MongoDB connection success");
  } catch (error) {
    console.error("MongoDB connection failed");
    process.exit(1);
  }
};

export default connectDB;
