import { Link } from 'react-router-dom';
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
//use navigate
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;

    if (username === 'matkaadmin777' && password === 'matkaadmin777') {
      alert('Login successful');
      // Redirect to dashboard or perform any other action
      navigate('/dashboard');

    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 10, p: 3, boxShadow: 3, borderRadius: 2 }}>
      <Typography variant="h5" fontWeight={600} mb={3}>
        Login
      </Typography>
      <form onSubmit={handleLogin} noValidate>
        <Stack spacing={3}>
          <Box>
            <Typography
              variant="subtitle1"
              fontWeight={600}
              component="label"
              htmlFor="username"
              mb="5px"
              display="block"
            >
              Username
            </Typography>
            <TextField id="username" name="username" variant="outlined" fullWidth />
          </Box>
          <Box>
            <Typography
              variant="subtitle1"
              fontWeight={600}
              component="label"
              htmlFor="password"
              mb="5px"
              display="block"
            >
              Password
            </Typography>
            <TextField id="password" name="password" type="password" variant="outlined" fullWidth />
          </Box>
          <Stack justifyContent="space-between" direction="row" alignItems="center">
            <FormGroup>
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="Remember this device"
              />
            </FormGroup>
            {/* <Typography
              component={Link}
              to="/forgot-password"
              fontWeight="500"
              sx={{
                textDecoration: 'none',
                color: 'primary.main',
              }}
            >
              Forgot Password?
            </Typography> */}
          </Stack>
          <Button
            color="primary"
            variant="contained"
            size="large"
            fullWidth
            type="submit"
          >
            Sign In
          </Button>
        </Stack>
      </form>
    </Box>
  );
}

export default Login;
