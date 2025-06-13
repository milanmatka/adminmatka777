import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { useTheme } from '@mui/material/styles';
import { Stack, Typography, Avatar, Fab, Box } from '@mui/material';
import { IconArrowDownRight, IconCurrencyDollar } from '@tabler/icons-react';
import DashboardCard from '../../../components/shared/DashboardCard';
import axios from 'axios';

const TotalIncome = () => {
  const theme = useTheme();
  const [totalIncome, setTotalIncome] = useState(0);
  const [percentageChange, setPercentageChange] = useState(0); // optional

  useEffect(() => {
    const fetchTotalIncome = async () => {
      try {
        const res = await axios.get('https://mtka-api.onrender.com/api/wallet/admin/all-wallets');
        const total = res.data.reduce((acc, user) => acc + (user.walletBalance || 0), 0);
        setTotalIncome(total);

        // Optional: calculate percentage change from dummy previous month value
        const lastMonth = 100000; // mock value
        const change = (((total - lastMonth) / lastMonth) * 100).toFixed(2);
        setPercentageChange(change);
      } catch (error) {
        console.error('Failed to fetch total income:', error);
      }
    };
    fetchTotalIncome();
  }, []);

  const secondary = theme.palette.secondary.main;
  const secondarylight = '#f5fcff';
  const errorlight = '#fdede8';

  const optionscolumnchart = {
    chart: {
      type: 'area',
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: '#adb0bb',
      toolbar: { show: false },
      height: 60,
      sparkline: { enabled: true },
    },
    stroke: { curve: 'smooth', width: 2 },
    fill: {
      colors: [secondarylight],
      type: 'solid',
      opacity: 0.05,
    },
    markers: { size: 0 },
    tooltip: {
      theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
    },
  };

  const seriescolumnchart = [
    {
      name: 'Earnings',
      color: secondary,
      data: [25, 66, 20, 40, 12, 58, 20],
    },
  ];

  return (
    <DashboardCard
      title="Total Income"
      action={
        <Fab color="secondary" size="medium" sx={{ color: '#fff' }}>
          <IconCurrencyDollar width={24} />
        </Fab>
      }
      footer={
        <Chart
          options={optionscolumnchart}
          series={seriescolumnchart}
          type="area"
          height="60px"
        />
      }
      sx={{ minWidth: '350px', minHeight: '180px' }}
    >
      <Box>
        <Typography variant="h3" fontWeight="700" mt="-10px">
          ₹{totalIncome.toLocaleString()}
        </Typography>
        <Stack direction="row" spacing={1} my={1} alignItems="center">
          <Avatar sx={{ bgcolor: errorlight, width: 27, height: 27 }}>
            <IconArrowDownRight width={20} color="#FA896B" />
          </Avatar>
          <Typography variant="subtitle2" fontWeight="600">
            {percentageChange > 0 ? '+' : ''}
            {percentageChange}%
          </Typography>
          <Typography variant="subtitle2" color="textSecondary">
            from last month
          </Typography>
        </Stack>
      </Box>
    </DashboardCard>
  );
};

export default TotalIncome;
