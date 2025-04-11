import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../styles/SignUp.css";

const Signup = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const defaultRole = queryParams.get("role") || "student"; // Default role is Student

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: defaultRole, // Set role based on URL param
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validate First Name & Last Name (Only letters allowed)
    const nameRegex = /^[A-Za-z]+$/;
    if (!nameRegex.test(formData.firstName)) {
      setError("First Name can only contain letters.");
      return;
    }
    if (!nameRegex.test(formData.lastName)) {
      setError("Last Name can only contain letters.");
      return;
    }

    // Check if Passwords Match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }

      alert("Signup successful! Please login.");
      navigate("/login");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="student">Student</option>
            <option value="instructor">Instructor</option>
          </select>
          {error && <p className="error">{error}</p>}
          <button type="submit">Sign Up</button>
        </form>
        <p className="switch-text">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;