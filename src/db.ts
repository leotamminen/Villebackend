import mongoose from "mongoose";
import dotenv from "dotenv";
import { Exercise } from "./models";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("MONGO_URI is not defined in the .env file");
  process.exit(1);
}

// Global variable to track connection status
let isConnected = false;

export const connectDB = async () => {
  if (isConnected) {
    return; // Prevent multiple connections
  }

  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(MONGO_URI, {
      serverSelectionTimeoutMS: 20000,
      ssl: true,
    });

    isConnected = true;
    console.log("✅ MongoDB is running!");

    mongoose.connection.on("error", (err) => {
      console.error("MongoDB connection error:", err);
    });

    mongoose.connection.on("disconnected", () => {
      console.error("MongoDB disconnected!");
      isConnected = false;
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

// Make sure the connection exists before querying
export const getExerciseById = async (exerciseId: number) => {
  if (!isConnected) {
    console.log("⚠️ No active MongoDB connection. Establishing connection...");
    await connectDB();
  }

  try {
    const exercise = await Exercise.findOne({ id: exerciseId })
      .select("+correctAnswer")
      .lean()
      .exec();

    if (!exercise) {
      console.error(`Exercise with ID ${exerciseId} not found.`);
    }

    return exercise;
  } catch (error) {
    console.error("Error fetching exercise:", error);
    return null;
  }
};
