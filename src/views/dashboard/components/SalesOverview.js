import React, { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import DashboardCard from '../../../components/shared/DashboardCard';
import Chart from 'react-apexcharts';
import axios from 'axios';

const SalesOverview = () => {
  const [topUsers, setTopUsers] = useState([]);
  const theme = useTheme();

  const primary = theme.palette.primary.main;

  useEffect(() => {
    const fetchTopUsers = async () => {
      try {
        const res = await axios.get('https://mtka-api.onrender.com/api/wallet/admin/all-wallets');
        // Sort by balance and pick top 10
        const sorted = (res.data || [])
          .sort((a, b) => (b.balance || 0) - (a.balance || 0))
          .slice(0, 10);
        setTopUsers(sorted);
      } catch (err) {
        console.error('Failed to fetch top users:', err);
      }
    };

    fetchTopUsers();
  }, []);

  const userNames = topUsers.map((user) => user.name);
  const balanceData = topUsers.map((user) => user.balance || 0);

  const optionscolumnchart = {
    chart: {
      type: 'bar',
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      foreColor: '#adb0bb',
      toolbar: { show: true },
      height: 370,
    },
    colors: [primary],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '42%',
        borderRadius: [6],
        borderRadiusApplication: 'end',
        borderRadiusWhenStacked: 'all',
      },
    },
    stroke: {
      show: true,
      width: 5,
      lineCap: 'butt',
      colors: ['transparent'],
    },
    dataLabels: { enabled: false },
    legend: { show: true },
    grid: {
      borderColor: 'rgba(0,0,0,0.1)',
      strokeDashArray: 3,
    },
    xaxis: {
      categories: userNames,
      axisBorder: { show: false },
    },
    yaxis: {
      tickAmount: 4,
    },
    tooltip: {
      theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
      fillSeriesColor: false,
    },
  };

  const seriescolumnchart = [
    {
      name: 'Wallet Balance',
      data: balanceData,
    },
  ];

  return (
    <DashboardCard title="Top 10 Users by Wallet Balance">
      <Chart
        options={optionscolumnchart}
        series={seriescolumnchart}
        type="bar"
        height="370px"
      />
    </DashboardCard>
  );
};

export default SalesOverview;
