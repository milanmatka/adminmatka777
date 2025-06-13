import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, IconButton, Stack, Chip, Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, Divider, List, ListItem, ListItemText
} from '@mui/material';
import { Visibility, Edit, Delete } from '@mui/icons-material';

function Userdetails() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [viewOpen, setViewOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editValues, setEditValues] = useState({ name: '', number: '', email: '' });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get('https://mtka-api.onrender.com/api/wallet/admin/all-wallets');
      const enrichedData = res.data.map(user => ({
        ...user,
        status: ['Active', 'Inactive', 'Blocked'][Math.floor(Math.random() * 3)] // Optional random status
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

  const handleEdit = (user) => {
    setSelectedUser(user);
    setEditValues({ name: user.name, number: user.number, email: user.email });
    setEditOpen(true);
  };

  const handleDelete = (user) => {
    setSelectedUser(user);
    setDeleteOpen(true);
  };

  const handleEditSave = () => {
    setUsers((prev) =>
      prev.map((u) =>
        u.userId === selectedUser.userId ? { ...u, ...editValues } : u
      )
    );
    setEditOpen(false);
  };

  const handleDeleteConfirm = () => {
    setUsers((prev) => prev.filter((u) => u.userId !== selectedUser.userId));
    setDeleteOpen(false);
  };

  return (
    <Box p={4} maxWidth="1200px" mx="auto">
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        User Management
      </Typography>

      <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: 3 }}>
        <Table>
          <TableHead sx={{ backgroundColor: '#f0f0f0' }}>
            <TableRow>
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
            {users.map((user, index) => (
              <TableRow key={user.userId || index} sx={{ '&:hover': { backgroundColor: '#fafafa' } }}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.number}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>₹{user.walletBalance}</TableCell>
                <TableCell>{user.totalBets}</TableCell>
                <TableCell>
                  <Chip label={user.status} color={getStatusColor(user.status)} variant="outlined" />
                </TableCell>
                <TableCell align="center">
                  <Stack direction="row" spacing={1} justifyContent="center">
                    <IconButton color="primary" onClick={() => handleView(user)}>
                      <Visibility />
                    </IconButton>
                    {/* <IconButton color="warning" onClick={() => handleEdit(user)}>
                      <Edit />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDelete(user)}>
                      <Delete />
                    </IconButton> */}
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
            {users.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} align="center">No users found.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

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
              {/* <Typography><strong>Total Bets:</strong> {selectedUser.totalBets}</Typography> */}
              {/* <Typography><strong>Status:</strong> {selectedUser.status}</Typography> */}

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
                  <Typography color="text.secondary">No transactions</Typography>
                )}
              </List>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setViewOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Edit Dialog */}
      {/* <Dialog open={editOpen} onClose={() => setEditOpen(false)}>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent dividers>
          <TextField
            fullWidth margin="dense" label="Name"
            value={editValues.name}
            onChange={(e) => setEditValues({ ...editValues, name: e.target.value })}
          />
          <TextField
            fullWidth margin="dense" label="Phone"
            value={editValues.number}
            onChange={(e) => setEditValues({ ...editValues, number: e.target.value })}
          />
          <TextField
            fullWidth margin="dense" label="Email"
            value={editValues.email}
            onChange={(e) => setEditValues({ ...editValues, email: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleEditSave}>Save</Button>
        </DialogActions>
      </Dialog> */}

      {/* Delete Dialog */}
      {/* <Dialog open={deleteOpen} onClose={() => setDeleteOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent dividers>
          <Typography>Are you sure you want to delete <strong>{selectedUser?.name}</strong>?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteOpen(false)}>Cancel</Button>
          <Button variant="contained" color="error" onClick={handleDeleteConfirm}>Delete</Button>
        </DialogActions>
      </Dialog> */}
    </Box>
  );
}

export default Userdetails;
