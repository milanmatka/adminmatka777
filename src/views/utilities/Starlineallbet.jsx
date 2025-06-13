import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Alert,
  TablePagination,
  TextField,
  InputAdornment,
  Chip,
  Avatar,
  IconButton,
  Tooltip
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';

const API_URL = 'https://mtka-api.onrender.com/api/starline/bet/all-bets';

const statusColors = {
  pending: 'default',
  won: 'success',
  lost: 'error'
};

const Starlineallbet = () => {
  const [bets, setBets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredBets, setFilteredBets] = useState([]);

  useEffect(() => {
    const fetchBets = async () => {
      try {
        const response = await axios.get(API_URL);
        setBets(response.data.data || []);
        setFilteredBets(response.data.data || []);
        setError('');
      } catch (err) {
        console.error('Error fetching bets:', err);
        setError('Failed to fetch bets. Please try again later.');
        setBets([]);
        setFilteredBets([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBets();
  }, []);

  useEffect(() => {
    const filtered = bets.filter(bet => 
      bet.userId.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bet.userId.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bet.gameType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bet.betInfo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bet.status.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBets(filtered);
    setPage(0); // Reset to first page when filtering
  }, [searchTerm, bets]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, filteredBets.length - page * rowsPerPage);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="xl">
      <Box sx={{ my: 3 }}>
        <Typography variant="h4" gutterBottom>
          All Starline Bets
        </Typography>
        
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box sx={{ mb: 3 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search bets by user, game type, or status..."
            value={searchTerm}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{ maxWidth: 600 }}
          />
        </Box>


        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <TableContainer sx={{ maxHeight: 600 }}>
            <Table stickyHeader aria-label="bets table" size="small">
              <TableHead>
                <TableRow>
                  <TableCell>User</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Game</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Bet Info</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Winning Amount</TableCell>
                  <TableCell>Close Time</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredBets.length > 0 ? (
                  filteredBets
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((bet) => (
                      <TableRow key={bet._id} hover>
                        <TableCell>
                          <Box display="flex" alignItems="center">
                            <Avatar sx={{ width: 32, height: 32, mr: 1, bgcolor: 'primary.main' }}>
                              {bet.userId.name.charAt(0).toUpperCase()}
                            </Avatar>
                            {bet.userId.name}
                          </Box>
                        </TableCell>
                        <TableCell>{bet.userId.email}</TableCell>
                        <TableCell>{bet.game?.name || 'N/A'}</TableCell>
                        <TableCell>
                          <Chip 
                            label={`${bet.gameType}${bet.betType ? ` (${bet.betType})` : ''}`}
                            size="small"
                            variant="outlined"
                          />
                        </TableCell>
                        <TableCell>{bet.betInfo}</TableCell>
                        <TableCell>₹{bet.amount}</TableCell>
                        <TableCell>
                          <Chip 
                            label={bet.status}
                            color={statusColors[bet.status] || 'default'}
                            size="small"
                            variant="outlined"
                          />
                        </TableCell>
                        <TableCell>
                          {bet.status === 'won' ? `₹${bet.winningAmount}` : '-'}
                        </TableCell>
                        <TableCell>{bet.game?.closeTime || 'N/A'}</TableCell>
                      </TableRow>
                    ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={9} align="center">
                      No bets found
                    </TableCell>
                  </TableRow>
                )}
                {emptyRows > 0 && filteredBets.length > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={9} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredBets.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
    </Container>
  );
};

export default Starlineallbet;