const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const feedbackRoutes = require("./routes/feedback");
const authRoutes = require("./routes/auth");
const chatRoutes = require("./routes/chat");
const Rating = require("./models/Rating");

const app = express();

app.use(cors());
app.use(express.json());

// Database connection handler for serverless & local env
const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;
  if (!process.env.MONGO_URI) {
    console.warn("⚠️ MONGO_URI is not defined in environment variables.");
    return;
  }
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
  }
};

// Ensure DB is connected on incoming requests
app.use(async (req, res, next) => {
  await connectDB();
  next();
});

// Routes
app.use("/api/feedback", feedbackRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);

// Welcome / Health check endpoints
app.get("/", (req, res) => {
  res.send("Welcome to the backend server!");
});

app.get("/api", (req, res) => {
  res.json({ status: "ok", msg: "Backend API is running on Vercel" });
});

// ------------------- RATINGS -------------------
app.post("/api/rating", async (req, res) => {
  const { projectTitle, rating } = req.body;
  if (!projectTitle || !rating || rating < 1 || rating > 5)
    return res.status(400).json({ msg: "Invalid input." });

  try {
    const project = await Rating.findOne({ projectTitle });

    if (project) {
      project.ratings[rating] += 1;
      project.ratingsCount += 1;
      project.ratingsSum += rating;
      project.averageRating = (project.ratingsSum / project.ratingsCount).toFixed(2);
      await project.save();
    } else {
      const newProject = new Rating({
        projectTitle,
        ratings: { [rating]: 1 },
        ratingsCount: 1,
        ratingsSum: rating,
        averageRating: rating
      });
      await newProject.save();
    }

    const updated = await Rating.findOne({ projectTitle });
    res.json({ msg: "Rating updated", ratings: updated });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

// Local development server runner
const PORT = process.env.PORT || 5000;
if (!process.env.VERCEL) {
  app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
}

module.exports = app;

