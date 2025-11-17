import mongoose from 'mongoose';

const stallSchema = new mongoose.Schema({
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  name: String,
  tier: { type: String, enum: ['BRONZE', 'SILVER', 'GOLD'] },
  price: Number,
  qtyTotal: Number,
  qtyLeft: Number,
  specs: String
}, { timestamps: true });

export default mongoose.models.Stall || mongoose.model('Stall', stallSchema);
