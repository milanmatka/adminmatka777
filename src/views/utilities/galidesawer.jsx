import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Button, 
  TextField, 
  Typography, 
  Snackbar, 
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { red } from '@mui/material/colors';
import axios from 'axios';

const API_BASE_URL = 'https://mtka-api.onrender.com/api/galidesawar';

const Galidesawer = () => {
  console.log('Rendering Galidesawer component');
  const [gameName, setGameName] = useState('');
  const [closeTime, setCloseTime] = useState('');
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });
  
  const [deleteDialog, setDeleteDialog] = useState({
    open: false,
    gameId: null,
    gameName: ''
  });

  // Fetch all games on component mount
  useEffect(() => {
    console.log('Component mounted, fetching games...');
    fetchGames();
  }, []);

  const fetchGames = async () => {
    console.log('Fetching games from:', `${API_BASE_URL}/all-games`);
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/all-games`);
      console.log('Games API response:', response.data);
      // The response has a 'games' property that contains the array of games
      const gamesData = response.data.games || [];
      console.log('Setting games data:', gamesData);
      setGames(gamesData);
    } catch (error) {
      console.error('Error fetching games:', error);
      showSnackbar('Failed to fetch games', 'error');
      setGames([]); // Ensure games is always an array
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!gameName.trim() || !closeTime) {
      showSnackbar('Please fill in all fields', 'error');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        `${API_BASE_URL}/add-game`,
        { gameName, closeTime }
      );
      
      showSnackbar('Game added successfully!', 'success');
      setGameName('');
      setCloseTime('');
      fetchGames(); // Refresh the games list
    } catch (error) {
      console.error('Error adding game:', error);
      const errorMessage = error.response?.data?.message || 'Failed to add game';
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

  const handleDeleteClick = (gameId, gameName) => {
    setDeleteDialog({
      open: true,
      gameId,
      gameName
    });
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialog({
      open: false,
      gameId: null,
      gameName: ''
    });
  };

  const confirmDelete = async () => {
    if (!deleteDialog.gameId) return;
    
    try {
      setLoading(true);
      const response = await axios.delete(`${API_BASE_URL}/${deleteDialog.gameId}`);
      
      if (response.data.success) {
        showSnackbar(response.data.message || 'Game deleted successfully', 'success');
        fetchGames(); // Refresh the games list
      } else {
        showSnackbar(response.data.message || 'Failed to delete game', 'error');
      }
    } catch (error) {
      console.error('Delete Game Error:', error);
      const errorMessage = error.response?.data?.message || 'Failed to delete game';
      showSnackbar(errorMessage, 'error');
    } finally {
      setLoading(false);
      handleCloseDeleteDialog();
    }
  };

  console.log('Rendering with state:', { games, loading, deleteDialog });

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Galidesawer Game Management
      </Typography>
      
      {/* Add Game Form */}
      <Box component="form" onSubmit={handleSubmit} mb={4}>
        <Box display="flex" gap={2} alignItems="center" mb={2}>
          <TextField
            label="Game Name"
            variant="outlined"
            value={gameName}
            onChange={(e) => setGameName(e.target.value)}
            sx={{ minWidth: 250 }}
            placeholder="Enter game name..."
            disabled={loading}
          />
          <TextField
            label="Close Time"
            type="time"
            variant="outlined"
            value={closeTime}
            onChange={(e) => setCloseTime(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 300, // 5 min
            }}
            disabled={loading}
          />
          <Button 
            type="submit"
            variant="contained" 
            color="primary"
            disabled={loading}
            sx={{ height: '56px' }}
          >
            {loading ? 'Adding...' : 'Add Game'}
          </Button>
        </Box>
      </Box>

      {/* Games List */}
      <Box mt={4}>
        <Typography variant="h5" gutterBottom>
          Existing Games
        </Typography>
        <TableContainer component={Paper} elevation={3}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                <TableCell sx={{ fontWeight: 'bold' }}>#</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Game Name</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Close Time</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Created At</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ py: 3 }}>
                    Loading games...
                  </TableCell>
                </TableRow>
              ) : games && games.length > 0 ? (
                games.map((game, index) => (
                  <TableRow 
                    key={game._id}
                    sx={{ '&:nth-of-type(odd)': { backgroundColor: '#fafafa' } }}
                  >
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{game.gameName || 'N/A'}</TableCell>
                    <TableCell>{game.closeTime || 'N/A'}</TableCell>
                    <TableCell>
                      {game.createdAt ? new Date(game.createdAt).toLocaleString() : 'N/A'}
                    </TableCell>
                    <TableCell>
                      <IconButton 
                        aria-label="delete" 
                        onClick={() => handleDeleteClick(game._id, game.gameName)}
                        disabled={loading}
                      >
                        <DeleteIcon sx={{ color: red[500] }} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} align="center" sx={{ py: 3 }}>
                    No games found. Add a new game to get started.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Snackbar for notifications */}
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

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialog.open}
        onClose={handleCloseDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Delete Game
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete the game "{deleteDialog.gameName}"? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} disabled={loading}>
            Cancel
          </Button>
          <Button 
            onClick={confirmDelete} 
            color="error" 
            autoFocus
            disabled={loading}
          >
            {loading ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Galidesawer;