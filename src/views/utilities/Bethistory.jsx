import {
  Container,
  Typography,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Divider,
  Box,
  Grid,
} from '@mui/material';

function Bethistory() {
  // ✅ Sample bet history data for Satta Matka (with Opening and Closing numbers)
  const betHistory = [
    {
      customerName: 'John Doe',
      customerId: 'C12345',
      bets: [
        { number: 5, amount: 100, phase: 'Opening' },
        { number: 12, amount: 200, phase: 'Closing' },
      ],
    },
    {
      customerName: 'Jane Smith',
      customerId: 'C67890',
      bets: [
        { number: 5, amount: 150, phase: 'Opening' },
        { number: 20, amount: 300, phase: 'Closing' },
      ],
    },
  ];

  // 🔍 Aggregate bets by number, considering the phase
  const betCount = { Opening: {}, Closing: {} };
  betHistory.forEach((customer) => {
    customer.bets.forEach((bet) => {
      betCount[bet.phase][bet.number] = (betCount[bet.phase][bet.number] || 0) + bet.amount;
    });
  });

  const allOpeningBets = Object.entries(betCount.Opening);
  const allClosingBets = Object.entries(betCount.Closing);

  const maxOpeningBet = allOpeningBets.reduce((a, b) => (a[1] > b[1] ? a : b));
  const minOpeningBet = allOpeningBets.reduce((a, b) => (a[1] < b[1] ? a : b));

  const maxClosingBet = allClosingBets.reduce((a, b) => (a[1] > b[1] ? a : b));
  const minClosingBet = allClosingBets.reduce((a, b) => (a[1] < b[1] ? a : b));

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Satta Matka Bet History
      </Typography>

      {/* 🧾 Individual Customer Cards */}
      {betHistory.map((customer, index) => (
        <Card key={index} sx={{ mb: 3, boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Customer Details
            </Typography>
            <Typography>
              <strong>Name:</strong> {customer.customerName}
            </Typography>
            <Typography>
              <strong>ID:</strong> {customer.customerId}
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Typography variant="subtitle1" gutterBottom>
              Bet Details (Opening and Closing)
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="center">
                      <strong>Phase</strong>
                    </TableCell>
                    <TableCell align="center">
                      <strong>Number</strong>
                    </TableCell>
                    <TableCell align="center">
                      <strong>Amount</strong>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {customer.bets.map((bet, betIndex) => (
                    <TableRow key={betIndex}>
                      <TableCell align="center">{bet.phase}</TableCell>
                      <TableCell align="center">{bet.number}</TableCell>
                      <TableCell align="center">${bet.amount}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      ))}

      {/* 📊 Summary Section */}
      <Box
        mt={4}
        p={3}
        sx={{
          backgroundColor: '#f3f4f6',
          borderRadius: 2,
          boxShadow: 2,
        }}
      >
        <Typography variant="h5" gutterBottom fontWeight="bold">
          Summary
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1">
              🔺 <strong>Most Bet Opening Number:</strong> {maxOpeningBet[0]} (${maxOpeningBet[1]})
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1">
              🔻 <strong>Least Bet Opening Number:</strong> {minOpeningBet[0]} (${minOpeningBet[1]})
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1">
              🔺 <strong>Most Bet Closing Number:</strong> {maxClosingBet[0]} (${maxClosingBet[1]})
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1">
              🔻 <strong>Least Bet Closing Number:</strong> {minClosingBet[0]} (${minClosingBet[1]})
            </Typography>
          </Grid>
        </Grid>
      </Box>

      {/* 📊 Total Bets Summary */}
      <Box
        mt={4}
        p={3}
        sx={{
          backgroundColor: '#e0e0e0',
          borderRadius: 2,
          boxShadow: 2,
        }}
      >
        <Typography variant="h6" gutterBottom fontWeight="bold">
          Total Bet Summary
        </Typography>
        <Typography variant="body1">
          <strong>Total Bets:</strong> {betHistory.reduce((acc, customer) => acc + customer.bets.length, 0)}
        </Typography>
        <Typography variant="body1">
          <strong>Total Bet Amount:</strong> $
          {betHistory.reduce(
            (acc, customer) => acc + customer.bets.reduce((sum, bet) => sum + bet.amount, 0),
            0
          )}
        </Typography>
      </Box>
    </Container>
  );
}

export default Bethistory;
