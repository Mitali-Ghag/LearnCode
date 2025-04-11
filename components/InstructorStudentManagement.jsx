import React from "react";
import "../styles/InstructorStudentManagement.css";

const InstructorStudentManagement = () => {
  const studentData = [
    { name: "Aryan Shah", email:"aryan@email.com", course: "React for Beginners", progress: 65 },
    { name: "Mitali Mehta", email:"mitali@email.com", course: "Python Machine Learning", progress: 90 },
    { name: "Riya Verma", email:"riyav@.com", course: "Advanced JavaScript", progress: 40 },
  ];

  return (
    <div className="student-management-container">
      <h2>Student Management</h2>
      <table className="student-table">
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Email</th>
            <th>Course Name</th>
            <th>Progress</th>
          </tr>
        </thead>
        <tbody>
          {studentData.map((student, index) => (
            <tr key={index}>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.course}</td>
              <td>{student.progress}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InstructorStudentManagement;
