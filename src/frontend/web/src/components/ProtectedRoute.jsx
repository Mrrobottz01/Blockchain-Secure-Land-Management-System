import { Navigate, Outlet } from 'react-router-dom';
import authService from '../services/authService';

// Component to protect routes that require authentication
const ProtectedRoute = ({ allowedRoles }) => {
  const currentUser = authService.getCurrentUser();
  const isAuthenticated = authService.isAuthenticated();
  
  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  // If role restrictions are specified, check user role
  if (allowedRoles && !allowedRoles.includes(currentUser?.user_type)) {
    return <Navigate to="/unauthorized" replace />;
  }
  
  // Allow access to the child routes
  return <Outlet />;
};

export default ProtectedRoute;
