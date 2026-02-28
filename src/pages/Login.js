import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GraduationCap } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { mockData } from '../data/mockData';
import '../styles/Auth.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'student'
  });
  const [error, setError] = useState('');
  const { login } = useAuth();
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

    // Find user in mock data
    const users = formData.role === 'student' ? mockData.students : mockData.faculty;
    const user = users.find(u => u.email === formData.email && u.password === formData.password);

    if (user) {
      login(user);
      if (user.role === 'student') {
        navigate('/student-dashboard');
      } else {
        navigate('/faculty-dashboard');
      }
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <div className="auth-header">
          <div className="auth-logo">
            <GraduationCap />
          </div>
          <h1 className="auth-title">Welcome Back</h1>
          <p className="auth-subtitle">Login to access your dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {error && <div className="auth-error">{error}</div>}

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

          <div className="auth-form-group">
            <label className="auth-label">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="auth-input"
              required
            />
          </div>

          <button type="submit" className="auth-button">
            Login
          </button>
        </form>

        <div className="auth-footer">
          Don't have an account?{' '}
          <Link to="/register" className="auth-link">
            Register here
          </Link>
        </div>

        <div className="auth-divider">
          <span>Demo Credentials</span>
        </div>

        <div style={{ color: '#94A3B8', fontSize: '12px', textAlign: 'center' }}>
          <p>Student: emily.johnson@university.edu / student123</p>
          <p>Faculty: sarah.williams@university.edu / faculty123</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
