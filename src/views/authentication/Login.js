import { Link, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Button,
  Stack,
  Checkbox,
  TextField
} from '@mui/material';

function Login() {
  const navigate = useNavigate();
  
  const handleLogin = (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;

    if (username === 'matkaadmin777' && password === 'matkaadmin777') {
      // Store authentication state in localStorage
      localStorage.setItem('isAuthenticated', 'true');
      alert('Login successful');
      // Use absolute path for navigation
      navigate('/dashboard');
    } else {
      alert('Invalid credentials');
    }
  };
  
  // Add form with onSubmit handler
  return (
    <Box>
      <form onSubmit={handleLogin}>
        {/* Your form fields */}
        <TextField id="username" name="username" label="Username" fullWidth margin="normal" />
        <TextField id="password" name="password" type="password" label="Password" fullWidth margin="normal" />
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          Login
        </Button>
      </form>
    </Box>
  );
}

export default Login;
