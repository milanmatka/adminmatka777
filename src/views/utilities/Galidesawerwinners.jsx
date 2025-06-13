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
  TablePagination
} from '@mui/material';
import axios from 'axios';
// ...existing code...
const API_URL = 'https://mtka-api.onrender.com/api/galidesawar/all-bets';

const Galidesawerwinners = () => {
  const [bets, setBets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    const fetchBets = async () => {
      try {
        const response = await axios.get(API_URL);
        setBets(response.data.allBets || []);
        setError('');
      } catch (err) {
        console.error('Error fetching bets:', err);
        setError('Failed to fetch bets. Please try again later.');
        setBets([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBets();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, bets.length - page * rowsPerPage);

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
          Bets List
        </Typography>
        
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <TableContainer sx={{ maxHeight: 600 }}>
            <Table stickyHeader aria-label="bets table">
              <TableHead>
                <TableRow>
                  <TableCell>User Name</TableCell>
                  <TableCell>Mobile</TableCell>
                  <TableCell>Game Name</TableCell>
                  <TableCell>Bet Type</TableCell>
                  <TableCell>Number</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Result</TableCell>
                  <TableCell>Close Time</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {bets.length > 0 ? (
                  bets
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((bet, index) => (
                      <TableRow key={index} hover>
                        <TableCell>{bet.userName}</TableCell>
                        <TableCell>{bet.userNumber}</TableCell>
                        <TableCell>{bet.gameName}</TableCell>
                        <TableCell>{bet.betType}</TableCell>
                        <TableCell>{bet.number}</TableCell>
                        <TableCell>₹{bet.amount}</TableCell>
                        <TableCell>
                          {bet.status === 'lose' ? 'Lose' : `₹${bet.status}`}
                        </TableCell>
                        <TableCell>
                          {bet.result && bet.result.left
                            ? `${bet.result.left}-${bet.result.right} (${bet.result.jodi})`
                            : 'N/A'}
                        </TableCell>
                        <TableCell>{bet.closeTime}</TableCell>
                      </TableRow>
                    ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={9} align="center">
                      No bets found
                    </TableCell>
                  </TableRow>
                )}
                {emptyRows > 0 && bets.length > 0 && (
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
            count={bets.length}
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

export default Galidesawerwinners;