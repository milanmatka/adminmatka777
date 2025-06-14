import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  
  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/auth/login" />;
  }
  
  return children;
};

export default ProtectedRoute;