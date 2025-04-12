const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

// User Signup
router.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, email, password, role, qualification, description, experience, specialization, linkedinProfile } = req.body;

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
      qualification: role === "instructor" ? qualification : undefined,
      description: role === "instructor" ? description : undefined,
      experience: role === "instructor" ? experience : undefined,
      specialization,
      linkedinProfile,
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



// ✅ Update Instructor Profile
// router.put("/instructor/profile", requireAuth, async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const user = await User.findById(userId);

//     if (!user || user.role !== "instructor") {
//       return res
//         .status(403)
//         .json({ message: "Only instructors can update profile" });
//     }

//     // Update instructorProfile
//     user.instructorProfile = {
//       ...user.instructorProfile,
//       ...req.body,
//     };

//     await user.save();

//     res.status(200).json({
//       message: "Instructor profile updated successfully",
//       instructorProfile: user.instructorProfile,
//     });
//   } catch (error) {
//     console.error("Update Instructor Profile Error:", error);
//     res.status(500).json({ message: "Server Error", error: error.message });
//   }
// });

// GET current instructor profile
// router.get("/instructor/profile", requireAuth, async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id).select("instructorProfile");
//     if (!user) return res.status(404).json({ message: "User not found" });

//     res.status(200).json({ instructorProfile: user.instructorProfile });
//   } catch (error) {
//     console.error("Fetch profile error:", error);
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// });
router.put('/update-profile', requireAuth, async (req, res) => {
  try {
    const userId = req.user.id;  // Get the user ID from the decoded JWT token
    const { firstName, lastName, email, password, qualification, description, experience, specialization, linkedinProfile } = req.body;

    // Find user by ID
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Only update fields that are provided
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (email) user.email = email;
    if (password) user.password = await bcrypt.hash(password, 10);  // Rehash password if it's updated
    if (qualification) user.qualification = qualification;
    if (description) user.description = description;
    if (experience) user.experience = experience;
    if (specialization) user.specialization = specialization;
    if (linkedinProfile) user.linkedinProfile = linkedinProfile;

    await user.save();  // Save the updated user data

    res.status(200).json({ message: "Profile updated successfully", user });
  } catch (error) {
    console.error("Update Profile Error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

router.get("/profile", requireAuth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ user });
  } catch (error) {
    console.error("Fetch Profile Error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

module.exports = router;
