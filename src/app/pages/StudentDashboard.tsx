import { Link } from "react-router";
import { 
  LayoutDashboard, 
  Upload, 
  GraduationCap, 
  User, 
  LogOut,
  Clock,
  FileText,
  CheckCircle
} from "lucide-react";
import '../styles/Dashboard.css';

export function StudentDashboard() {
  const assignments = [
    { id: 1, title: "Data Structures - Assignment 3", course: "CS101", dueDate: "2026-03-01", status: "pending", submitted: false },
    { id: 2, title: "Web Development Project", course: "CS202", dueDate: "2026-03-05", status: "submitted", submitted: true },
    { id: 3, title: "Machine Learning Lab Report", course: "CS303", dueDate: "2026-02-28", status: "graded", grade: "A", submitted: true },
    { id: 4, title: "Database Design Assignment", course: "CS150", dueDate: "2026-03-10", status: "pending", submitted: false },
  ];

  const stats = [
    { label: "Total Assignments", value: "12", icon: <FileText className="w-6 h-6" />, gradient: "linear-gradient(135deg, #6D28D9, #8B5CF6)" },
    { label: "Completed", value: "8", icon: <CheckCircle className="w-6 h-6" />, gradient: "linear-gradient(135deg, #10B981, #22D3EE)" },
    { label: "Pending", value: "4", icon: <Clock className="w-6 h-6" />, gradient: "linear-gradient(135deg, #F59E0B, #EC4899)" },
  ];

  const menuItems = [
    { icon: <LayoutDashboard className="w-5 h-5" />, label: "Dashboard", active: true, link: "/student/dashboard" },
    { icon: <Upload className="w-5 h-5" />, label: "Submit Assignment", link: "/student/submit" },
    { icon: <GraduationCap className="w-5 h-5" />, label: "View Grades", link: "/student/grades" },
    { icon: <User className="w-5 h-5" />, label: "Profile", link: "/student/profile" },
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

          <Link to="/" className="sidebar-logout">
            <LogOut className="w-5 h-5" />
            Logout
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="dashboard-main">
        {/* Header */}
        <div className="dashboard-header">
          <h1 className="dashboard-title">Welcome back, Emily!</h1>
          <p className="dashboard-subtitle">
            Here's what's happening with your assignments today.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="stats-grid">
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

        {/* Assignments Table */}
        <div className="assignments-container">
          <h2 className="assignments-title">Recent Assignments</h2>

          <div className="assignments-table">
            <table>
              <thead>
                <tr>
                  <th>Assignment</th>
                  <th>Course</th>
                  <th>Due Date</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {assignments.map((assignment) => (
                  <tr key={assignment.id}>
                    <td>{assignment.title}</td>
                    <td>{assignment.course}</td>
                    <td>{assignment.dueDate}</td>
                    <td>
                      <span className={`assignment-status ${assignment.status}`}>
                        {assignment.status === 'graded' ? `Graded: ${assignment.grade}` : 
                         assignment.status === 'submitted' ? 'Submitted' : 
                         'Pending'}
                      </span>
                    </td>
                    <td>
                      {!assignment.submitted && (
                        <Link to="/student/submit" className="assignment-submit-btn">
                          Submit
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
