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
  Card,
  CardContent,
  Divider,
  CircularProgress,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Autocomplete
} from '@mui/material';
import axios from 'axios';

const API_URL = 'https://mtka-api.onrender.com/api/starline/result/upload';
const GAMES_API_URL = 'https://mtka-api.onrender.com/api/starline/game/all';

const Starlineresult = () => {
  const [formData, setFormData] = useState({
    gameId: '',
    gameName: '',
    openDigits: '',
    closeDigits: ''
  });
  const [games, setGames] = useState([]);
  const [gamesLoading, setGamesLoading] = useState(true);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  // Fetch all games on component mount
  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get(GAMES_API_URL);
        setGames(response.data.data || []);
      } catch (err) {
        console.error('Error fetching games:', err);
        setSnackbar({
          open: true,
          message: 'Failed to load games. Please refresh the page.',
          severity: 'error'
        });
      } finally {
        setGamesLoading(false);
      }
    };

    fetchGames();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Only allow numbers for digit fields
    if ((name === 'openDigits' || name === 'closeDigits') && value !== '' && !/^\d*$/.test(value)) {
      return;
    }
    
    // If game is selected from dropdown
    if (name === 'gameId') {
      const selectedGame = games.find(game => game._id === value);
      setFormData(prev => ({
        ...prev,
        gameId: value,
        gameName: selectedGame ? selectedGame.gameName : ''
      }));
      return;
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);

    // Basic validation
    if (!formData.gameId.trim()) {
      setError('Game ID is required');
      setLoading(false);
      return;
    }

    if (!formData.openDigits || !formData.closeDigits) {
      setError('Both Open and Close digits are required');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(API_URL, {
        gameId: formData.gameId.trim(),
        openDigits: formData.openDigits,
        closeDigits: formData.closeDigits
      });
      
      setResult(response.data.data);
      setSnackbar({
        open: true,
        message: response.data.message || 'Result uploaded successfully!',
        severity: 'success'
      });
      
      // Reset form after successful submission
      setFormData({
        gameId: '',
        openDigits: '',
        closeDigits: ''
      });
    } catch (err) {
      console.error('Error uploading result:', err);
      const errorMessage = err.response?.data?.message || 'Failed to upload result. Please try again.';
      setError(errorMessage);
      setSnackbar({
        open: true,
        message: errorMessage,
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Upload Starline Result
        </Typography>
        
        <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                {gamesLoading ? (
                  <Box display="flex" justifyContent="center" py={2}>
                    <CircularProgress size={24} />
                  </Box>
                ) : (
                  <FormControl fullWidth variant="outlined" required>
                    <InputLabel id="game-select-label">Select Game</InputLabel>
                    <Select
                      labelId="game-select-label"
                      id="game-select"
                      value={formData.gameId}
                      onChange={handleChange}
                      label="Select Game"
                      name="gameId"
                    >
                      <MenuItem value="" disabled>
                        <em>Select a game</em>
                      </MenuItem>
                      {games.map((game) => (
                        <MenuItem key={game._id} value={game._id}>
                          {game.gameName} - {game.gameDate ? new Date(game.gameDate).toLocaleDateString() : ''} ({game.openTime} - {game.closeTime})
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Game Name"
                  value={formData.gameName}
                  variant="outlined"
                  disabled
                  helperText="Selected game will appear here"
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Open Digits"
                  name="openDigits"
                  value={formData.openDigits}
                  onChange={handleChange}
                  required
                  variant="outlined"
                  placeholder="e.g., 113"
                  inputProps={{
                    maxLength: 3,
                    pattern: '\\d*'
                  }}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Close Digits"
                  name="closeDigits"
                  value={formData.closeDigits}
                  onChange={handleChange}
                  required
                  variant="outlined"
                  placeholder="e.g., 456"
                  inputProps={{
                    maxLength: 3,
                    pattern: '\\d*'
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
                  startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
                >
                  {loading ? 'Uploading...' : 'Upload Result'}
                </Button>
              </Grid>
              
              {error && (
                <Grid item xs={12}>
                  <Alert severity="error">{error}</Alert>
                </Grid>
              )}
            </Grid>
          </form>
        </Paper>


        {result && (
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Result Details
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body1">
                    <strong>Game ID:</strong> {result.gameId}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body1">
                    <strong>Open Digits:</strong> {result.openDigits}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body1">
                    <strong>Close Digits:</strong> {result.closeDigits}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body1">
                    <strong>Open Result:</strong> {result.openResult}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body1">
                    <strong>Close Result:</strong> {result.closeResult}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body1">
                    <strong>Jodi Result:</strong> {result.jodiResult}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="caption" color="textSecondary">
                    Result processed at: {new Date(result.createdAt).toLocaleString()}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        )}
      </Box>
      
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity} 
          sx={{ width: '100%' }}
          elevation={6}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Starlineresult;