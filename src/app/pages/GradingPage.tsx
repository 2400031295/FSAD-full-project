import { useState } from "react";
import { Link, useParams } from "react-router";
import { ArrowLeft, User, FileText, CheckCircle } from "lucide-react";
import '../styles/Faculty.css';
import '../styles/Common.css';

export function GradingPage() {
  const { submissionId } = useParams();
  const [marks, setMarks] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = () => {
    if (marks && feedback) {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
    }
  };

  const studentData = {
    name: "Emily Johnson",
    studentId: "STU2024001",
    course: "CS101 - Data Structures",
    assignment: "Assignment 3",
    submittedDate: "February 20, 2026",
    fileName: "assignment3_emily.pdf"
  };

  return (
    <div className="page-container">
      <Link to="/faculty/dashboard" className="back-button">
        <ArrowLeft className="w-5 h-5" />
        Back to Dashboard
      </Link>

      <div className="page-content">
        <div className="page-header">
          <h1 className="page-title">Grade Assignment</h1>
          <p className="page-description">
            Review the submission and provide grades and feedback
          </p>
        </div>

        <div className="grading-grid">
          {/* Left Column */}
          <div>
            {/* Student Details */}
            <div className="glass-card student-info-section">
              <div className="card-header">
                <div className="card-icon gradient-primary">
                  <User className="w-6 h-6" />
                </div>
                <h3 className="card-title">Student Information</h3>
              </div>

              <div className="info-grid">
                <div className="info-item">
                  <p className="info-label">Student Name</p>
                  <p className="info-value">{studentData.name}</p>
                </div>
                <div className="info-item">
                  <p className="info-label">Student ID</p>
                  <p className="info-value">{studentData.studentId}</p>
                </div>
                <div className="info-item">
                  <p className="info-label">Course</p>
                  <p className="info-value">{studentData.course}</p>
                </div>
                <div className="info-item">
                  <p className="info-label">Assignment</p>
                  <p className="info-value">{studentData.assignment}</p>
                </div>
                <div className="info-item">
                  <p className="info-label">Submitted Date</p>
                  <p className="info-value">{studentData.submittedDate}</p>
                </div>
              </div>
            </div>

            {/* Grading Form */}
            <div className="grading-form-section">
              <h3 className="form-section-title">Grade Submission</h3>

              <div className="form-group">
                <label className="form-label">Marks (out of 100)</label>
                <input
                  type="number"
                  value={marks}
                  onChange={(e) => setMarks(e.target.value)}
                  placeholder="Enter marks"
                  min="0"
                  max="100"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Feedback</label>
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Provide detailed feedback to the student..."
                  rows={6}
                  className="form-textarea"
                />
              </div>

              <button
                onClick={handleSubmit}
                disabled={!marks || !feedback}
                className={`btn ${marks && feedback ? 'btn-primary' : ''} btn-full-width`}
              >
                <CheckCircle className="w-5 h-5" />
                Submit Grade
              </button>

              {isSubmitted && (
                <div className="alert alert-success">
                  <CheckCircle className="w-5 h-5" />
                  <p>Grade submitted successfully!</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column */}
          <div>
            <div className="preview-section">
              <div className="card-header">
                <div className="card-icon gradient-cyan">
                  <FileText className="w-6 h-6" />
                </div>
                <h3 className="card-title">Submission Preview</h3>
              </div>

              <div className="alert alert-info">
                <p><strong>File:</strong> {studentData.fileName}</p>
              </div>

              <div className="preview-area">
                <div className="preview-content">
                  <FileText className="preview-icon" />
                  <p className="preview-text">Document Preview</p>
                  <button className="download-button">
                    Download File
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
