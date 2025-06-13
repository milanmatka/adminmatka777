import { useEffect, useState } from 'react';
import {
  Grid,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Select,
  MenuItem,
  TextField,
  CircularProgress
} from '@mui/material';
import axios from 'axios';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';

const TypographyPage = () => {
  const [withdrawals, setWithdrawals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [updatingId, setUpdatingId] = useState('');
  const [statusMap, setStatusMap] = useState({});
  const [noteMap, setNoteMap] = useState({});

  // Utility to show alerts in a more robust way
  const showAlert = (message, type = 'error') => {
    // For now, fallback to window.alert, but can be replaced with Snackbar, Toast, etc.
    alert(`${type.toUpperCase()}: ${message}`);
  };

  const fetchWithdrawals = async () => {
    setLoading(true);
    try {
      const res = await axios.get('https://mtka-api.onrender.com/api/withdrawal/all');
      if (res.data && res.data.success) {
        setWithdrawals(res.data.data);
      } else {
        showAlert('Failed to fetch withdrawals: ' + (res.data?.message || 'Unknown error'), 'error');
      }
    } catch (err) {
      console.error('Error fetching withdrawals', err);
      let msg = 'Unknown error';
      if (err.response && err.response.data && err.response.data.message) {
        msg = err.response.data.message;
      } else if (err.message) {
        msg = err.message;
      }
      showAlert('Error fetching withdrawals: ' + msg, 'error');
    } finally {
      setLoading(false);
    }
  };

  const updateWithdrawal = async (id, transactionId) => {
    if (!statusMap[id]) {
      showAlert('Please select a status before updating.', 'warning');
      return;
    }
    setUpdatingId(id);
    try {
      const res = await axios.put(`https://mtka-api.onrender.com/api/withdrawal/update/${id}`, {
        status: statusMap[id],
        transactionId,
        note: noteMap[id] || 'withdraw'
      });
      if (res.data && res.data.success) {
        showAlert('Withdrawal updated successfully.', 'success');
        fetchWithdrawals(); // Refresh list after update
      } else {
        showAlert('Failed to update withdrawal: ' + (res.data?.message || 'Unknown error'), 'error');
      }
    } catch (err) {
      console.error('Error updating withdrawal', err);
      let msg = 'Unknown error';
      if (err.response && err.response.data && err.response.data.message) {
        msg = err.response.data.message;
      } else if (err.message) {
        msg = err.message;
      }
      showAlert('Error updating withdrawal: ' + msg, 'error');
    } finally {
      setUpdatingId('');
    }
  };

  useEffect(() => {
    fetchWithdrawals();
  }, []);

  return (
    <PageContainer title="Withdrawals" description="Manage withdrawal requests">
      <Grid container spacing={3}>
        <Grid item sm={12}>
          <DashboardCard title="Withdrawal Requests">
            {loading ? (
              <CircularProgress />
            ) : (
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>User ID</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Method</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Note</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {withdrawals.map((w) => (
                    <TableRow key={w._id}>
                      <TableCell>{w.userId}</TableCell>
                      <TableCell>{w.amount}</TableCell>
                      <TableCell>{w.method}</TableCell>
                      <TableCell>
                        <Select
                          value={statusMap[w._id] || w.status}
                          onChange={(e) =>
                            setStatusMap((prev) => ({ ...prev, [w._id]: e.target.value }))
                          }
                          fullWidth
                          size="small"
                        >
                          <MenuItem value="Pending">Pending</MenuItem>
                          <MenuItem value="Approved">Approved</MenuItem>
                          <MenuItem value="Rejected">Rejected</MenuItem>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <TextField
                          value={noteMap[w._id] || w.note}
                          onChange={(e) =>
                            setNoteMap((prev) => ({ ...prev, [w._id]: e.target.value }))
                          }
                          size="small"
                          fullWidth
                        />
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                          onClick={() => updateWithdrawal(w._id, w.userId)}
                          disabled={updatingId === w._id}
                        >
                          {updatingId === w._id ? 'Updating...' : 'Update'}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </DashboardCard>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default TypographyPage;
