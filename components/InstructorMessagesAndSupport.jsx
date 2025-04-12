import React from "react";
import "../styles/InstructorMessagesAndSupport.css";

const InstructorMessagesAndSupport = () => {
  // Later you can fetch actual messages or use state here
  return (
    <div className="messages-container">
      <h2>📩 Messages & Support</h2>
      <p>You have no new messages at the moment.</p>
      
      <div className="support-section">
        <h3>Need help?</h3>
        <p>If you're facing any issues, feel free to contact our support team.</p>
        <button onClick={() => alert("Redirecting to support...")}>
          Contact Support
        </button>
      </div>
    </div>
  );
};

export default InstructorMessagesAndSupport;
