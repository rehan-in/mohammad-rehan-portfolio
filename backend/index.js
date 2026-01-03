const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
require("dotenv").config();

const User = require("./models/User");
const chatRoutes = require('./routes/chat');
const feedbackRoutes = require('./routes/feedback');
const Rating = require('./models/Rating');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/chat', chatRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use("/api/auth", require("./routes/auth")); // for modular structure

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));

// Welcome
app.get("/", (req, res) => {
  res.send("Welcome to the backend server!");
});

// ------------------- SIGNUP -------------------
app.post("/api/auth/signup", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  if (!firstName || !lastName || !email || !password)
    return res.status(400).json({ msg: "Please fill all fields" });

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ msg: "Email already registered" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ firstName, lastName, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ msg: "User registered successfully" });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ msg: "Server error" });
  }
});

// ------------------- LOGIN -------------------
app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ msg: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

  res.json({ token, msg: "Login successful" });
});

// ------------------- FORGOT PASSWORD -------------------
app.post("/api/auth/forgot-password", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: "User not found" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "15m" });
    user.resetToken = token;
    user.resetTokenExpire = Date.now() + 15 * 60 * 1000;
    await user.save();

    const transporter = nodemailer.createTransport({
      service: 'Gmail', // or 'SendinBlue' / 'Mailtrap'
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const resetLink = `http://localhost:3000/reset-password/${token}`;
    await transporter.sendMail({
      from: `"Your App" <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: "Password Reset",
      html: `<p>Click the link to reset your password:</p><a href="${resetLink}">${resetLink}</a>`
    });

    res.json({ msg: "Reset link sent to your email." });
  } catch (err) {
    console.error("Forgot password error:", err);
    res.status(500).json({ msg: "Something went wrong." });
  }
});

// ------------------- RESET PASSWORD -------------------
app.post("/api/auth/reset-password/:token", async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decoded.id, resetToken: token, resetTokenExpire: { $gt: Date.now() } });

    if (!user) return res.status(400).json({ msg: "Invalid or expired token" });

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetToken = undefined;
    user.resetTokenExpire = undefined;
    await user.save();

    res.json({ msg: "Password reset successful" });
  } catch (err) {
    console.error("Reset error:", err);
    res.status(500).json({ msg: "Failed to reset password" });
  }
});

// ------------------- CHATBOT -------------------
app.post("/api/chat", (req, res) => {
  const msg = req.body.message.toLowerCase();
  let reply = "Sorry, I didn’t understand that.";

  if (msg.includes("hello") || msg.includes("hi")) reply = "Hi! How can I assist?";
  else if (msg.includes("name")) reply = "I'm a chatbot built with Node.js and React.";
  else if (msg.includes("help")) reply = "Sure, what do you need help with?";

  res.json({ reply });
});

// ------------------- FEEDBACK -------------------
app.post('/api/feedback', async (req, res) => {
  console.log("📥 Feedback received:", req.body);

  try {
    const newFeedback = new Feedback(req.body);
    await newFeedback.save();
    res.status(201).json({ msg: "Feedback saved successfully" });
  } catch (err) {
    console.error("❌ Failed to save feedback:", err);
    res.status(500).json({ msg: "Error saving feedback" });
  }
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
