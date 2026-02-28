import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GraduationCap, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import '../styles/Navbar.css';

const Navbar = ({ title, showLogout = true }) => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <GraduationCap className="navbar-logo-icon" />
        <span className="navbar-logo-text">{title || 'AssignmentHub'}</span>
      </div>
      {showLogout && user && (
        <button onClick={handleLogout} className="navbar-logout">
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      )}
    </nav>
  );
};

export default Navbar;
