import mongoose from "mongoose"
import Ticket from "../models/TicketModel"
import "dotenv/config"
import { DB_URI } from "../config";

export const connectDB = async () => {
  try {
    const con = await mongoose.connect(DB_URI);
    console.log(`MongoDB Connected: ${con.connection.host}`)
  } catch (error: any) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
}