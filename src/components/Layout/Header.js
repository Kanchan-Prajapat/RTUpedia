
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { useAuth } from "../../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleInfo,
  faMessage,
  faCircleUser,
  faHouse,
  faBars,
  faBook,
  faCalculator,
  faFileLines,
} from "@fortawesome/free-solid-svg-icons";
import "./Header.css";

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const scrollToSection = (id) => {
    if (window.location.pathname !== "/") {
      navigate("/", { state: { scrollTo: id } });
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }

    setSidebarOpen(false);
  };

  const closeSidebar = () => setSidebarOpen(false);

  const profileImage =
    user?.profileImage ||
    user?.picture ||
    "https://cdn-icons-png.flaticon.com/512/149/149071.png";

  return (
    <>
      <header className="main-header">
        <div className="header-container">

          {/* MOBILE MENU */}
          <button
            className="menu-btn"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={sidebarOpen}
          >
            <FontAwesomeIcon icon={faBars} />
          </button>

          {/* LOGO */}
          <div className="logo-group">
            <Link to="/" className="logo">
              RTUpedia
            </Link>
            <h5>Smart Study Hub for RTU Students</h5>
          </div>

          {/* DESKTOP NAVIGATION */}
          <nav className="nav-links">

            <Link to="/" className="nav-link" aria-label="Home">
              <FontAwesomeIcon icon={faHouse} />
            </Link>

            <button
              type="button"
              className="nav-link nav-action"
              onClick={() => scrollToSection("sgpa")}
              aria-label="SGPA Calculator"
            >
              <FontAwesomeIcon icon={faCalculator} />
            </button>

            <Link to="/about" className="nav-link" aria-label="About">
              <FontAwesomeIcon icon={faCircleInfo} />
            </Link>

            <Link to="/contact" className="nav-link" aria-label="Contact">
              <FontAwesomeIcon icon={faMessage} />
            </Link>

            <ThemeToggle />

            {/* DESKTOP PROFILE */}
            {user ? (
              <div className="profile-wrapper">
                <button
                  type="button"
                  className="profile-trigger"
                  onClick={() => setProfileOpen(!profileOpen)}
                  aria-label="Toggle profile menu"
                  aria-expanded={profileOpen}
                >
                  <img
                    src={profileImage}
                    className="profile-img"
                    alt="Profile"
                  />
                </button>

                {profileOpen && (
                  <div className="profile-dropdown">
                    <p><b>{user.name}</b></p>
                    <p>{user.email}</p>
                    <button
                      onClick={() => {
                        logout();
                        setProfileOpen(false);
                      }}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="nav-link" aria-label="Login">
                <FontAwesomeIcon icon={faCircleUser} />
              </Link>
            )}
          </nav>
        </div>
      </header>

      {/* MOBILE SIDEBAR */}
      <div
        className={`mobile-sidebar ${sidebarOpen ? "active" : ""}`}
        aria-hidden={!sidebarOpen}
      >
        <button
          className="close-btn"
          onClick={closeSidebar}
          aria-label="Close navigation menu"
        >
          ✖
        </button>

        <Link to="/" className="sidebar-item" onClick={closeSidebar}>
          <FontAwesomeIcon icon={faHouse} />
          <span>Home</span>
        </Link>

        <button
          type="button"
          className="sidebar-item"
          onClick={() => scrollToSection("notes")}
        >
          <FontAwesomeIcon icon={faBook} />
          <span>Notes</span>
        </button>

        <button
          type="button"
          className="sidebar-item"
          onClick={() => scrollToSection("syllabus")}
        >
          <FontAwesomeIcon icon={faFileLines} />
          <span>Syllabus</span>
        </button>

        <button
          type="button"
          className="sidebar-item"
          onClick={() => scrollToSection("sgpa")}
        >
          <FontAwesomeIcon icon={faCalculator} />
          <span>SGPA Calculator</span>
        </button>

        <Link to="/about" className="sidebar-item" onClick={closeSidebar}>
          <FontAwesomeIcon icon={faCircleInfo} />
          <span>About</span>
        </Link>

        <Link to="/contact" className="sidebar-item" onClick={closeSidebar}>
          <FontAwesomeIcon icon={faMessage} />
          <span>Contact</span>
        </Link>

        {/* THEME TOGGLE */}
        <div className="sidebar-item theme-sidebar-item">
          <span>Theme</span>
          <div className="theme-toggle-wrap">
            <ThemeToggle />
          </div>
        </div>

        {/* SIDEBAR PROFILE */}
        {user ? (
          <div className="sidebar-item profile-side">
            <img
              src={profileImage}
              className="sidebar-profile-img"
              alt="Profile"
            />

            <div className="sidebar-profile-info">
              <span>{user.name}</span>
              <button
                onClick={() => {
                  logout();
                  closeSidebar();
                }}
              >
                Logout
              </button>
            </div>
          </div>
        ) : (
          <Link to="/login" className="sidebar-item" onClick={closeSidebar}>
            <FontAwesomeIcon icon={faCircleUser} />
            <span>Login</span>
          </Link>
        )}
      </div>

      {/* OVERLAY */}
      {sidebarOpen && (
        <div className="overlay" onClick={closeSidebar} />
      )}
    </>
  );
};

export default Header;
