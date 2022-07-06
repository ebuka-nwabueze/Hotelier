import mongoose from "mongoose"
import "dotenv/config"
import { DB_URI } from "../config.js";

export const connectDB = async () => {
  try {
    const con = await mongoose.connect(DB_URI);
    console.log(`MongoDB Connected: ${con.connection.host}`)
  } catch (error: any) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
}