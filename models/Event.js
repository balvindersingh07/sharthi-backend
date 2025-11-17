import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    cityId: { type: String, required: true },
    startAt: { type: Date, required: true },
    endAt: { type: Date, required: true },
    categoryTagsCsv: { type: String },
    description: { type: String },
    ratingAvg: { type: Number, default: null },
    ratingCount: { type: Number, default: null },
  },
  { timestamps: true }
);

export default mongoose.model("Event", eventSchema);
