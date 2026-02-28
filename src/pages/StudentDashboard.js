import React from 'react';
import { Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Upload, 
  GraduationCap, 
  User, 
  LogOut,
  Clock,
  FileText,
  CheckCircle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getStudentAssignments } from '../data/mockData';
import AssignmentCard from '../components/AssignmentCard';
import '../styles/Dashboard.css';

const StudentDashboard = () => {
  const { user, logout } = useAuth();
  const assignments = getStudentAssignments(user?.id || 1);

  const stats = {
    total: assignments.length,
    completed: assignments.filter(a => a.submission?.status === 'graded').length,
    pending: assignments.filter(a => !a.submission).length
  };

  const menuItems = [
    { icon: <LayoutDashboard className="w-5 h-5" />, label: "Dashboard", active: true, link: "/student-dashboard" },
    { icon: <Upload className="w-5 h-5" />, label: "Submit Assignment", link: "/submit-assignment" },
    { icon: <GraduationCap className="w-5 h-5" />, label: "View Grades", link: "/view-submissions" },
    { icon: <User className="w-5 h-5" />, label: "Profile", link: "/profile" },
  ];

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="dashboard-sidebar">
        <div className="sidebar-logo">
          <GraduationCap className="sidebar-logo-icon" />
          <span className="sidebar-logo-text">Student Portal</span>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item, idx) => (
            <Link
              key={idx}
              to={item.link}
              className={`sidebar-nav-item ${item.active ? 'active' : ''}`}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}

          <Link to="/" onClick={logout} className="sidebar-logout">
            <LogOut className="w-5 h-5" />
            Logout
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="dashboard-main">
        {/* Header */}
        <div className="dashboard-header">
          <h1 className="dashboard-title">Welcome back, {user?.name || 'Emily'}!</h1>
          <p className="dashboard-subtitle">
            Here's what's happening with your assignments today.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-card-header">
              <div className="stat-card-icon" style={{ background: 'linear-gradient(135deg, #6D28D9, #8B5CF6)' }}>
                <FileText className="w-6 h-6" />
              </div>
              <span className="stat-card-value">{stats.total}</span>
            </div>
            <p className="stat-card-label">Total Assignments</p>
          </div>

          <div className="stat-card">
            <div className="stat-card-header">
              <div className="stat-card-icon" style={{ background: 'linear-gradient(135deg, #10B981, #22D3EE)' }}>
                <CheckCircle className="w-6 h-6" />
              </div>
              <span className="stat-card-value">{stats.completed}</span>
            </div>
            <p className="stat-card-label">Completed</p>
          </div>

          <div className="stat-card">
            <div className="stat-card-header">
              <div className="stat-card-icon" style={{ background: 'linear-gradient(135deg, #F59E0B, #EC4899)' }}>
                <Clock className="w-6 h-6" />
              </div>
              <span className="stat-card-value">{stats.pending}</span>
            </div>
            <p className="stat-card-label">Pending</p>
          </div>
        </div>

        {/* Assignments Section */}
        <div className="assignments-container">
          <h2 className="assignments-title">My Assignments</h2>
          <div>
            {assignments.map((assignment) => (
              <AssignmentCard 
                key={assignment.id} 
                assignment={assignment} 
                showSubmitButton={true}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
