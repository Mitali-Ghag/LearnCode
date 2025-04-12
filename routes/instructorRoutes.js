const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/requireAuth");
const { getInstructorDashboardStats  } = require("../controllers/instructorController");

// Protected route: Instructor dashboard summary
router.get("/dashboard-stats", requireAuth, getInstructorDashboardStats);
// router.get("/recent-courses", requireAuth, getRecentCourses);

module.exports = router;
