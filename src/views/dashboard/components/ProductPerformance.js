import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, IconButton, Stack, Chip, Dialog, DialogTitle, DialogContent, DialogActions,
  Button, Divider, List, ListItem, ListItemText
} from '@mui/material';
import { Visibility } from '@mui/icons-material';

function Userdetails() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [viewOpen, setViewOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(10); // 👈 show 10 users initially

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get('https://mtka-api.onrender.com/api/wallet/admin/all-wallets');
      const enrichedData = res.data.map(user => ({
        ...user,
        status: ['Active', 'Inactive', 'Blocked'][Math.floor(Math.random() * 3)],
        totalBets: user.totalBets || Math.floor(Math.random() * 100), // mock fallback
      }));
      setUsers(enrichedData);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'success';
      case 'Blocked': return 'error';
      case 'Inactive': return 'warning';
      default: return 'default';
    }
  };

  const handleView = (user) => {
    setSelectedUser(user);
    setViewOpen(true);
  };

  const totalUsers = users.length;
  const totalBalance = users.reduce((acc, curr) => acc + (curr.walletBalance || 0), 0);

  return (
    <Box p={4} maxWidth="1200px" mx="auto">
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        User Management
      </Typography>

      <Box mb={2}>
        <Typography variant="subtitle1">
          Total Users: <strong>{totalUsers}</strong>
        </Typography>
        <Typography variant="subtitle1">
          Total Wallet Balance: <strong>₹{totalBalance.toFixed(2)}</strong>
        </Typography>
      </Box>

      <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: 3 }}>
        <Table>
          <TableHead sx={{ backgroundColor: '#f0f0f0' }}>
            <TableRow>
              <TableCell><strong>#</strong></TableCell>
              <TableCell><strong>Name</strong></TableCell>
              <TableCell><strong>Phone</strong></TableCell>
              <TableCell><strong>Email</strong></TableCell>
              <TableCell><strong>Wallet</strong></TableCell>
              <TableCell><strong>Bets</strong></TableCell>
              <TableCell><strong>Status</strong></TableCell>
              <TableCell align="center"><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.slice(0, visibleCount).map((user, index) => (
              <TableRow key={user.userId || index} sx={{ '&:hover': { backgroundColor: '#fafafa' } }}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.number}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>₹{user.walletBalance}</TableCell>
                <TableCell>{user.totalBets}</TableCell>
                <TableCell>
                  <Chip
                    label={user.status}
                    color={getStatusColor(user.status)}
                    variant="outlined"
                  />
                </TableCell>
                <TableCell align="center">
                  <Stack direction="row" spacing={1} justifyContent="center">
                    <IconButton color="primary" onClick={() => handleView(user)}>
                      <Visibility />
                    </IconButton>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
            {users.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} align="center">No users found.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* See More Button */}
      {users.length > visibleCount && (
        <Box mt={2} textAlign="center">
          <Button variant="outlined" onClick={() => setVisibleCount(prev => prev + 10)}>
            See More
          </Button>
        </Box>
      )}

      {/* View Dialog */}
      <Dialog open={viewOpen} onClose={() => setViewOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>User Details</DialogTitle>
        <DialogContent dividers>
          {selectedUser && (
            <>
              <Typography><strong>Name:</strong> {selectedUser.name}</Typography>
              <Typography><strong>Phone:</strong> {selectedUser.number}</Typography>
              <Typography><strong>Email:</strong> {selectedUser.email}</Typography>
              <Typography><strong>Wallet:</strong> ₹{selectedUser.walletBalance}</Typography>
              <Typography><strong>Total Bets:</strong> {selectedUser.totalBets}</Typography>
              <Typography><strong>Status:</strong> {selectedUser.status}</Typography>

              <Divider sx={{ my: 2 }} />
              <Typography variant="h6">Transactions</Typography>
              <List dense>
                {selectedUser.transactions?.length > 0 ? selectedUser.transactions.map((txn, i) => (
                  <ListItem key={i} divider>
                    <ListItemText
                      primary={`${txn.type.toUpperCase()}: ₹${txn.amount}`}
                      secondary={txn.note || 'No Note'}
                    />
                  </ListItem>
                )) : (
                  <Typography color="text.secondary">No transactions available</Typography>
                )}
              </List>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setViewOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Userdetails;
