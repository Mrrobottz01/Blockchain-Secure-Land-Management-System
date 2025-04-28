import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useEffect, useState } from 'react';
import './App.css';

// Import pages
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Landing from './pages/Landing';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import authService from './services/authService';
import Profile from './pages/Profile';

// Import Bootstrap JavaScript for navbar and dropdown functionality
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// Create PageNotFound component
const PageNotFound = () => (
  <div className="container text-center py-5">
    <div className="mb-4">
      <svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" fill="currentColor" className="bi bi-exclamation-circle text-danger" viewBox="0 0 16 16">
        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
        <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"/>
      </svg>
    </div>
    <h1 className="display-1 fw-bold">404</h1>
    <h2 className="mb-4">Page Not Found</h2>
    <p className="lead mb-4">We couldn't find the page you're looking for.</p>
    <a href="/" className="btn btn-primary px-4 py-2">
      Return to Homepage
    </a>
  </div>
);

function App() {
  const [isLoading, setIsLoading] = useState(true);
  
  // Add a brief loading state to ensure everything loads properly
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
        <div className="text-center">
          <div className="spinner-border text-primary" style={{ width: '3rem', height: '3rem' }} role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <h5 className="mt-3">Loading Land Registry System...</h5>
        </div>
      </div>
    );
  }
  
  return (
    <>
      <ToastContainer 
        position="top-right" 
        autoClose={3000} 
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      
      <Routes>
        {/* Public landing page */}
        <Route path="/" element={
          authService.isAuthenticated() ? 
            <Navigate to="/dashboard" replace /> : 
            <Landing />
        } />
        
        {/* Public routes - no navbar */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify" element={<div className="container py-4"><h2>Certificate Verification</h2><p>This public verification tool is under construction.</p></div>} />
        
        {/* Protected routes with standard layout */}
        <Route element={<Layout />}>
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/land-parcels" element={<div className="container py-4"><h2>Land Parcels</h2><p>This page is under construction.</p></div>} />
            <Route path="/transactions" element={<div className="container py-4"><h2>Transactions</h2><p>This page is under construction.</p></div>} />
            <Route path="/documents" element={<div className="container py-4"><h2>Documents</h2><p>This page is under construction.</p></div>} />
          </Route>
        </Route>
        
        {/* Admin routes with standard layout */}
        <Route element={<Layout />}>
          <Route element={<ProtectedRoute allowedRoles={['ADMIN']} />}>
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/users" element={<div className="container py-4"><h2>User Management</h2><p>This page is under construction.</p></div>} />
            <Route path="/admin/settings" element={<div className="container py-4"><h2>System Settings</h2><p>This page is under construction.</p></div>} />
          </Route>
        </Route>
        
        {/* Catch all - 404 */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App
