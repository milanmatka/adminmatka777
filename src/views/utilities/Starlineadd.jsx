import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  Grid,
  Alert,
  Snackbar,
  CircularProgress
} from '@mui/material';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import axios from 'axios';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

const API_URL = 'https://mtka-api.onrender.com/api/starline/game/create';

const Starlineadd = () => {
  const [formData, setFormData] = useState({
    gameName: '',
    openTime: '',
    closeTime: '',
    gameDate: null
  });
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });
  const [games, setGames] = useState([]);
  const [gamesLoading, setGamesLoading] = useState(true);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const res = await axios.get('https://mtka-api.onrender.com/api/starline/game/all');
        setGames(res.data.data || []);
      } catch (err) {
        setGames([]);
      } finally {
        setGamesLoading(false);
      }
    };
    fetchGames();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDateChange = (date, field) => {
    setFormData(prev => ({
      ...prev,
      [field]: date
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Format the date to match the required format
      const formattedData = {
        ...formData,
        gameDate: formData.gameDate ? formData.gameDate.toISOString() : null
      };

      const response = await axios.post(API_URL, formattedData);
      
      setSnackbar({
        open: true,
        message: response.data.message || 'Game created successfully!',
        severity: 'success'
      });

      // Reset form after successful submission
      setFormData({
        gameName: '',
        openTime: '',
        closeTime: '',
        gameDate: null
      });
    } catch (error) {
      console.error('Error creating game:', error);
      setSnackbar({
        open: true,
        message: error.response?.data?.message || 'Failed to create game. Please try again.',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  const handleDeleteGame = async (id) => {
    if (!window.confirm('Are you sure you want to delete this game?')) return;
    try {
      await axios.delete(`https://mtka-api.onrender.com/api/starline/game/${id}`);
      setGames((prev) => prev.filter((game) => game._id !== id));
      setSnackbar({
        open: true,
        message: 'Game deleted successfully!',
        severity: 'success'
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.response?.data?.message || 'Failed to delete game.',
        severity: 'error'
      });
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Add New Starline Game
        </Typography>
        
        <Paper elevation={3} sx={{ p: 4 }}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Game Name"
                  name="gameName"
                  value={formData.gameName}
                  onChange={handleChange}
                  required
                  variant="outlined"
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Open Time (HH:MM)"
                  name="openTime"
                  value={formData.openTime}
                  onChange={handleChange}
                  required
                  placeholder="e.g., 18:00"
                  variant="outlined"
                  inputProps={{
                    pattern: '^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$',
                    title: 'Please enter time in 24-hour format (HH:MM)'
                  }}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Close Time (HH:MM)"
                  name="closeTime"
                  value={formData.closeTime}
                  onChange={handleChange}
                  required
                  placeholder="e.g., 20:00"
                  variant="outlined"
                  inputProps={{
                    pattern: '^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$',
                    title: 'Please enter time in 24-hour format (HH:MM)'
                  }}
                />
              </Grid>
              
            
              
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={loading}
                  fullWidth
                  size="large"
                >
                  {loading ? 'Creating...' : 'Create Game'}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Box>
      
      <Box sx={{ my: 4 }}>
        {gamesLoading ? (
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="100px">
            <CircularProgress />
          </Box>
        ) : (
          <Paper sx={{ mt: 4, p: 2 }}>
            <Typography variant="h6" gutterBottom>
              All Starline Games
            </Typography>
            <Box sx={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th style={{ border: '1px solid #ddd', padding: 8 }}>Game Name</th>
                    <th style={{ border: '1px solid #ddd', padding: 8 }}>Open Time</th>
                    <th style={{ border: '1px solid #ddd', padding: 8 }}>Close Time</th>
                    <th style={{ border: '1px solid #ddd', padding: 8 }}>Game Date</th>
                    <th style={{ border: '1px solid #ddd', padding: 8 }}>Result</th>
                    <th style={{ border: '1px solid #ddd', padding: 8 }}>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {games.length === 0 ? (
                    <tr>
                      <td colSpan={6} align="center">No games found</td>
                    </tr>
                  ) : (
                    games.map((game) => (
                      <tr key={game._id}>
                        <td style={{ border: '1px solid #ddd', padding: 8 }}>{game.gameName}</td>
                        <td style={{ border: '1px solid #ddd', padding: 8 }}>{game.openTime}</td>
                        <td style={{ border: '1px solid #ddd', padding: 8 }}>{game.closeTime}</td>
                        <td style={{ border: '1px solid #ddd', padding: 8 }}>
                          {game.gameDate ? new Date(game.gameDate).toLocaleDateString() : ''}
                        </td>
                        <td style={{ border: '1px solid #ddd', padding: 8 }}>
                          {game.result
                            ? `${game.result.openResult || '-'}-${game.result.closeResult || '-'} (${game.result.jodiResult || '-'})`
                            : 'N/A'}
                        </td>
                        <td style={{ border: '1px solid #ddd', padding: 8 }}>
                          <IconButton color="error" onClick={() => handleDeleteGame(game._id)}>
                            <DeleteIcon />
                          </IconButton>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </Box>
          </Paper>
        )}
      </Box>
      
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Starlineadd;