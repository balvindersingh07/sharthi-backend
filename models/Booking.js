import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },
  stallId: { type: mongoose.Schema.Types.ObjectId, ref: "Stall", required: true },
  organizerId: { type: mongoose.Schema.Types.ObjectId, ref: "Organizer", required: true },

  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

  amount: Number,
  paymentRef: String,

  status: {
    type: String,
    enum: ["PENDING", "PAID", "CANCELLED"],
    default: "PAID"
  }
}, { timestamps: true });

export default mongoose.model("Booking", bookingSchema);
