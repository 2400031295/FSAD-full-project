import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock } from 'lucide-react';
import { formatDate, getDaysRemaining, getStatusClass } from '../utils/helpers';
import '../styles/AssignmentCard.css';

const AssignmentCard = ({ assignment, onSubmit, showSubmitButton = false }) => {
  const { id, title, course, courseTitle, dueDate, totalMarks, submission } = assignment;
  
  const status = submission ? submission.status : 'pending';
  const daysRemaining = getDaysRemaining(dueDate);

  return (
    <div className="assignment-card">
      <div className="assignment-card-header">
        <div className="assignment-card-info">
          <h3 className="assignment-card-title">{title}</h3>
          <p className="assignment-card-course">{course} - {courseTitle}</p>
        </div>
        <span className={`assignment-card-status ${getStatusClass(status)}`}>
          {status === 'graded' && submission ? `${submission.grade}` : status}
        </span>
      </div>

      <div className="assignment-card-details">
        <div className="assignment-detail-item">
          <Calendar className="w-4 h-4" style={{ color: '#8B5CF6' }} />
          <span className="detail-label">Due Date:</span>
          <span className="detail-value">{formatDate(dueDate)}</span>
        </div>
        <div className="assignment-detail-item">
          <Clock className="w-4 h-4" style={{ color: '#22D3EE' }} />
          <span className="detail-label">Time Left:</span>
          <span className="detail-value">{daysRemaining}</span>
        </div>
      </div>

      <div className="assignment-card-footer">
        <span className="assignment-marks">Total Marks: {totalMarks}</span>
        {showSubmitButton && !submission && (
          <Link to={`/submit-assignment/${id}`} className="submit-link-btn">
            Submit
          </Link>
        )}
        {submission && submission.status === 'graded' && (
          <span className="graded-marks">
            Score: {submission.marks}/{totalMarks}
          </span>
        )}
      </div>
    </div>
  );
};

export default AssignmentCard;
