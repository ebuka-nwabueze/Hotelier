import mongoose, { ObjectId , Types} from "mongoose";

export interface ITicket {
  user: Types.ObjectId,
  category: string,
  description: string,
  status: string
}

const ticketSchema = new mongoose.Schema<ITicket>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User"
    },
    category: {
      type: String,
      required: [true, "Please select a category"],
      enum: ["Duplicate","Image Error", "Advertiser Relations", "Other"],
    },
    description: {
      type: String,
      required: [true, "Please enter a description of the issue"],
    },
    status: {
      type: String,
      required: true,
      enum: ["new", "open", "closed"],
      default: "new",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Ticket",ticketSchema)