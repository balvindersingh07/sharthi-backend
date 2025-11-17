import User from '../models/User.js';
import Booking from '../models/Booking.js';
import Event from '../models/Event.js';


// ============================
// GET ORGANIZER PROFILE
// ============================
export const getOrganizerProfile = async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  res.json(user);
};


// ============================
// UPDATE ORGANIZER PROFILE
// ============================
export const updateOrganizerProfile = async (req, res) => {
  const allowed = ['name', 'email'];
  const updates = {};

  for (const key of allowed) {
    if (req.body[key]) updates[key] = req.body[key];
  }

  const user = await User.findByIdAndUpdate(req.user._id, updates, { new: true }).select('-password');
  res.json(user);
};


// ============================
// BROADCAST MESSAGE TO ALL BOOKED USERS
// ============================
export const broadcastMessage = async (req, res) => {
  const { message } = req.body;

  if (!message) return res.status(400).json({ message: "Message is required" });

  const bookings = await Booking.find({ eventId: req.params.id }).populate('userId');

  const recipients = bookings.map(b => ({
    name: b.userId.name,
    email: b.userId.email
  }));

  // NOTE: We are NOT sending emails (frontend also doesn't expect)
  res.json({
    ok: true,
    sentTo: recipients.length,
    recipients
  });
};


// ============================
// EXPORT ROSTER FOR AN EVENT
// ============================
export const exportRoster = async (req, res) => {
  const bookings = await Booking.find({ eventId: req.params.eventId })
    .populate('userId')
    .populate('stallId');

  const rows = bookings.map(b => ({
    user: b.userId.name,
    email: b.userId.email,
    stall: b.stallId.name,
    tier: b.stallId.tier,
    amount: b.amount,
    status: b.status
  }));

  res.json({
    ok: true,
    eventId: req.params.eventId,
    total: rows.length,
    roster: rows
  });
};
