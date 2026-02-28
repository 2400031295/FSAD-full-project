import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Upload, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import '../styles/Common.css';
import '../styles/Submission.css';

const UploadAssignment = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    course: '',
    courseTitle: '',
    description: '',
    dueDate: '',
    totalMarks: 100
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would save to database
    setIsSubmitted(true);
    setTimeout(() => {
      navigate('/faculty-dashboard');
    }, 2000);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0F172A', fontFamily: "'Inter', sans-serif" }}>
      <Navbar title="Faculty Portal" />

      <div className="page-container">
        <Link to="/faculty-dashboard" className="back-button">
          <ArrowLeft className="w-5 h-5" />
          Back to Dashboard
        </Link>

        <div className="page-content-narrow">
          <div className="page-header">
            <h1 className="page-title">Create Assignment</h1>
            <p className="page-description">
              Create a new assignment for your students
            </p>
          </div>

          <div className="glass-card large">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Assignment Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g., Data Structures - Assignment 5"
                  className="form-input"
                  required
                />
              </div>

              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">Course Code</label>
                  <input
                    type="text"
                    name="course"
                    value={formData.course}
                    onChange={handleChange}
                    placeholder="e.g., CS101"
                    className="form-input"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Course Title</label>
                  <input
                    type="text"
                    name="courseTitle"
                    value={formData.courseTitle}
                    onChange={handleChange}
                    placeholder="e.g., Data Structures"
                    className="form-input"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Provide detailed instructions for the assignment..."
                  className="form-textarea"
                  rows={6}
                  required
                />
              </div>

              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">Due Date</label>
                  <input
                    type="date"
                    name="dueDate"
                    value={formData.dueDate}
                    onChange={handleChange}
                    className="form-input"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Total Marks</label>
                  <input
                    type="number"
                    name="totalMarks"
                    value={formData.totalMarks}
                    onChange={handleChange}
                    placeholder="100"
                    className="form-input"
                    min="1"
                    required
                  />
                </div>
              </div>

              <button type="submit" className="btn btn-primary btn-full-width">
                <Upload className="w-5 h-5" />
                Create Assignment
              </button>

              {isSubmitted && (
                <div className="alert alert-success">
                  <CheckCircle className="w-5 h-5" />
                  <p>Assignment created successfully! Redirecting...</p>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadAssignment;
