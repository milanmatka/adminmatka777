import React, { useEffect, useState } from 'react';
import DashboardCard from '../../../components/shared/DashboardCard';
import {
  Timeline,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
  TimelineDot,
  TimelineConnector,
  TimelineContent,
  timelineOppositeContentClasses,
} from '@mui/lab';
import {  Typography } from '@mui/material';
import axios from 'axios';
// import dayjs from 'dayjs';

const RecentTransactions = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await axios.get('https://mtka-api.onrender.com/api/transactions/recent');
        setTransactions(res.data || []);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();
  }, []);

  const getDotColor = (type) => {
    switch (type.toLowerCase()) {
      case 'add':
        return 'success';
      case 'withdraw':
        return 'error';
      default:
        return 'primary';
    }
  };

  return (
    <DashboardCard title="Recent Transactions">
      <Timeline
        className="theme-timeline"
        sx={{
          p: 0,
          mb: '-40px',
          '& .MuiTimelineConnector-root': {
            width: '1px',
            backgroundColor: '#efefef',
          },
          [`& .${timelineOppositeContentClasses.root}`]: {
            flex: 0.5,
            paddingLeft: 0,
          },
        }}
      >
        {transactions.length > 0 ? (
          transactions.map((txn, index) => (
            <TimelineItem key={index}>
              <TimelineOppositeContent>
                {dayjs(txn.timestamp).format('hh:mm A')}
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot color={getDotColor(txn.type)} variant="outlined" />
                {index !== transactions.length - 1 && <TimelineConnector />}
              </TimelineSeparator>
              <TimelineContent>
                <Typography fontWeight="600">
                  {txn.type === 'add' ? 'Money Added' : txn.type === 'withdraw' ? 'Money Withdrawn' : txn.type}
                </Typography>
                <Typography variant="body2">
                  {txn.userName} {txn.type === 'add' ? 'added' : 'withdrew'} ₹{txn.amount}
                </Typography>
              </TimelineContent>
            </TimelineItem>
          ))
        ) : (
          <Typography sx={{ mt: 2, ml: 2 }}>No recent transactions found.</Typography>
        )}
      </Timeline>
    </DashboardCard>
  );
};

export default RecentTransactions;
