import mongoose from "mongoose";

const organizerSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  phone: String,
  avatar: String,
  bio: String,

  // organizer-only
  role: { type: String, default: "organizer" },

  // Stats convenience
  totalRevenue: { type: Number, default: 0 },
  stallsSold: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model("Organizer", organizerSchema);
