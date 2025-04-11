import React, { useState } from "react";
import "../styles/InstructorRatings.css";

const ratingsData = [
  {
    courseName: "React for Beginners",
    averageRating: 4.7,
    reviews: [
      { student: "Aditi", rating: 5, review: "Very easy to understand!" },
      { student: "Rahul", rating: 4.5, review: "Loved the examples." },
    ],
  },
  {
    courseName: "Advanced JavaScript",
    averageRating: 4.5,
    reviews: [
      { student: "Sneha", rating: 4, review: "Concepts are well explained." },
      { student: "Yash", rating: 5, review: "Detailed and practical." },
    ],
  },
];

const InstructorRatings = () => {
  const [openCourse, setOpenCourse] = useState(null);

  const toggleCourse = (index) => {
    setOpenCourse(openCourse === index ? null : index);
  };

  return (
    <div className="ratings-container">
      <h2>Course Ratings & Reviews</h2>
      {ratingsData.map((course, index) => (
        <div key={index} className="course-rating-box">
          <div className="course-header" onClick={() => toggleCourse(index)}>
            <h3>{course.courseName}</h3>
            <span>⭐ {course.averageRating}</span>
            <button>{openCourse === index ? "Hide Reviews" : "View Reviews"}</button>
          </div>
          {openCourse === index && (
            <div className="review-list">
              {course.reviews.map((rev, idx) => (
                <div key={idx} className="review">
                  <strong>{rev.student}</strong> — ⭐ {rev.rating}
                  <p>{rev.review}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default InstructorRatings;
