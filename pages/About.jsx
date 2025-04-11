import React from "react";
import "../styles/About.css"; // Ensure CSS file exists
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import founder from "../assets/Founder.jpg"
const About = () => {
  return (
    <div>
      <Navbar/>
      <div className="about-page">
        {/* About LearnCode */}
        <div className="about-container">
          <div className="about-content">
            <h2>About LearnCode</h2>
            <p>
              LearnCode is built for students and instructors who are passionate about coding.  
              Our platform bridges the gap between learners and industry experts, providing  
              high-quality coding courses, hands-on projects, and real-world learning experiences.
            </p>
          </div>
          <div className="about-image">
            <img src={founder} alt="LearnCode Team" />
          </div>
        </div>

        {/* Our Mission */}
        <div className="mission-container">
          <div className="mission-image">
            <img src="/assets/mission-image.jpg" alt="Mission" />
          </div>
          <div className="mission-content">
            <h2>Our Mission: Empowering the Next Generation of Developers</h2>
            <p>
              We believe in making coding education **accessible, practical, and engaging**.  
              Whether you're a beginner or an experienced developer, LearnCode provides  
              structured learning paths, mentorship, and career support to help you succeed.
            </p>
          </div>
        </div>

        {/* Our Story */}
        <div className="story-container">
          <div className="story-content">
            <h2>Our Story</h2>
            <p>
              LearnCode started with a simple idea: **What if learning to code was fun, interactive, and career-focused?**  
              A group of developers and educators came together to build a platform that goes beyond theory—one that  
              **connects learners with real-world projects, industry experts, and job opportunities**. Today, we  
              have helped thousands of students gain in-demand coding skills and launch their careers.
            </p>
          </div>
          <div className="story-image">
            <img src="/assets/story-image.jpg" alt="Our Journey" />
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default About;
