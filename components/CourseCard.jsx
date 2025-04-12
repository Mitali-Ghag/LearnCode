import React from "react";
import { Link } from "react-router-dom";
import "../styles/CourseCard.css";

const CourseCard = ({ course }) => {
  const BASE_URL = "http://localhost:5000";
  const thumbnailSrc = course.thumbnail
    ? `${BASE_URL}/${course.thumbnail}`
    : "/default-thumbnail.jpg"; // optional fallback image

  return (
    <div className="course-card">
      <img className="course-image" src={thumbnailSrc} alt={course.title} />

      <div className="course-info">
        <h3 className="course-title">{course.title}</h3>
        <p>
          By {course.instructor?.firstName} {course.instructor?.lastName}
        </p>

        <p className="course-duration">
          {course.accessType === "lifetime"
            ? "Lifetime Access"
            : `${course.durationInWeeks || 0} weeks`}
        </p>
        <p className="course-price">
          {course.price === 0 ? "Free" : `₹${course.price}`}
        </p>
      </div>

      <Link to={`/course/${course._id}`}>View Course</Link>
    </div>
  );
};

export default CourseCard;
