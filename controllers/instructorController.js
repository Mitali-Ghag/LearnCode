// const mongoose = require('mongoose');
const Course = require("../models/Course");
const Enrollment = require("../models/Enrollment");

const getInstructorDashboardStats = async (req, res) => {
  try {
    const instructorId = req.user.id;
    console.log("Current logged-in instructor ID:", req.user.id);
    

    // 1. Get courses by this instructor
    const courses = await Course.find({ instructor: instructorId });
    const courseIds = courses.map((course) => course._id);

    // 2. Total courses
    const totalCourses = courses.length;

    // 3. Total enrolled students
    const enrolledStudents = await Enrollment.countDocuments({
      course: { $in: courseIds },
    });

    // 4. Earnings from paid enrollments
    const paidEnrollments = await Enrollment.find({
      course: { $in: courseIds },
      paymentStatus: "paid",
    });

    // Map course prices
    const coursePrices = {};
    courses.forEach((course) => {
      coursePrices[course._id] = course.price;
    });

    let totalEarnings = 0;
    paidEnrollments.forEach((enrollment) => {
      const price = coursePrices[enrollment.course] || 0;
      totalEarnings += price;
    });

    res.status(200).json({
      totalCourses,
      enrolledStudents,
      totalEarnings,
    });
  } catch (error) {
    console.error("Instructor Dashboard Error:", error);
    res.status(500).json({ message: "Failed to fetch dashboard stats" });
  }
};
// const getRecentCourses = async (req, res) => {
//   try {
//     // Get the instructor ID from the token (set by requireAuth middleware)
//     const instructorId = req.user.id;
//     const instructorObjectId = new mongoose.Types.ObjectId(instructorId);
//     // Find courses created by this instructor, sorted by creation date (newest first),
//     // and limit to, for example, 5 recent courses.
//     const courses = await Course.find({ instructor: instructorId ,
//       isDraft: false,
//       isPublished: true,
//     })
//       .sort({ createdAt: -1 })
//       .limit(5)
//       .select("title thumbnail createdAt isPublished isDraft"); // include fields you need

//     // Format the data for frontend use. For instance, if you want to show:
//     // - Course title
//     // - Course thumbnail URL
//     // - Some status (Active, Draft, etc.)
//     const recentCourses = courses.map((course) => ({
//       name: course.title,
//       // If you want the thumbnail URL, you can process it here:
//       thumbnail: course.thumbnail,
//       // For students enrolled in the course, if you have that info in the course document,
//       // otherwise default to a placeholder (or let it be added later)
//       // (Here I'm assuming that you are not storing enrolled students in the Course document directly)
//       // You might add another field later, or fetch it via Enrollment if needed.
//       status: course.isPublished ? "Active" : course.isDraft ? "Draft" : "Inactive",
//       createdAt: course.createdAt,
//     }));

//     res.status(200).json(recentCourses);
//   } catch (error) {
//     console.error("Error fetching recent courses:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };

module.exports = {
  getInstructorDashboardStats,
  // getRecentCourses,
};
