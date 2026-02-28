import React from 'react';
import { Link } from 'react-router-dom';
import { 
  GraduationCap, 
  FileCheck, 
  Clock, 
  Users,
  CheckCircle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { mockData } from '../data/mockData';
import Navbar from '../components/Navbar';
import '../styles/Faculty.css';
import '../styles/Dashboard.css';

const FacultyDashboard = () => {
  const { user } = useAuth();
  const submissions = mockData.submissions;
  const assignments = mockData.assignments;

  const stats = {
    totalAssignments: assignments.length,
    totalSubmissions: submissions.length,
    pending: submissions.filter(s => s.status === 'pending').length,
    graded: submissions.filter(s => s.status === 'graded').length
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0F172A', fontFamily: "'Inter', sans-serif" }}>
      <Navbar title="Faculty Portal" />

      <div className="faculty-content">
        <div className="faculty-header">
          <h1 className="faculty-title">Welcome, {user?.name || 'Faculty'}!</h1>
          <p className="faculty-subtitle">Review and grade student submissions</p>
        </div>

        {/* Stats Cards */}
        <div className="stats-grid-4">
          <div className="stat-card">
            <div className="stat-card-header">
              <div className="stat-card-icon" style={{ background: 'linear-gradient(135deg, #6D28D9, #8B5CF6)' }}>
                <FileCheck className="w-6 h-6" />
              </div>
              <span className="stat-card-value">{stats.totalAssignments}</span>
            </div>
            <p className="stat-card-label">Total Assignments</p>
          </div>

          <div className="stat-card">
            <div className="stat-card-header">
              <div className="stat-card-icon" style={{ background: 'linear-gradient(135deg, #22D3EE, #8B5CF6)' }}>
                <Users className="w-6 h-6" />
              </div>
              <span className="stat-card-value">{stats.totalSubmissions}</span>
            </div>
            <p className="stat-card-label">Total Submissions</p>
          </div>

          <div className="stat-card">
            <div className="stat-card-header">
              <div className="stat-card-icon" style={{ background: 'linear-gradient(135deg, #F59E0B, #EC4899)' }}>
                <Clock className="w-6 h-6" />
              </div>
              <span className="stat-card-value">{stats.pending}</span>
            </div>
            <p className="stat-card-label">Pending Reviews</p>
          </div>

          <div className="stat-card">
            <div className="stat-card-header">
              <div className="stat-card-icon" style={{ background: 'linear-gradient(135deg, #10B981, #22D3EE)' }}>
                <CheckCircle className="w-6 h-6" />
              </div>
              <span className="stat-card-value">{stats.graded}</span>
            </div>
            <p className="stat-card-label">Graded</p>
          </div>
        </div>

        {/* Actions */}
        <div style={{ marginBottom: '32px' }}>
          <Link to="/upload-assignment" className="btn btn-primary">
            <FileCheck className="w-5 h-5" />
            Create New Assignment
          </Link>
        </div>

        {/* Submissions Table */}
        <div className="submissions-container">
          <h2 className="submissions-title">Recent Submissions</h2>

          <div className="assignments-table">
            <table>
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>Assignment</th>
                  <th>Course</th>
                  <th>Submitted Date</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {submissions.map((submission) => {
                  const assignment = assignments.find(a => a.id === submission.assignmentId);
                  return (
                    <tr key={submission.id}>
                      <td style={{ fontWeight: '500' }}>{submission.studentName}</td>
                      <td>{assignment?.title}</td>
                      <td>{assignment?.course}</td>
                      <td>{submission.submittedDate}</td>
                      <td>
                        <span className={`assignment-status ${submission.status}`}>
                          {submission.status === 'graded' ? 'Graded' : 'Pending'}
                        </span>
                      </td>
                      <td>
                        {submission.status === 'pending' && (
                          <Link to={`/view-submissions/${submission.id}`} className="grade-button">
                            Grade
                          </Link>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacultyDashboard;
