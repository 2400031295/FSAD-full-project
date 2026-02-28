// Format date to readable string
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
};

// Calculate days remaining until due date
export const getDaysRemaining = (dueDate) => {
  const today = new Date();
  const due = new Date(dueDate);
  const diffTime = due - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays < 0) return 'Overdue';
  if (diffDays === 0) return 'Due today';
  if (diffDays === 1) return '1 day left';
  return `${diffDays} days left`;
};

// Get grade color based on grade value
export const getGradeColor = (grade) => {
  if (!grade) return '#94A3B8';
  if (grade.startsWith('A')) return '#10B981';
  if (grade.startsWith('B')) return '#22D3EE';
  if (grade.startsWith('C')) return '#F59E0B';
  return '#EF4444';
};

// Calculate GPA from grades
export const calculateGPA = (grades) => {
  const gradePoints = {
    'A': 4.0, 'A-': 3.7, 
    'B+': 3.3, 'B': 3.0, 'B-': 2.7,
    'C+': 2.3, 'C': 2.0, 'C-': 1.7,
    'D': 1.0, 'F': 0.0
  };
  
  if (grades.length === 0) return '0.00';
  
  const total = grades.reduce((sum, g) => sum + (gradePoints[g] || 0), 0);
  return (total / grades.length).toFixed(2);
};

// Validate email format
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Get file extension
export const getFileExtension = (filename) => {
  return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2);
};

// Format file size
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
};

// Get status badge class
export const getStatusClass = (status) => {
  const statusMap = {
    'graded': 'graded',
    'submitted': 'submitted',
    'pending': 'pending',
    'overdue': 'overdue'
  };
  return statusMap[status?.toLowerCase()] || 'pending';
};

// Generate random ID
export const generateId = () => {
  return Date.now() + Math.random().toString(36).substr(2, 9);
};

// Truncate text
export const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return text.substr(0, maxLength) + '...';
};

// Get greeting based on time
export const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
};

// Sort assignments by due date
export const sortByDueDate = (assignments) => {
  return [...assignments].sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
};

// Filter assignments by status
export const filterByStatus = (assignments, status) => {
  return assignments.filter(a => a.status === status);
};

// Calculate average score
export const calculateAverage = (scores) => {
  if (scores.length === 0) return 0;
  const sum = scores.reduce((acc, score) => acc + score, 0);
  return Math.round(sum / scores.length);
};
