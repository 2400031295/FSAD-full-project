export const mockData = {
  students: [
    {
      id: 1,
      name: "Emily Johnson",
      email: "emily.johnson@university.edu",
      studentId: "STU2024001",
      password: "student123",
      role: "student",
      department: "Computer Science",
      semester: "4th Semester",
      gpa: "3.85"
    }
  ],
  
  faculty: [
    {
      id: 1,
      name: "Dr. Sarah Williams",
      email: "sarah.williams@university.edu",
      facultyId: "FAC2024001",
      password: "faculty123",
      role: "faculty",
      department: "Computer Science"
    }
  ],

  assignments: [
    {
      id: 1,
      title: "Data Structures - Assignment 3",
      course: "CS101",
      courseTitle: "Data Structures",
      description: "Implement binary search tree with all operations",
      dueDate: "2026-03-01",
      totalMarks: 100,
      createdBy: 1,
      createdDate: "2026-02-15"
    },
    {
      id: 2,
      title: "Web Development Project",
      course: "CS202",
      courseTitle: "Web Development",
      description: "Create a responsive website using React",
      dueDate: "2026-03-05",
      totalMarks: 100,
      createdBy: 1,
      createdDate: "2026-02-18"
    },
    {
      id: 3,
      title: "Machine Learning Lab Report",
      course: "CS303",
      courseTitle: "Machine Learning",
      description: "Analyze the performance of different ML models",
      dueDate: "2026-02-28",
      totalMarks: 100,
      createdBy: 1,
      createdDate: "2026-02-10"
    },
    {
      id: 4,
      title: "Database Design Assignment",
      course: "CS150",
      courseTitle: "Database Systems",
      description: "Design a normalized database schema",
      dueDate: "2026-03-10",
      totalMarks: 100,
      createdBy: 1,
      createdDate: "2026-02-20"
    }
  ],

  submissions: [
    {
      id: 1,
      assignmentId: 2,
      studentId: 1,
      studentName: "Emily Johnson",
      fileName: "web_project_emily.zip",
      submittedDate: "2026-02-22",
      status: "graded",
      marks: 88,
      grade: "A-",
      feedback: "Great design and functionality. Consider improving the responsive layout for mobile devices."
    },
    {
      id: 2,
      assignmentId: 3,
      studentId: 1,
      studentName: "Emily Johnson",
      fileName: "ml_report_emily.pdf",
      submittedDate: "2026-01-28",
      status: "graded",
      marks: 82,
      grade: "B+",
      feedback: "Good analysis of the model. More detailed discussion of the results would improve the report."
    },
    {
      id: 3,
      assignmentId: 1,
      studentId: 2,
      studentName: "Jane Smith",
      fileName: "assignment3_jane.cpp",
      submittedDate: "2026-02-20",
      status: "pending",
      marks: null,
      grade: null,
      feedback: null
    },
    {
      id: 4,
      assignmentId: 1,
      studentId: 3,
      studentName: "Mike Johnson",
      fileName: "bst_implementation.cpp",
      submittedDate: "2026-02-19",
      status: "pending",
      marks: null,
      grade: null,
      feedback: null
    },
    {
      id: 5,
      assignmentId: 2,
      studentId: 4,
      studentName: "Sarah Williams",
      fileName: "react_project.zip",
      submittedDate: "2026-02-21",
      status: "pending",
      marks: null,
      grade: null,
      feedback: null
    }
  ],

  courses: [
    { code: "CS101", name: "Data Structures", credits: 4 },
    { code: "CS202", name: "Web Development", credits: 3 },
    { code: "CS303", name: "Machine Learning", credits: 4 },
    { code: "CS150", name: "Database Systems", credits: 3 }
  ]
};

// Helper functions to work with mock data
export const getAssignmentById = (id) => {
  return mockData.assignments.find(a => a.id === parseInt(id));
};

export const getSubmissionsByAssignment = (assignmentId) => {
  return mockData.submissions.filter(s => s.assignmentId === parseInt(assignmentId));
};

export const getSubmissionsByStudent = (studentId) => {
  return mockData.submissions.filter(s => s.studentId === parseInt(studentId));
};

export const getStudentAssignments = (studentId) => {
  return mockData.assignments.map(assignment => {
    const submission = mockData.submissions.find(
      s => s.assignmentId === assignment.id && s.studentId === studentId
    );
    return {
      ...assignment,
      submission
    };
  });
};
