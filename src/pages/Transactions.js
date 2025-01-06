import React from 'react';
import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Button,
  Box,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const Transactions = () => {
  const transactions = [
    {
      id: 1,
      date: '02/01/2025',
      description: 'Lương tháng 1',
      type: 'Thu nhập',
      amount: '15,000,000 VND',
    },
    {
      id: 2,
      date: '02/01/2025',
      description: 'Tiền điện',
      type: 'Chi tiêu',
      amount: '-500,000 VND',
    },
    {
      id: 3,
      date: '01/01/2025',
      description: 'Tiền nước',
      type: 'Chi tiêu',
      amount: '-200,000 VND',
    },
  ];

  return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="h5" component="h2">
            Lịch Sử Giao Dịch
          </Typography>
          <Button
              variant="contained"
              startIcon={<AddIcon />}
              color="primary"
          >
            Thêm Giao Dịch
          </Button>
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Ngày</TableCell>
                <TableCell>Mô tả</TableCell>
                <TableCell>Loại</TableCell>
                <TableCell align="right">Số tiền</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.map((transaction) => (
                  <TableRow
                      key={transaction.id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell>{transaction.date}</TableCell>
                    <TableCell>{transaction.description}</TableCell>
                    <TableCell>{transaction.type}</TableCell>
                    <TableCell
                        align="right"
                        sx={{
                          color: transaction.type === 'Thu nhập' ? 'success.main' : 'error.main'
                        }}
                    >
                      {transaction.amount}
                    </TableCell>
                  </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
  );
};

export default Transactions;