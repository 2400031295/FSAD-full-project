import { Link } from "react-router";
import { 
  GraduationCap, 
  FileCheck, 
  Clock, 
  Users,
  CheckCircle
} from "lucide-react";
import '../styles/Faculty.css';
import '../styles/Dashboard.css';

export function FacultyDashboard() {
  const submissions = [
    { id: 1, student: "Emily Johnson", assignment: "Data Structures - Assignment 3", course: "CS101", submittedDate: "2026-02-20", status: "pending" },
    { id: 2, student: "Jane Smith", assignment: "Web Development Project", course: "CS202", submittedDate: "2026-02-22", status: "graded" },
    { id: 3, student: "Mike Johnson", assignment: "Machine Learning Lab", course: "CS303", submittedDate: "2026-02-19", status: "pending" },
    { id: 4, student: "Sarah Williams", assignment: "Database Design Assignment", course: "CS150", submittedDate: "2026-02-21", status: "pending" },
    { id: 5, student: "Tom Brown", assignment: "Algorithm Analysis", course: "CS101", submittedDate: "2026-02-23", status: "graded" },
  ];

  const stats = [
    { 
      label: "Total Assignments", 
      value: "24", 
      icon: <FileCheck className="w-6 h-6" />, 
      gradient: "linear-gradient(135deg, #6D28D9, #8B5CF6)" 
    },
    { 
      label: "Total Submissions", 
      value: "89", 
      icon: <Users className="w-6 h-6" />, 
      gradient: "linear-gradient(135deg, #22D3EE, #8B5CF6)" 
    },
    { 
      label: "Pending Reviews", 
      value: "15", 
      icon: <Clock className="w-6 h-6" />, 
      gradient: "linear-gradient(135deg, #F59E0B, #EC4899)" 
    },
    { 
      label: "Graded", 
      value: "74", 
      icon: <CheckCircle className="w-6 h-6" />, 
      gradient: "linear-gradient(135deg, #10B981, #22D3EE)" 
    },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#0F172A', fontFamily: "'Inter', sans-serif" }}>
      {/* Navbar */}
      <nav className="faculty-navbar">
        <div className="faculty-logo">
          <GraduationCap className="faculty-logo-icon" />
          <span className="faculty-logo-text">Faculty Portal</span>
        </div>
        <Link to="/" className="faculty-logout">
          Logout
        </Link>
      </nav>

      {/* Main Content */}
      <div className="faculty-content">
        {/* Header */}
        <div className="faculty-header">
          <h1 className="faculty-title">Faculty Dashboard</h1>
          <p className="faculty-subtitle">Review and grade student submissions</p>
        </div>

        {/* Stats Cards */}
        <div className="stats-grid-4">
          {stats.map((stat, idx) => (
            <div key={idx} className="stat-card">
              <div className="stat-card-header">
                <div className="stat-card-icon" style={{ background: stat.gradient }}>
                  {stat.icon}
                </div>
                <span className="stat-card-value">{stat.value}</span>
              </div>
              <p className="stat-card-label">{stat.label}</p>
            </div>
          ))}
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
                {submissions.map((submission) => (
                  <tr key={submission.id}>
                    <td style={{ fontWeight: '500' }}>{submission.student}</td>
                    <td>{submission.assignment}</td>
                    <td>{submission.course}</td>
                    <td>{submission.submittedDate}</td>
                    <td>
                      <span className={`assignment-status ${submission.status}`}>
                        {submission.status === 'graded' ? 'Graded' : 'Pending'}
                      </span>
                    </td>
                    <td>
                      {submission.status === 'pending' && (
                        <Link to={`/faculty/grade/${submission.id}`} className="grade-button">
                          Grade
                        </Link>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
