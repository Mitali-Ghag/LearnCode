import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/InstructorStudentManagement.css";

const InstructorStudentManagement = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch enrolled students for a specific course
  const fetchStudents = async (courseId) => {
    try {
      const response = await axios.get(`/api/enrollments/students/${courseId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setStudents(response.data.enrollments);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching students:", err);
      setError("Failed to fetch students");
      setLoading(false);
    }
  };

  // Replace with the courseId of the course whose students you want to manage
  const courseId = "some-course-id"; // You can get this from props or router

  useEffect(() => {
    fetchStudents(courseId);
  }, [courseId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="student-management-container">
      <h2>Student Management</h2>
      <table className="student-table">
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Email</th>
            <th>Progress</th>
          </tr>
        </thead>
        <tbody>
          {students.map((enrollment, index) => (
            <tr key={index}>
              <td>{enrollment.student.name}</td>
              <td>{enrollment.student.email}</td>
              <td>{enrollment.progress.percentage}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InstructorStudentManagement;
