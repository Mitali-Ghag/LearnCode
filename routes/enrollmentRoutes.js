const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/requireAuth");
const {
  enrollStudentToCourse,
  getMyEnrolledCourses,
  updateLectureProgress,
  getStudentsEnrolledInCourse,
} = require("../controllers/enrollmentController");
const Enrollment = require("../models/Enrollment");
const Course = require("../models/Course");


// POST: Enroll student
router.post("/enroll", requireAuth, enrollStudentToCourse);

// GET: Course content (only if enrolled)
// GET: Course content (only if enrolled)
router.get("/content/:courseId", requireAuth, async (req, res) => {
  try {
    const { courseId } = req.params;
    const studentId = req.user.id;

    const enrollment = await Enrollment.findOne({ student: studentId, course: courseId });
    if (!enrollment) {
      return res.status(403).json({ message: "Access denied. You're not enrolled." });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found." });
    }

    // ✅ Return both course and progress
    return res.status(200).json({ course, progress: enrollment.progress });

  } catch (error) {
    console.error("❌ Error loading course content:", error);
    if (!res.headersSent) {
      return res.status(500).json({ message: "Server error" });
    }
  }
});
// ✅ Check if the student is enrolled in a course
router.get("/check/:courseId", requireAuth, async (req, res) => {
  try {
    const { courseId } = req.params;
    const studentId = req.user.id;

    const enrollment = await Enrollment.findOne({
      student: studentId,
      course: courseId,
    });

    res.json({ enrolled: !!enrollment });
  } catch (err) {
    console.error("❌ Error checking enrollment:", err);
    res.status(500).json({ message: "Server error while checking enrollment" });
  }
});



// ✅ NEW ROUTES:
router.get("/my-courses", requireAuth, getMyEnrolledCourses);
router.put("/progress", requireAuth, updateLectureProgress);
router.get(
  "/course/:courseId/students",
  requireAuth,
  getStudentsEnrolledInCourse
);

module.exports = router;
