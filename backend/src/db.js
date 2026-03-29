import mongoose from "mongoose";

let isConnected = false; // Track the connection state

const connectDB = async () => {
  if (isConnected) {
    return; // Use the cached connection!
  }
  
  try {
    const db = await mongoose.connect(process.env.MONGO_URI);
    isConnected = db.connections[0].readyState === 1;
    console.log("✅ MongoDB Connected Successfully (Serverless)");
  } catch (error) {
    console.error("MongoDB connection Error", error);
  }
};

export default connectDB;