import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Grid,
  Snackbar,
  Alert,
  CircularProgress,
  MenuItem,
  FormControl,
  InputLabel,
  Select
} from '@mui/material';
import axios from 'axios';

const API_BASE_URL = 'https://mtka-api.onrender.com/api/galidesawar';

const Galidesaweresult = () => {
  const [gameId, setGameId] = useState('');
  const [leftNumber, setLeftNumber] = useState('');
  const [rightNumber, setRightNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [games, setGames] = useState([]);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  // Fetch all games on component mount
  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/all-games`);
      setGames(response.data.games || []);
    } catch (error) {
      console.error('Error fetching games:', error);
      showSnackbar('Failed to fetch games', 'error');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!gameId) {
      showSnackbar('Please select a game', 'error');
      return;
    }
    
    if (!leftNumber || !rightNumber) {
      showSnackbar('Both left and right numbers are required', 'error');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.put(
        `${API_BASE_URL}/set-result/${gameId}`,
        { left: leftNumber, right: rightNumber }
      );
      
      showSnackbar(response.data.message || 'Result uploaded successfully!', 'success');
      
      // Reset form
      setLeftNumber('');
      setRightNumber('');
      setGameId('');
      
    } catch (error) {
      console.error('Upload Result Error:', error);
      const errorMessage = error.response?.data?.message || 'Failed to upload result';
      showSnackbar(errorMessage, 'error');
    } finally {
      setLoading(false);
    }
  };

  const showSnackbar = (message, severity = 'info') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Galidesawer Result Upload
      </Typography>
      
      <Paper elevation={3} sx={{ p: 3, maxWidth: 600, margin: '0 auto' }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="game-select-label">Select Game</InputLabel>
                <Select
                  labelId="game-select-label"
                  value={gameId}
                  label="Select Game"
                  onChange={(e) => setGameId(e.target.value)}
                  required
                >
                  <MenuItem value="">
                    <em>Select a game</em>
                  </MenuItem>
                  {games.map((game) => (
                    <MenuItem key={game._id} value={game._id}>
                      {game.gameName} - {new Date(game.createdAt).toLocaleString()}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Left Number (0-9)"
                variant="outlined"
                type="number"
                value={leftNumber}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === '' || (value >= 0 && value <= 9)) {
                    setLeftNumber(value);
                  }
                }}
                inputProps={{ min: 0, max: 9, step: 1 }}
                required
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Right Number (0-9)"
                variant="outlined"
                type="number"
                value={rightNumber}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === '' || (value >= 0 && value <= 9)) {
                    setRightNumber(value);
                  }
                }}
                inputProps={{ min: 0, max: 9, step: 1 }}
                required
              />
            </Grid>
            
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                fullWidth
                disabled={loading}
                startIcon={loading ? <CircularProgress size={20} /> : null}
                sx={{ mt: 2 }}
              >
                {loading ? 'Uploading...' : 'Upload Result'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>


      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Galidesaweresult;