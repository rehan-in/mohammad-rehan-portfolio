const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema({
  projectTitle: { type: String, required: true, unique: true },
  ratings: {
    1: { type: Number, default: 0 },
    2: { type: Number, default: 0 },
    3: { type: Number, default: 0 },
    4: { type: Number, default: 0 },
    5: { type: Number, default: 0 },
  },
  ratingsCount: { type: Number, default: 0 },
  ratingsSum: { type: Number, default: 0 },
  averageRating: { type: Number, default: 0 }
});

module.exports = mongoose.model("Rating", ratingSchema);
