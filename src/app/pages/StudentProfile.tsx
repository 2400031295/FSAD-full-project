import { Link } from "react-router";
import { ArrowLeft, User, Mail, Phone, Calendar, BookOpen, Award, Edit } from "lucide-react";
import '../styles/GradesProfile.css';
import '../styles/Common.css';

export function StudentProfile() {
  const studentInfo = {
    name: "Emily Johnson",
    studentId: "STU2024001",
    email: "emily.johnson@university.edu",
    phone: "+1 (555) 123-4567",
    enrollmentDate: "September 2023",
    department: "Computer Science",
    semester: "4th Semester",
    gpa: "3.85",
    major: "B.Tech Computer Science & Engineering"
  };

  const courses = [
    { code: "CS101", name: "Data Structures", credits: 4, status: "In Progress" },
    { code: "CS202", name: "Web Development", credits: 3, status: "In Progress" },
    { code: "CS303", name: "Machine Learning", credits: 4, status: "In Progress" },
    { code: "CS150", name: "Database Systems", credits: 3, status: "In Progress" },
  ];

  return (
    <div className="profile-container">
      <Link to="/student/dashboard" className="back-button">
        <ArrowLeft className="w-5 h-5" />
        Back to Dashboard
      </Link>

      <div className="profile-content">
        <div className="page-header">
          <h1 className="page-title">My Profile</h1>
          <p className="page-description">
            Manage your personal information and academic details
          </p>
        </div>

        <div className="profile-grid">
          {/* Left Column - Profile Card */}
          <div className="profile-card">
            <div className="profile-avatar">
              <User />
            </div>

            <h2 className="profile-name">{studentInfo.name}</h2>
            <p className="profile-id">{studentInfo.studentId}</p>

            <button className="profile-edit-btn">
              <Edit className="w-4 h-4" />
              Edit Profile
            </button>

            <div className="profile-stats">
              <div className="profile-stat-row">
                <span className="profile-stat-label">GPA</span>
                <span className="profile-stat-value success">{studentInfo.gpa}</span>
              </div>
              <div className="profile-stat-row">
                <span className="profile-stat-label">Semester</span>
                <span className="profile-stat-value" style={{ color: '#F8FAFC' }}>
                  {studentInfo.semester}
                </span>
              </div>
              <div className="profile-stat-row">
                <span className="profile-stat-label">Department</span>
                <span className="profile-stat-value" style={{ color: '#F8FAFC' }}>CS</span>
              </div>
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="profile-details">
            {/* Personal Information */}
            <div className="glass-card">
              <div className="card-header">
                <div className="card-icon gradient-primary">
                  <User className="w-5 h-5" />
                </div>
                <h3 className="card-title">Personal Information</h3>
              </div>

              <div className="personal-info-grid">
                <div>
                  <div className="info-item-with-icon">
                    <Mail />
                    <p>Email Address</p>
                  </div>
                  <p className="info-value">{studentInfo.email}</p>
                </div>
                <div>
                  <div className="info-item-with-icon">
                    <Phone />
                    <p>Phone Number</p>
                  </div>
                  <p className="info-value">{studentInfo.phone}</p>
                </div>
                <div>
                  <div className="info-item-with-icon">
                    <Calendar />
                    <p>Enrollment Date</p>
                  </div>
                  <p className="info-value">{studentInfo.enrollmentDate}</p>
                </div>
                <div>
                  <div className="info-item-with-icon">
                    <BookOpen />
                    <p>Major</p>
                  </div>
                  <p className="info-value">{studentInfo.major}</p>
                </div>
              </div>
            </div>

            {/* Current Courses */}
            <div className="glass-card">
              <div className="card-header">
                <div className="card-icon gradient-cyan">
                  <BookOpen className="w-5 h-5" />
                </div>
                <h3 className="card-title">Current Courses</h3>
              </div>

              <div className="course-list">
                {courses.map((course, idx) => (
                  <div key={idx} className="course-item">
                    <div className="course-item-header">
                      <div>
                        <p className="course-item-title">{course.name}</p>
                        <p className="course-item-details">
                          {course.code} • {course.credits} Credits
                        </p>
                      </div>
                      <span className="course-status">{course.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Academic Performance */}
            <div className="glass-card">
              <div className="card-header">
                <div className="card-icon gradient-green">
                  <Award className="w-5 h-5" />
                </div>
                <h3 className="card-title">Academic Performance</h3>
              </div>

              <div className="performance-stats">
                <div className="performance-stat stat-green">
                  <p className="performance-stat-value">12</p>
                  <p className="performance-stat-label">Total Courses</p>
                </div>
                <div className="performance-stat stat-cyan">
                  <p className="performance-stat-value">48</p>
                  <p className="performance-stat-label">Total Credits</p>
                </div>
                <div className="performance-stat stat-purple">
                  <p className="performance-stat-value">92%</p>
                  <p className="performance-stat-label">Attendance</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
