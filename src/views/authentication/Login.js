import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  TextField,
  Alert,
  Paper
} from '@mui/material';

function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  
  // Check if already logged in
  useEffect(() => {
    const isAuth = localStorage.getItem('isAuthenticated') === 'true';
    if (isAuth) {
      navigate('/dashboard');
    }
  }, [navigate]);
  
  const handleLogin = (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;

    if (username === 'matkaadmin777' && password === 'matkaadmin777') {
      // Store authentication state
      localStorage.setItem('isAuthenticated', 'true');
      
      // Force a full page reload to ensure all components re-render
      window.location.href = '/dashboard';
    } else {
      setError('Invalid credentials');
    }
  };
  
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <Paper elevation={3} sx={{ p: 4, width: '100%', maxWidth: 400 }}>
        <Typography variant="h4" align="center" mb={3}>Admin Login</Typography>
        
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        
        <form onSubmit={handleLogin}>
          <TextField 
            id="username" 
            name="username" 
            label="Username" 
            fullWidth 
            margin="normal" 
            required
          />
          <TextField 
            id="password" 
            name="password" 
            type="password" 
            label="Password" 
            fullWidth 
            margin="normal" 
            required
          />
          <Button 
            type="submit" 
            variant="contained" 
            color="primary" 
            fullWidth 
            sx={{ mt: 3, py: 1.5 }}
          >
            Login
          </Button>
        </form>
      </Paper>
    </Box>
  );
}

export default Login;
