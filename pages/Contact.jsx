import React from "react";
import Navbar from "../components/Navbar"; // Import Navbar
import Footer from "../components/Footer"; // Import Footer
import "../styles/Contact.css"; // Contact page styles
import contactImage from "../assets/contact.png"; // Replace with actual image

const Contact = () => {
  return (
    <div className="contact-page">
      <Navbar />  {/* Navbar at the top of the page */}
      
      <section className="contact-section">
        <div className="contact-container">
          {/* Left: Image Section */}
          <div className="contact-image">
            <img src={contactImage} alt="Contact Us" />
          </div>

          {/* Right: Form Section */}
          <div className="contact-form">
            <h2>GET IN TOUCH</h2>
            <p>We'd love to hear from you and help you on your journey.</p>

            <div className="contact-info">
              <span>📧 support@learnCode.com</span>
              <span>📞 +1-202-555-0127</span>
            </div>

            <form>
              <label htmlFor="name">Name</label>
              <input type="text" id="name" placeholder="Your name here" required />

              <label htmlFor="email">Email</label>
              <input type="email" id="email" placeholder="Your email here" required />

              <label htmlFor="message">Message</label>
              <textarea id="message" placeholder="Your message here" required></textarea>

              <button type="submit">Send Message</button>
            </form>
          </div>
        </div>
      </section>

      <Footer />  {/* Footer at the bottom of the page */}
    </div>
  );
};

export default Contact;
