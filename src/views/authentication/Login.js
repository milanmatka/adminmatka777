import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  TextField,
  Alert
} from '@mui/material';

function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  
  const handleLogin = (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;

    if (username === 'matkaadmin777' && password === 'matkaadmin777') {
      // Store authentication state in localStorage
      localStorage.setItem('isAuthenticated', 'true');
      
      // Use window.location for a full page refresh to ensure proper loading
      window.location.href = '/dashboard';
    } else {
      setError('Invalid credentials');
    }
  };
  
  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', p: 3 }}>
      <Typography variant="h4" mb={3}>Login</Typography>
      
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
          sx={{ mt: 3 }}
        >
          Login
        </Button>
      </form>
    </Box>
  );
}

export default Login;
