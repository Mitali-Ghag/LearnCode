import React, { useState } from "react";
import axios from "axios";
import "../styles/InstructorSetting.css";

const InstructorSetting = () => {
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "Mitali Mehta",
    email: "mitali@email.com",
    description: "Full Stack Web Developer passionate about teaching.",
    qualification: "BCA",
    experience: "2 years",
    specialization: "Web Development",
    linkedin: "https://linkedin.com/in/mitali",
    bankName: "HDFC Bank",
    accountHolderName: "Mitali Mehta",
    accountNumber: "123456789012",
    ifscCode: "HDFC0001234",
    upiId: "mitalimehta@upi",
  });

  const isProfileComplete =
    formData.fullName && formData.qualification && formData.specialization;
  const isBankComplete =
    formData.bankName && formData.accountNumber && formData.ifscCode;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsEditing(false);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        "http://localhost:5000/api/auth/instructor/profile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Profile saved successfully!");
      console.log("Updated profile:", response.data.instructorProfile);
    } catch (error) {
      console.error(
        "Error saving profile:",
        error.response?.data || error.message
      );
      alert("Failed to save profile. Please try again.");
    }
  };

  return (
    <div className="instructor-settings-container">
      <h2>Instructor Settings</h2>

      {!isEditing ? (
        <div className="summary-box">
          <div>
            <h3>Profile Summary</h3>
            {isProfileComplete ? (
              <ul>
                <li>
                  <strong>Full Name:</strong> {formData.fullName}
                </li>
                <li>
                  <strong>Qualification:</strong> {formData.qualification}
                </li>
                <li>
                  <strong>Specialization:</strong> {formData.specialization}
                </li>
                <li>
                  <strong>Experience:</strong> {formData.experience}
                </li>
                <li>
                  <strong>Description:</strong> {formData.description}
                </li>
                <li>
                  <strong>LinkedIn:</strong>{" "}
                  {formData.linkedin ? (
                    <a
                      href={formData.linkedin}
                      target="_blank"
                      rel="noreferrer"
                    >
                      View
                    </a>
                  ) : (
                    <span className="not-provided">Not Provided</span>
                  )}
                </li>
              </ul>
            ) : (
              <p className="warning">
                Some profile details are missing. Please complete your profile.
              </p>
            )}
          </div>

          <div>
            <h3>Bank Details</h3>
            {isBankComplete ? (
              <ul>
                <li>
                  <strong>Bank Name:</strong> {formData.bankName}
                </li>
                <li>
                  <strong>Account Holder:</strong> {formData.accountHolderName}
                </li>
                <li>
                  <strong>Account No:</strong> {formData.accountNumber}
                </li>
                <li>
                  <strong>IFSC Code:</strong> {formData.ifscCode}
                </li>
                <li>
                  <strong>UPI ID:</strong>{" "}
                  {formData.upiId ? (
                    formData.upiId
                  ) : (
                    <span className="not-provided">Not Provided</span>
                  )}
                </li>
              </ul>
            ) : (
              <p className="warning">
                Bank details are missing. Add them to create paid courses.
              </p>
            )}
          </div>

          <button className="edit-btn" onClick={() => setIsEditing(true)}>
            Edit Information
          </button>
        </div>
      ) : (
        <form className="settings-form" onSubmit={handleSubmit}>
          <h3>Edit Profile</h3>
          <label>
            Full Name:
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Description:
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </label>
          <label>
            Qualification:
            <input
              type="text"
              name="qualification"
              value={formData.qualification}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Experience:
            <input
              type="text"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
            />
          </label>
          <label>
            Specialization:
            <input
              type="text"
              name="specialization"
              value={formData.specialization}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            LinkedIn / Portfolio:
            <input
              type="url"
              name="linkedin"
              value={formData.linkedin}
              onChange={handleChange}
            />
          </label>

          <h3>Bank Details</h3>
          <label>
            Bank Name:
            <input
              type="text"
              name="bankName"
              value={formData.bankName}
              onChange={handleChange}
            />
          </label>
          <label>
            Account Holder Name:
            <input
              type="text"
              name="accountHolderName"
              value={formData.accountHolderName}
              onChange={handleChange}
            />
          </label>
          <label>
            Account Number:
            <input
              type="text"
              name="accountNumber"
              value={formData.accountNumber}
              onChange={handleChange}
            />
          </label>
          <label>
            IFSC Code:
            <input
              type="text"
              name="ifscCode"
              value={formData.ifscCode}
              onChange={handleChange}
            />
          </label>
          <label>
            UPI ID (optional):
            <input
              type="text"
              name="upiId"
              value={formData.upiId}
              onChange={handleChange}
            />
          </label>

          <button className="save-btn" type="submit">
            Save Changes
          </button>
        </form>
      )}
    </div>
  );
};

export default InstructorSetting;
