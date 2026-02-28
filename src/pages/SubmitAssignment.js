import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getAssignmentById } from '../data/mockData';
import { formatDate } from '../utils/helpers';
import '../styles/Submission.css';
import '../styles/Common.css';

const SubmitAssignment = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const assignment = getAssignmentById(id) || {
    title: 'Assignment 3',
    course: 'CS101',
    courseTitle: 'Data Structures',
    dueDate: '2026-03-01',
    totalMarks: 100
  };

  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleSubmit = () => {
    if (selectedFile) {
      setIsSubmitted(true);
      setTimeout(() => {
        navigate('/student-dashboard');
      }, 2000);
    }
  };

  return (
    <div className="submission-container">
      <Link to="/student-dashboard" className="back-button">
        <ArrowLeft className="w-5 h-5" />
        Back to Dashboard
      </Link>

      <div className="submission-content">
        <h1 className="submission-title">Submit Assignment</h1>
        <p className="submission-description">
          Upload your assignment file and submit it for grading
        </p>

        {/* Assignment Details Card */}
        <div className="details-card">
          <h3 className="details-title">Assignment Details</h3>
          <div className="details-grid">
            <div>
              <p className="detail-item-label">Course</p>
              <p className="detail-item-value">{assignment.course} - {assignment.courseTitle}</p>
            </div>
            <div>
              <p className="detail-item-label">Due Date</p>
              <p className="detail-item-value">{formatDate(assignment.dueDate)}</p>
            </div>
            <div>
              <p className="detail-item-label">Assignment</p>
              <p className="detail-item-value">{assignment.title}</p>
            </div>
            <div>
              <p className="detail-item-label">Max File Size</p>
              <p className="detail-item-value">10 MB</p>
            </div>
          </div>
        </div>

        {/* Upload Card */}
        <div className="upload-card">
          <h3 className="upload-title">Upload File</h3>

          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`dropzone ${isDragging ? 'dragging' : ''}`}
          >
            <Upload className="dropzone-icon" />
            <h4 className="dropzone-title">
              {selectedFile ? selectedFile.name : 'Drag & Drop your file here'}
            </h4>
            <p className="dropzone-subtitle">or click to browse</p>
            <input
              type="file"
              onChange={handleFileSelect}
              className="file-input-hidden"
              id="fileInput"
            />
            <label htmlFor="fileInput" className="dropzone-button">
              Browse Files
            </label>
          </div>

          {selectedFile && (
            <div className="file-selected">
              <p className="file-selected-text">
                <strong>Selected:</strong> {selectedFile.name} ({(selectedFile.size / 1024).toFixed(2)} KB)
              </p>
            </div>
          )}
        </div>

        <button
          onClick={handleSubmit}
          disabled={!selectedFile}
          className={`submit-button ${selectedFile ? 'enabled' : 'disabled'}`}
        >
          <Upload className="w-5 h-5" />
          Submit Assignment
        </button>

        {isSubmitted && (
          <div className="success-message">
            <CheckCircle className="w-6 h-6 success-icon" />
            <div className="success-content">
              <h4>Assignment Submitted Successfully!</h4>
              <p>Your assignment has been submitted and will be graded soon.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubmitAssignment;
