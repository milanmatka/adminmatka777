import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Avatar,
  Button,
  Tooltip,
  IconButton,
  Chip,
  useTheme,
} from '@mui/material';
import {
  CheckCircle,
  Cancel,
  HourglassEmpty,
} from '@mui/icons-material';

const Approvepayouts = () => {
  const theme = useTheme();
  const [payouts, setPayouts] = useState([]);

  useEffect(() => {
    const fetchPayouts = async () => {
      try {
        const response = await axios.get('https://mtka-api.onrender.com/api/wallet/admin/requests');
        const formattedData = response.data.map((item, index) => ({
          id: item._id,
          username: item.user?.name || 'N/A',
          userId: item.user?._id || 'N/A',
          amount: item.amount,
          utrId: item.note, // Placeholder - adjust when real field is available
          image: 'https://via.placeholder.com/100', // Placeholder
          status: item.status.charAt(0).toUpperCase() + item.status.slice(1),
        }));
        setPayouts(formattedData);
      } catch (error) {
        console.error('Error fetching payouts:', error);
      }
    };

    fetchPayouts();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      const action = newStatus.toLowerCase(); // "approve", "reject", "pending"
  
      const response = await axios.post('https://mtka-api.onrender.com/api/wallet/admin/manage', {
        requestId: id,
        action: action,
      });
  
      if (response.status === 200) {
        setPayouts((prev) =>
          prev.map((payout) =>
            payout.id === id ? { ...payout, status: newStatus } : payout
          )
        );
      }
    } catch (error) {
      console.error('Failed to update status:', error);
      alert('Failed to update payout status. Please try again.');
    }
  };
  

  const renderStatusChip = (status) => {
    switch (status) {
      case 'Approved':
        return <Chip label="Approved" color="success" icon={<CheckCircle />} />;
      case 'Rejected':
        return <Chip label="Rejected" color="error" icon={<Cancel />} />;
      case 'Pending':
        return <Chip label="Pending" color="warning" icon={<HourglassEmpty />} />;
      default:
        return null;
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Approve Payouts
      </Typography>

      <Card elevation={20} sx={{ borderRadius: 4, width: '100%', minWidth: 1200 }}>
        <CardContent>
          <Table sx={{ minWidth: 1100 }}>
            <TableHead>
              <TableRow sx={{ backgroundColor: theme.palette.grey[100] }}>
                <TableCell><strong>User Name</strong></TableCell>
                <TableCell><strong>User ID</strong></TableCell>
                <TableCell><strong>Amount</strong></TableCell>
                <TableCell><strong>UTR ID</strong></TableCell>
                <TableCell><strong>Proof</strong></TableCell>
                <TableCell><strong>Status</strong></TableCell>
                <TableCell align="center"><strong>Actions</strong></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {payouts.map((payout) => (
                <TableRow key={payout.id} hover>
                  <TableCell>{payout.username}</TableCell>
                  <TableCell>{payout.userId}</TableCell>
                  <TableCell>₹{payout.amount.toLocaleString()}</TableCell>
                  <TableCell>{payout.utrId}</TableCell>
                  <TableCell>
                    <Tooltip title="Click to view image" arrow>
                      <IconButton onClick={() => window.open(payout.image, '_blank')}>
                        <Avatar
                          src={payout.image}
                          alt="Proof"
                          variant="rounded"
                          sx={{
                            width: 56,
                            height: 56,
                            borderRadius: 2,
                            transition: '0.3s',
                            boxShadow: 2,
                            '&:hover': { transform: 'scale(1.05)', cursor: 'zoom-in' },
                          }}
                        />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                  <TableCell>{renderStatusChip(payout.status)}</TableCell>

                  <TableCell align="center">
                    <Tooltip title="Approve" arrow>
                      <Button
                        variant="contained"
                        size="small"
                        color="success"
                        sx={{ mr: 1 }}
                        onClick={() => handleStatusChange(payout.id, 'approve')}
                        disabled={payout.status === 'Approved'}
                      >
                        Approve
                      </Button>
                    </Tooltip>

                    <Tooltip title="Mark as Pending" arrow>
                      <Button
                        variant="contained"
                        size="small"
                        color="warning"
                        sx={{ mr: 1 }}
                        onClick={() => handleStatusChange(payout.id, 'pending')}
                        disabled={payout.status === 'Pending'}
                      >
                        Pending
                      </Button>
                    </Tooltip>

                    <Tooltip title="Reject" arrow>
                      <Button
                        variant="contained"
                        size="small"
                        color="error"
                        onClick={() => handleStatusChange(payout.id, 'reject')}
                        disabled={payout.status === 'Rejected'}
                      >
                        Reject
                      </Button>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Approvepayouts;
