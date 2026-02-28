import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GraduationCap } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { isValidEmail } from '../utils/helpers';
import '../styles/Auth.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student',
    studentId: '',
    facultyId: '',
    department: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validation
    if (!formData.name || !formData.email || !formData.password) {
      setError('Please fill in all required fields');
      return;
    }

    if (!isValidEmail(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Create user object
    const user = {
      id: Date.now(),
      name: formData.name,
      email: formData.email,
      role: formData.role,
      studentId: formData.studentId,
      facultyId: formData.facultyId,
      department: formData.department
    };

    register(user);
    setSuccess('Registration successful! Redirecting...');
    
    setTimeout(() => {
      if (user.role === 'student') {
        navigate('/student-dashboard');
      } else {
        navigate('/faculty-dashboard');
      }
    }, 1500);
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <div className="auth-header">
          <div className="auth-logo">
            <GraduationCap />
          </div>
          <h1 className="auth-title">Create Account</h1>
          <p className="auth-subtitle">Join our academic community</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {error && <div className="auth-error">{error}</div>}
          {success && <div className="auth-success">{success}</div>}

          <div className="auth-form-group">
            <label className="auth-label">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="auth-select"
            >
              <option value="student">Student</option>
              <option value="faculty">Faculty</option>
            </select>
          </div>

          <div className="auth-form-group">
            <label className="auth-label">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="auth-input"
              required
            />
          </div>

          <div className="auth-form-group">
            <label className="auth-label">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="auth-input"
              required
            />
          </div>

          {formData.role === 'student' ? (
            <div className="auth-form-group">
              <label className="auth-label">Student ID</label>
              <input
                type="text"
                name="studentId"
                value={formData.studentId}
                onChange={handleChange}
                placeholder="Enter your student ID"
                className="auth-input"
              />
            </div>
          ) : (
            <div className="auth-form-group">
              <label className="auth-label">Faculty ID</label>
              <input
                type="text"
                name="facultyId"
                value={formData.facultyId}
                onChange={handleChange}
                placeholder="Enter your faculty ID"
                className="auth-input"
              />
            </div>
          )}

          <div className="auth-form-group">
            <label className="auth-label">Department</label>
            <input
              type="text"
              name="department"
              value={formData.department}
              onChange={handleChange}
              placeholder="Enter your department"
              className="auth-input"
            />
          </div>

          <div className="auth-form-group">
            <label className="auth-label">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              className="auth-input"
              required
            />
          </div>

          <div className="auth-form-group">
            <label className="auth-label">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              className="auth-input"
              required
            />
          </div>

          <button type="submit" className="auth-button">
            Register
          </button>
        </form>

        <div className="auth-footer">
          Already have an account?{' '}
          <Link to="/login" className="auth-link">
            Login here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
