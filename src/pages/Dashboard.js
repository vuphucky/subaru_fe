import React from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
} from '@mui/material';
import {
  AccountBalance,
  TrendingUp,
  TrendingDown,
  PieChart
} from '@mui/icons-material';

const Dashboard = () => {
  const balanceData = {
    totalBalance: '50,000,000 VND',
    income: '15,000,000 VND',
    expenses: '8,000,000 VND'
  };

  return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          {/* Số dư */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <AccountBalance sx={{ color: 'primary.main', mr: 1 }} />
                  <Typography color="textSecondary" gutterBottom>
                    Số Dư Hiện Tại
                  </Typography>
                </Box>
                <Typography variant="h4" component="div">
                  {balanceData.totalBalance}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Thu nhập */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <TrendingUp sx={{ color: 'success.main', mr: 1 }} />
                  <Typography color="textSecondary" gutterBottom>
                    Thu Nhập Tháng Này
                  </Typography>
                </Box>
                <Typography variant="h4" component="div">
                  {balanceData.income}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Chi tiêu */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <TrendingDown sx={{ color: 'error.main', mr: 1 }} />
                  <Typography color="textSecondary" gutterBottom>
                    Chi Tiêu Tháng Này
                  </Typography>
                </Box>
                <Typography variant="h4" component="div">
                  {balanceData.expenses}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Biểu đồ thống kê */}
          <Grid item xs={12}>
            <Paper
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  height: 400,
                }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <PieChart sx={{ mr: 1 }} />
                <Typography variant="h6">Phân Tích Chi Tiêu</Typography>
              </Box>
              <Typography variant="body1" color="textSecondary" align="center">
                [Biểu đồ thống kê sẽ được hiển thị ở đây]
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
  );
};

export default Dashboard;