import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// Load ENV
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ===============================
//          ROUTES IMPORT
// ===============================
import authRoutes from "./routes/authRoutes.js";

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
app.use("/api/auth", authRoutes); // Auth Routes Added

// ===============================
//          START SERVER
// ===============================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} ✔`);
});
