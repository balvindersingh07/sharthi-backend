import express from "express";
import { protect } from "../middleware/authMiddleware.js";

import Booking from "../models/Booking.js";
import Stall from "../models/Stall.js";
import Event from "../models/Event.js";

const router = express.Router();

/* =====================================================
    1️⃣ MOCK PAYMENT — POST /payments/mock
===================================================== */
router.post("/payments/mock", protect, async (req, res) => {
  res.json({ paymentRef: "PAY-" + Date.now() });
});

/* =====================================================
    2️⃣ CREATE BOOKING — POST /bookings
===================================================== */
router.post("/bookings", protect, async (req, res) => {
  try {
    const { eventId, stallId, amount, paymentRef } = req.body;

    const stall = await Stall.findById(stallId);
    if (!stall) return res.status(404).json({ message: "Stall not found" });

    if (stall.qtyLeft <= 0)
      return res.status(400).json({ message: "Stall not available anymore." });

    stall.qtyLeft -= 1;
    await stall.save();

    const booking = await Booking.create({
      userId: req.user._id,
      eventId,
      stallId,
      amount,
      paymentRef,
      status: "PAID"
    });

    res.json({ id: booking._id, status: "PAID" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* =====================================================
    3️⃣ GET MY BOOKINGS — GET /bookings/my
===================================================== */
router.get("/bookings/my", protect, async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user._id });

    const result = [];

    for (let b of bookings) {
      const event = await Event.findById(b.eventId);
      const stall = await Stall.findById(b.stallId);

      result.push({
        id: b._id,
        amount: b.amount,
        status: b.status,
        event: event
          ? {
              title: event.title,
              cityId: event.cityId,
              startAt: event.startAt,
              endAt: event.endAt
            }
          : null,
        stall: stall
          ? {
              name: stall.name,
              tier: stall.tier,
              price: stall.price
            }
          : null
      });
    }

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* =====================================================
    4️⃣ SUBMIT REVIEW — POST /bookings/:id/review
===================================================== */
router.post("/bookings/:id/review", protect, async (req, res) => {
  try {
    const { rating } = req.body;

    await Booking.findByIdAndUpdate(req.params.id, {
      rating: rating || 5
    });

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
