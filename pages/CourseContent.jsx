import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/CourseContent.css";

const CourseContent = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedLecture, setSelectedLecture] = useState(0);
  const [completedLectures, setCompletedLectures] = useState([]);
  const [progressPercentage, setProgressPercentage] = useState(0);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/enrollments/content/${courseId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setCourse(res.data.course);
        setCompletedLectures(res.data.progress?.completedLectures || []);
        calculateProgress(
          res.data.course.lectures,
          res.data.progress?.completedLectures || []
        );

        if (res.data.course.lectures && res.data.course.lectures.length > 0) {
          setSelectedLecture(0);
        }
      } catch (err) {
        console.error("❌ Error loading content:", err);
        alert("Access denied or you're not enrolled.");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [courseId, navigate, token]);

  const calculateProgress = (lectures, completed) => {
    const total = lectures?.length || 0;
    const completedCount = completed?.length || 0;
    const percent = total > 0 ? Math.round((completedCount / total) * 100) : 0;
    setProgressPercentage(percent);
  };

  const handleMarkComplete = async () => {
    try {
      const lectureIndex = selectedLecture;
      const alreadyCompleted = completedLectures.includes(lectureIndex);

      await axios.put(
        "http://localhost:5000/api/enrollments/progress",
        { courseId, lectureIndex, unmark: alreadyCompleted },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      let updatedCompleted;
      if (alreadyCompleted) {
        updatedCompleted = completedLectures.filter((i) => i !== lectureIndex);
      } else {
        updatedCompleted = [...completedLectures, lectureIndex];
      }

      setCompletedLectures(updatedCompleted);
      calculateProgress(course.lectures, updatedCompleted);
    } catch (err) {
      console.error("❌ Failed to update progress:", err);
      alert("Failed to update progress");
    }
  };

  // ✅ FIXED: simplified check for loading state
  if (loading || course === null) {
    return <p>Loading course content...</p>;
  }

  const lecture = course.lectures[selectedLecture];

  return (
    <div className="course-container">
      {/* Sidebar */}
      <div className="sidebar">
        <h3>Lectures</h3>
        <ul>
          {course.lectures.map((lecture, index) => (
            <li
              key={lecture._id || index}
              className={selectedLecture === index ? "active" : ""}
              onClick={() => setSelectedLecture(index)}
            >
              {index + 1}. {lecture.title}{" "}
              {completedLectures.includes(index) && (
                <span className="check-icon">✔</span>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className="content-area">
        <h2>{course.title}</h2>
        <p>
          Progress: {progressPercentage}%{" "}
          {progressPercentage === 100 && (
            <span className="completed-text">🎉 Completed!</span>
          )}
        </p>

        {lecture ? (
          <div className="video-section">
            <h4>{lecture.title}</h4>
            <video
              className="video-player"
              controls
              src={`http://localhost:5000/${lecture.video.replace(/\\/g, "/")}`}
            />
            <button className="complete-btn" onClick={handleMarkComplete}>
              {completedLectures.includes(selectedLecture)
                ? "Unmark as Completed"
                : "Mark as Completed"}
            </button>
          </div>
        ) : (
          <p>Select a lecture to view.</p>
        )}
      </div>
    </div>
  );
};

export default CourseContent;
