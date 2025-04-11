const mongoose = require("mongoose");

const lectureSchema = new mongoose.Schema({
  title: String,
  video: String,
  videoName: String,
  duration: Number
});

const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  thumbnail: String,
  category: String,
  level: String,

  // Add comment to clarify usage
  accessType: {
    type: String,
    enum: ["free", "paid"],
    required: true,
  },

  // Duration of access in weeks; 0 means lifetime
  durationInWeeks: {
    type: Number,
    default: 0,
  },

  // Total course video content duration in minutes/hours
  courseDuration: Number,

  providesCertificate: Boolean,
  certificateTemplate: String,

  price: {
    type: Number,
    default: 0,
  },

  lectures: [lectureSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  isDraft: {
    type: Boolean,
    default: false,
  },
  isPublished: {
    type: Boolean,
    default: false,
  },

  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }
});

module.exports = mongoose.model("Course", courseSchema);
