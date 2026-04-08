import express from 'express';
import cors from 'cors';

const app = express();
const PORT = parseInt(process.env.PORT, 10) || 4000;

// In-memory database for Render (simpler than file-based)
let db = {
  users: [
    {
      id: 1,
      name: "Emily Johnson",
      email: "emily.johnson@university.edu",
      role: "student",
      studentId: "STU2024001",
      password: "student123"
    },
    {
      id: 2,
      name: "Dr. Sarah Williams",
      email: "sarah.williams@university.edu",
      role: "faculty",
      facultyId: "FAC2024001",
      password: "faculty123"
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
      createdBy: 2,
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
      createdBy: 2,
      createdDate: "2026-02-18"
    }
  ],
  submissions: []
};

const getNextId = (items) => {
  if (!Array.isArray(items) || items.length === 0) return 1;
  return Math.max(...items.map((item) => item.id || 0)) + 1;
};

app.use(cors());
app.use(express.json());

app.get('/api/status', (req, res) => {
  res.json({ status: 'ok', message: 'Backend is running' });
});

app.get('/api/assignments', (req, res) => {
  res.json(db.assignments);
});

app.get('/api/assignments/:id', (req, res) => {
  const assignment = db.assignments.find(a => a.id === parseInt(req.params.id, 10));
  if (!assignment) return res.status(404).json({ error: 'Assignment not found' });
  res.json(assignment);
});

app.post('/api/assignments', (req, res) => {
  const assignment = {
    id: getNextId(db.assignments),
    title: req.body.title || 'Untitled Assignment',
    course: req.body.course || '',
    courseTitle: req.body.courseTitle || '',
    description: req.body.description || '',
    dueDate: req.body.dueDate || '',
    totalMarks: req.body.totalMarks || 100,
    createdBy: req.body.createdBy || null,
    createdDate: new Date().toISOString().split('T')[0],
  };

  db.assignments.push(assignment);
  res.status(201).json(assignment);
});

app.get('/api/submissions', (req, res) => {
  res.json(db.submissions);
});

app.post('/api/submissions', (req, res) => {
  const submission = {
    id: getNextId(db.submissions),
    assignmentId: parseInt(req.body.assignmentId, 10) || null,
    studentId: parseInt(req.body.studentId, 10) || null,
    studentName: req.body.studentName || 'Unknown Student',
    fileName: req.body.fileName || 'uploaded-file',
    fileSize: req.body.fileSize || 0,
    submittedDate: req.body.submittedDate || new Date().toISOString().split('T')[0],
    status: 'pending',
    marks: null,
    grade: null,
    feedback: null,
  };

  db.submissions.push(submission);
  res.status(201).json(submission);
});

app.put('/api/submissions/:id/grade', (req, res) => {
  const submission = db.submissions.find((s) => s.id === parseInt(req.params.id, 10));
  if (!submission) return res.status(404).json({ error: 'Submission not found' });

  submission.marks = req.body.marks ?? submission.marks;
  submission.grade = req.body.grade || submission.grade;
  submission.feedback = req.body.feedback || submission.feedback;
  submission.status = req.body.status || submission.status;

  res.json(submission);
});

app.listen(PORT, () => {
  console.log(`✓ Backend listening on port ${PORT}`);
  console.log(`✓ Environment: ${process.env.NODE_ENV || 'development'}`);
});

process.on('uncaughtException', (err) => {
  console.error('✗ Uncaught Exception:', err.message);
  process.exit(1);
});

process.on('unhandledRejection', (reason) => {
  console.error('✗ Unhandled Rejection:', reason);
  process.exit(1);
});