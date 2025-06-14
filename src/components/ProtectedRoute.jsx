import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';

const ProtectedRoute = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  useEffect(() => {
    // Check authentication on client-side only
    const checkAuth = () => {
      const auth = localStorage.getItem('isAuthenticated') === 'true';
      setIsAuthenticated(auth);
      setIsLoading(false);
    };
    
    checkAuth();
  }, []);
  
  // Show loading while checking authentication
  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }
  
  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }
  
  // Render children if authenticated
  return children;
};

export default ProtectedRoute;


