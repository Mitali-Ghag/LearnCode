import React, { useState } from "react";
import "../styles/ForgotPassword.css"; // Import the CSS file
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Password reset link sent to:", email);
    // Later: Send request to backend
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-box">
        <h2>Forgot Password?</h2>
        <p>Enter your email address, and we'll send you a link to reset your password.</p>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Send Reset Link</button>
        </form>
        <p className="back-to-login">
          <Link to="/login">Back to Login</Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
