import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Success: MongoDB connected");
  } catch (err) {
    console.error("❌ Error: MongoDB connection failed", err);
    process.exit(1); // optional: stop the app if connection fails
  }
};

export default connectDB;
// This function connects to MongoDB using the URI stored in the environment variable MONGO_URI.
// It uses mongoose to establish the connection and logs success or failure messages.