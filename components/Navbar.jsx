import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, [location]); // Re-run when route changes

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/landing"); // Back to landing after logout
  };

  return (
    <nav className="navbar">
      <div className="logo">LearnCode</div>

      <ul className={menuOpen ? "nav-links open" : "nav-links"}>
        <li><Link to="/landing">Home</Link></li>
        <li><Link to="/instructor-landing">Instructor</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        {/* Show "Dashboard" only if logged in */}
        {isLoggedIn && <li><Link to="/student-dashboard">Dashboard</Link></li>}
      </ul>

      {/* Right-side buttons */}
      <div className="auth-buttons">
        {!isLoggedIn ? (
          <>
            <Link to="/login"><button className="login-btn">Login</button></Link>
            <Link to="/signup"><button className="signup-btn">Sign Up</button></Link>
          </>
        ) : (
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        )}
      </div>

      <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>☰</div>
    </nav>
  );
};

export default Navbar;
