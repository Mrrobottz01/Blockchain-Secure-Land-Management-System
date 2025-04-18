import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// Import components
import LoginForm from './components/auth/LoginForm';
import RegistrationForm from './components/auth/RegistrationForm';
import Dashboard from './components/dashboard/Dashboard';
import LandRegistryInterface from './components/land-registry/LandRegistryInterface';
import DocumentManagement from './components/documents/DocumentManagement';
import AdminDashboard from './components/admin/AdminDashboard';
import VerifyCertificate from './components/certificates/VerifyCertificate';
import Profile from './components/profile/Profile';
import { AuthProvider, useAuth } from './context/AuthContext';

const ProtectedRoute = ({ children, adminOnly }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  if (adminOnly && user.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
};

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="App">
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={
              <div>
                <RegistrationForm />
              </div>
            } />
            
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/land-registry" element={
              <ProtectedRoute>
                <LandRegistryInterface />
              </ProtectedRoute>
            } />
            <Route path="/documents" element={
              <ProtectedRoute>
                <DocumentManagement />
              </ProtectedRoute>
            } />
            <Route path="/admin" element={
              <ProtectedRoute adminOnly={true}>
                <AdminDashboard view="dashboard" />
              </ProtectedRoute>
            } />
            <Route path="/admin/users" element={
              <ProtectedRoute adminOnly={true}>
                <AdminDashboard view="users" />
              </ProtectedRoute>
            } />
            <Route path="/admin/reports" element={
              <ProtectedRoute adminOnly={true}>
                <AdminDashboard view="reports" />
              </ProtectedRoute>
            } />
            <Route path="/admin/settings" element={
              <ProtectedRoute adminOnly={true}>
                <AdminDashboard view="settings" />
              </ProtectedRoute>
            } />
            <Route path="/verify-certificate" element={
              <ProtectedRoute>
                <VerifyCertificate />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
            
            {/* Default redirect */}
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
