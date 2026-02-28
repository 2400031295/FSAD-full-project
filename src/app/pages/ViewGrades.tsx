import { Link } from "react-router";
import { ArrowLeft, Award, TrendingUp, Calendar } from "lucide-react";
import '../styles/GradesProfile.css';
import '../styles/Common.css';

export function ViewGrades() {
  const grades = [
    { 
      id: 1, 
      assignment: "Data Structures - Assignment 1", 
      course: "CS101", 
      grade: "A", 
      marks: 95, 
      totalMarks: 100,
      submittedDate: "2026-01-15",
      gradedDate: "2026-01-20",
      feedback: "Excellent work! Your implementation of the binary search tree was well-structured and efficient."
    },
    { 
      id: 2, 
      assignment: "Web Development Project", 
      course: "CS202", 
      grade: "A-", 
      marks: 88, 
      totalMarks: 100,
      submittedDate: "2026-02-05",
      gradedDate: "2026-02-10",
      feedback: "Great design and functionality. Consider improving the responsive layout for mobile devices."
    },
    { 
      id: 3, 
      assignment: "Machine Learning Lab Report", 
      course: "CS303", 
      grade: "B+", 
      marks: 82, 
      totalMarks: 100,
      submittedDate: "2026-01-28",
      gradedDate: "2026-02-03",
      feedback: "Good analysis of the model. More detailed discussion of the results would improve the report."
    },
    { 
      id: 4, 
      assignment: "Database Design Assignment", 
      course: "CS150", 
      grade: "A", 
      marks: 92, 
      totalMarks: 100,
      submittedDate: "2026-02-12",
      gradedDate: "2026-02-18",
      feedback: "Well-designed schema with proper normalization. Good use of indexes for optimization."
    },
  ];

  const calculateGPA = () => {
    const gradePoints: { [key: string]: number } = {
      'A': 4.0, 'A-': 3.7, 'B+': 3.3, 'B': 3.0, 'B-': 2.7, 'C+': 2.3, 'C': 2.0
    };
    const total = grades.reduce((sum, g) => sum + (gradePoints[g.grade] || 0), 0);
    return (total / grades.length).toFixed(2);
  };

  const getGradeColor = (grade: string) => {
    if (grade.startsWith('A')) return '#10B981';
    if (grade.startsWith('B')) return '#22D3EE';
    if (grade.startsWith('C')) return '#F59E0B';
    return '#EF4444';
  };

  return (
    <div className="grades-container">
      <Link to="/student/dashboard" className="back-button">
        <ArrowLeft className="w-5 h-5" />
        Back to Dashboard
      </Link>

      <div className="grades-content">
        <div className="page-header">
          <h1 className="page-title">My Grades</h1>
          <p className="page-description">
            View all your assignment grades and feedback
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid-3">
          <div className="stat-card">
            <div className="stat-card-header">
              <div className="stat-card-icon" style={{ background: 'linear-gradient(135deg, #6D28D9, #8B5CF6)' }}>
                <Award className="w-6 h-6" />
              </div>
              <span className="stat-card-value">{calculateGPA()}</span>
            </div>
            <p className="stat-card-label">Current GPA</p>
          </div>

          <div className="stat-card">
            <div className="stat-card-header">
              <div className="stat-card-icon" style={{ background: 'linear-gradient(135deg, #10B981, #22D3EE)' }}>
                <TrendingUp className="w-6 h-6" />
              </div>
              <span className="stat-card-value">
                {Math.round(grades.reduce((sum, g) => sum + (g.marks / g.totalMarks * 100), 0) / grades.length)}%
              </span>
            </div>
            <p className="stat-card-label">Average Score</p>
          </div>

          <div className="stat-card">
            <div className="stat-card-header">
              <div className="stat-card-icon" style={{ background: 'linear-gradient(135deg, #F59E0B, #EC4899)' }}>
                <Calendar className="w-6 h-6" />
              </div>
              <span className="stat-card-value">{grades.length}</span>
            </div>
            <p className="stat-card-label">Graded Assignments</p>
          </div>
        </div>

        {/* Grades List */}
        <div className="grades-list">
          {grades.map((grade) => (
            <div key={grade.id} className="grade-card">
              <div className="grade-card-header">
                <div className="grade-card-info">
                  <h3 className="grade-card-title">{grade.assignment}</h3>
                  <p className="grade-card-course">{grade.course}</p>
                </div>
                <div className="grade-card-score">
                  <div 
                    className="grade-badge" 
                    style={{ 
                      background: `${getGradeColor(grade.grade)}20`,
                      color: getGradeColor(grade.grade)
                    }}
                  >
                    {grade.grade}
                  </div>
                  <p className="grade-marks">{grade.marks} / {grade.totalMarks}</p>
                </div>
              </div>

              <div className="grade-dates">
                <div className="grade-date-item">
                  <p>Submitted</p>
                  <p>{grade.submittedDate}</p>
                </div>
                <div className="grade-date-item">
                  <p>Graded</p>
                  <p>{grade.gradedDate}</p>
                </div>
              </div>

              <div>
                <p className="grade-feedback-title">Faculty Feedback</p>
                <p className="grade-feedback-text">{grade.feedback}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
