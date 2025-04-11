import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../styles/InstructorDashboard.css";

const InstructorDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // State for Dashboard Data
  const [dashboardData, setDashboardData] = useState({
    totalCourses: 12,
    enrolledStudents: 530,
    totalEarnings: 45000, // in INR
  });

  // State for Recent Courses
  const [recentCourses, setRecentCourses] = useState([
    { name: "React for Beginners", students: 120, status: "Active" },
    { name: "Advanced JavaScript", students: 85, status: "Active" },
    { name: "Python Machine Learning", students: 65, status: "Draft" },
  ]);

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <h1>Instructor Panel</h1>
        <nav>
          <Link
            to="/dashboard"
            className={location.pathname === "/dashboard" ? "active" : ""}
            onClick={(e) => {
              if (location.pathname === "/dashboard") e.preventDefault(); // Prevent reload
            }}
          >
            📊 Dashboard
          </Link>
          <Link
            to="/instructor-my-courses"
            className={
              location.pathname === "/instructor-my-courses" ? "active" : ""
            }
          >
            📚 My Courses
          </Link>
          <Link
            to="/add-course"
            className={location.pathname === "/add-course" ? "active" : ""}
          >
            ➕ Add New Course
          </Link>
          <Link
            to="/instructor-student-management"
            className={
              location.pathname === "/instructor-student-management"
                ? "active"
                : ""
            }
          >
            🎓 Student Management
          </Link>
          <Link
            to="/instructor-earnings"
            className={
              location.pathname === "/instructor-earnings" ? "active" : ""
            }
          >
            💰 Earnings & Payouts
          </Link>
          <Link
            to="/instructor-ratings"
            className={
              location.pathname === "/instructor-ratings" ? "active" : ""
            }
          >
            ⭐ Reviews & Ratings
          </Link>
          <Link
            to="/instructor-messages-and-support"
            className={location.pathname === "/instructor-messages-and-support" ? "active" : ""}
          >
            📩 Messages & Support
          </Link>
          <Link
            to="/instructor-setting"
            className={
              location.pathname === "/instructor-setting" ? "active" : ""
            }
          >
            ⚙️ Settings
          </Link>
          <button
            className="logout-button"
            onClick={() => {
              // Clear local storage or auth tokens if needed
              localStorage.clear();
              // Redirect to login or home
              navigate("/");
            }}
          >
            🚪 Logout
          </button>
        </nav>
      </aside>

      {/* Main Dashboard */}
      <main className="main-dashboard">
        {/* Header */}
        <div className="dashboard-header">
          <h2>Welcome, Instructor!</h2>
          <button onClick={() => navigate("/add-course")}>
            Add New Course
          </button>
        </div>

        {/* Overview Section */}
        <div className="overview">
          <div className="card">
            <h3>Total Courses</h3>
            <p>{dashboardData.totalCourses}</p>
          </div>
          <div className="card">
            <h3>Enrolled Students</h3>
            <p>{dashboardData.enrolledStudents}</p>
          </div>
          <div className="card">
            <h3>Total Earnings</h3>
            <p>₹{dashboardData.totalEarnings.toLocaleString()}</p>
          </div>
        </div>

        {/* Recent Courses Table */}
        <div className="dashboard-table">
          <h3>Recent Courses</h3>
          <table>
            <thead>
              <tr>
                <th>Course Name</th>
                <th>Enrolled Students</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentCourses.map((course, index) => (
                <tr key={index}>
                  <td>{course.name}</td>
                  <td>{course.students}</td>
                  <td>{course.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default InstructorDashboard;
