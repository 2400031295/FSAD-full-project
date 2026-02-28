import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import StudentDashboard from './pages/StudentDashboard';
import FacultyDashboard from './pages/FacultyDashboard';
import UploadAssignment from './pages/UploadAssignment';
import SubmitAssignment from './pages/SubmitAssignment';
import ViewSubmissions from './pages/ViewSubmissions';

// Styles
import './index.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Student Routes */}
          <Route 
            path="/student-dashboard" 
            element={
              <ProtectedRoute requiredRole="student">
                <StudentDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/submit-assignment" 
            element={
              <ProtectedRoute requiredRole="student">
                <SubmitAssignment />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/submit-assignment/:id" 
            element={
              <ProtectedRoute requiredRole="student">
                <SubmitAssignment />
              </ProtectedRoute>
            } 
          />

          {/* Faculty Routes */}
          <Route 
            path="/faculty-dashboard" 
            element={
              <ProtectedRoute requiredRole="faculty">
                <FacultyDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/upload-assignment" 
            element={
              <ProtectedRoute requiredRole="faculty">
                <UploadAssignment />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/view-submissions/:id" 
            element={
              <ProtectedRoute requiredRole="faculty">
                <ViewSubmissions />
              </ProtectedRoute>
            } 
          />

          {/* Catch all */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
