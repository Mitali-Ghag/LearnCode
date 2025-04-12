const express = require("express");
const router = express.Router();
const Review = require("../models/Review");
const Enrollment = require("../models/Enrollment"); // adjust path if needed
const authMiddleware = require("../middleware/requireAuth");

// POST - Submit Review
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { courseId, rating, comment } = req.body;
    const userId = req.user.id;

    const enrollment = await Enrollment.findOne({ userId, courseId });
    if (!enrollment) return res.status(403).json({ message: "Enroll in course to review." });

    const existing = await Review.findOne({ userId, courseId });
    if (existing) return res.status(400).json({ message: "You already reviewed this course." });

    const review = new Review({ courseId, userId, rating, comment });
    await review.save();

    res.status(201).json({ message: "Review submitted", review });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// GET - All reviews for a course
router.get("/:courseId", async (req, res) => {
  try {
    const reviews = await Review.find({ courseId: req.params.courseId }).populate("userId", "firstName lastName");
    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;
