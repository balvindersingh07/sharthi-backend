import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// Load ENV
dotenv.config();

const app = express();

// ===============================
//          MIDDLEWARE
// ===============================
app.use(cors());
app.use(express.json());

// ===============================
//          ROUTES IMPORT
// ===============================
import authRoutes from "./routes/authRoutes.js";
import protectedRoutes from "./routes/protectedRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";   
import bookingRoutes from "./routes/bookingRoutes.js";   // ⭐ Booking API (NEW)

// ===============================
//          DEFAULT ROUTE
// ===============================
app.get("/", (req, res) => {
  res.send("Backend is running successfully ✔");
});

// ===============================
//      DATABASE CONNECTION
// ===============================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✔"))
  .catch((err) => console.log("MongoDB Error ❌", err));

// ===============================
//             ROUTES
// ===============================
app.use("/api/auth", authRoutes);            
app.use("/api/protected", protectedRoutes);  
app.use("/api/events", eventRoutes);         
app.use("/api", bookingRoutes);               // ⭐ Booking Routes Mounted

// ===============================
//          START SERVER
// ===============================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} ✔`);
});

import organizerExtraRoutes from './routes/organizerExtraRoutes.js';

app.use('/api', organizerExtraRoutes);
