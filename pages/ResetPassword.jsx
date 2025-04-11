import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import "../styles/ResetPassword.css";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token"); // Get token from URL (to be used in backend)
  
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (formData.newPassword !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    console.log("Reset Password Data:", { token, password: formData.newPassword });
    // Later: Send data to backend for updating password
    
    setMessage("Your password has been reset successfully!");
    setTimeout(() => navigate("/login"), 2000); // Redirect to login page after 2 sec
  };

  return (
    <div className="reset-password-container">
      <div className="reset-password-box">
        <h2>Reset Password</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            name="newPassword"
            placeholder="New Password"
            value={formData.newPassword}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm New Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          {error && <p className="error">{error}</p>}
          {message && <p className="message">{message}</p>}
          <button type="submit">Update Password</button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
