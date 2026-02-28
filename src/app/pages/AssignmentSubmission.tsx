import { useState } from "react";
import { Link } from "react-router";
import { ArrowLeft, Upload, CheckCircle } from "lucide-react";
import '../styles/Submission.css';
import '../styles/Common.css';

export function AssignmentSubmission() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleSubmit = () => {
    if (selectedFile) {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setSelectedFile(null);
      }, 3000);
    }
  };

  return (
    <div className="submission-container">
      {/* Back Button */}
      <Link to="/student/dashboard" className="back-button">
        <ArrowLeft className="w-5 h-5" />
        Back to Dashboard
      </Link>

      {/* Main Content */}
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
              <p className="detail-item-value">CS101 - Data Structures</p>
            </div>
            <div>
              <p className="detail-item-label">Due Date</p>
              <p className="detail-item-value">March 1, 2026</p>
            </div>
            <div>
              <p className="detail-item-label">Assignment</p>
              <p className="detail-item-value">Assignment 3</p>
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

          {/* Drag & Drop Area */}
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

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={!selectedFile}
          className={`submit-button ${selectedFile ? 'enabled' : 'disabled'}`}
        >
          <Upload className="w-5 h-5" />
          Submit Assignment
        </button>

        {/* Success Message */}
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
}
