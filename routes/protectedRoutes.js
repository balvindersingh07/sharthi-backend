import express from "express";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Example protected route
router.get("/me", protect, (req, res) => {
  res.status(200).json({
    message: "Access granted ✔ Protected Route Working",
    user: req.user,
  });
});

export default router;
