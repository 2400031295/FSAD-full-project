import express from 'express';
import cors from 'cors';
import fs from 'fs/promises';
import fsSync from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_PATH = path.join(__dirname, 'db.json');
const PORT = parseInt(process.env.PORT, 10) || 4000;

// Initialize database if it doesn't exist
const initDb = async () => {
  try {
    if (!fsSync.existsSync(DB_PATH)) {
      console.log('Creating new database file...');
      const initialData = {
        users: [],
        assignments: [],
        submissions: []
      };
      await fs.writeFile(DB_PATH, JSON.stringify(initialData, null, 2), 'utf8');
      console.log('Database initialized at:', DB_PATH);
    }
  } catch (error) {
    console.error('Failed to initialize database:', error.message);
    throw error;
  }
};

const loadDb = async () => {
  try {
    const raw = await fs.readFile(DB_PATH, 'utf8');
    return JSON.parse(raw);
  } catch (error) {
    console.error('Error loading database:', error.message);
    return { users: [], assignments: [], submissions: [] };
  }
};

const saveDb = async (db) => {
  await fs.writeFile(DB_PATH, JSON.stringify(db, null, 2), 'utf8');
};

const getNextId = (items) => {
  if (!Array.isArray(items) || items.length === 0) return 1;
  return Math.max(...items.map((item) => item.id || 0)) + 1;
};

const app = express();
app.use(cors());
app.use(express.json());

// Ensure database exists
fs.mkdir(path.dirname(DB_PATH), { recursive: true }).catch(console.error);

app.get('/api/status', (_req, res) => {
  res.json({ status: 'ok', message: 'Backend is running' });
});

app.get('/api/assignments', async (_req, res) => {
  const db = await loadDb();
  res.json(db.assignments);
});

app.get('/api/assignments/:id', async (req, res) => {
  const db = await loadDb();
  const assignment = db.assignments.find((a) => a.id === parseInt(req.params.id, 10));
  if (!assignment) return res.status(404).json({ error: 'Assignment not found' });
  res.json(assignment);
});

app.post('/api/assignments', async (req, res) => {
  const db = await loadDb();
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
  await saveDb(db);
  res.status(201).json(assignment);
});

app.get('/api/submissions', async (_req, res) => {
  const db = await loadDb();
  res.json(db.submissions);
});

app.get('/api/submissions/:id', async (req, res) => {
  const db = await loadDb();
  const submission = db.submissions.find((s) => s.id === parseInt(req.params.id, 10));
  if (!submission) return res.status(404).json({ error: 'Submission not found' });
  res.json(submission);
});

app.get('/api/submissions/assignment/:assignmentId', async (req, res) => {
  const db = await loadDb();
  const submissions = db.submissions.filter(
    (submission) => submission.assignmentId === parseInt(req.params.assignmentId, 10)
  );
  res.json(submissions);
});

app.post('/api/submissions', async (req, res) => {
  const db = await loadDb();
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
  await saveDb(db);
  res.status(201).json(submission);
});

app.put('/api/submissions/:id/grade', async (req, res) => {
  const db = await loadDb();
  const submission = db.submissions.find((s) => s.id === parseInt(req.params.id, 10));
  if (!submission) return res.status(404).json({ error: 'Submission not found' });

  submission.marks = req.body.marks ?? submission.marks;
  submission.grade = req.body.grade || submission.grade;
  submission.feedback = req.body.feedback || submission.feedback;
  submission.status = req.body.status || submission.status;

  await saveDb(db);
  res.json(submission);
});

app.listen(PORT, () => {
  console.log(`✓ Backend listening on port ${PORT}`);
  console.log(`✓ Database path: ${DB_PATH}`);
});

process.on('uncaughtException', (err) => {
  console.error('✗ Uncaught Exception:', err.message);
  process.exit(1);
});

process.on('unhandledRejection', (reason) => {
  console.error('✗ Unhandled Rejection:', reason);
  process.exit(1);
});
