import { Link } from "react-router";
import { GraduationCap, Users, FileCheck } from "lucide-react";
import '../styles/Landing.css';

export function Landing() {
  return (
    <div className="landing-container">
      {/* Navbar */}
      <nav className="landing-navbar">
        <div className="landing-logo">
          <GraduationCap className="landing-logo-icon" />
          <span className="landing-logo-text">AssignmentHub</span>
        </div>
        <div className="landing-nav-buttons">
          <Link to="/student/dashboard" className="landing-btn-login">
            Login
          </Link>
          <Link to="/faculty/dashboard" className="landing-btn-register">
            Register
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="landing-hero">
        <div className="landing-hero-content">
          <h1 className="landing-hero-title">
            Online Assignment Submission<br />and Grading System
          </h1>
          <p className="landing-hero-subtitle">
            Streamline your academic workflow with our modern, efficient platform
          </p>
          
          <div className="landing-hero-buttons">
            <Link to="/student/dashboard" className="landing-hero-btn-student">
              <Users className="w-5 h-5" />
              Student Portal
            </Link>
            <Link to="/faculty/dashboard" className="landing-hero-btn-faculty">
              <GraduationCap className="w-5 h-5" />
              Faculty Portal
            </Link>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="landing-hero-decoration-1" />
        <div className="landing-hero-decoration-2" />
      </div>

      {/* Features Section */}
      <div className="landing-features">
        <div className="landing-features-grid">
          <div className="landing-feature-card">
            <div className="landing-feature-icon">
              <FileCheck />
            </div>
            <h3 className="landing-feature-title">Easy Submission</h3>
            <p className="landing-feature-description">
              Submit your assignments with just a few clicks. Drag and drop interface for seamless uploads.
            </p>
          </div>

          <div className="landing-feature-card">
            <div className="landing-feature-icon">
              <Users />
            </div>
            <h3 className="landing-feature-title">Real-time Grading</h3>
            <p className="landing-feature-description">
              Faculty can grade assignments instantly and provide detailed feedback to students.
            </p>
          </div>

          <div className="landing-feature-card">
            <div className="landing-feature-icon">
              <GraduationCap />
            </div>
            <h3 className="landing-feature-title">Track Progress</h3>
            <p className="landing-feature-description">
              Monitor your academic progress with detailed analytics and grade reports.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
