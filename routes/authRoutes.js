const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// User Signup
router.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already in use" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role,
    });
    await user.save();

    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// User Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    // Generate JWT Token
    if (!process.env.JWT_SECRET)
      throw new Error("JWT_SECRET is missing in .env file");

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // ✅ Avoid redeclaring email
    const { _id, firstName, lastName, role } = user;

    res.status(200).json({
      message: "Login successful",
      token,
      role,
      user: { _id, firstName, lastName, email: user.email, role },
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

const requireAuth = require("../middleware/requireAuth");

// ✅ Update Instructor Profile
router.put("/instructor/profile", requireAuth, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);

    if (!user || user.role !== "instructor") {
      return res
        .status(403)
        .json({ message: "Only instructors can update profile" });
    }

    // Update instructorProfile
    user.instructorProfile = {
      ...user.instructorProfile,
      ...req.body,
    };

    await user.save();

    res.status(200).json({
      message: "Instructor profile updated successfully",
      instructorProfile: user.instructorProfile,
    });
  } catch (error) {
    console.error("Update Instructor Profile Error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// GET current instructor profile
router.get("/instructor/profile", requireAuth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("instructorProfile");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ instructorProfile: user.instructorProfile });
  } catch (error) {
    console.error("Fetch profile error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
