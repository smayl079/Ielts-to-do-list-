const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const authRoutes = require("./routes/auth");
const progressRoutes = require("./routes/progress");
const vocabularyRoutes = require("./routes/vocabulary");
const aiRoutes = require("./routes/ai");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/auth", authRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/vocabulary", vocabularyRoutes);
app.use("/api/ai", aiRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((error, req, res, next) => {
  return res.status(500).json({ message: error.message || "Internal server error" });
});

async function startServer() {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is required in backend/.env");
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is required in backend/.env");
    }

    await mongoose.connect(process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log(`Backend running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server start failed:", error.message);
    process.exit(1);
  }
}

startServer();
