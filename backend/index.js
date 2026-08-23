const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const feedbackRoutes = require("./routes/feedback");
const authRoutes = require("./routes/auth");
const Rating = require("./models/Rating");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/feedback", feedbackRoutes);
app.use("/api/auth", authRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));

// Welcome
app.get("/", (req, res) => {
  res.send("Welcome to the backend server!");
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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
