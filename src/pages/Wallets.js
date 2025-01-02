import React, { useState } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Box,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  AccountBalanceWallet,
} from '@mui/icons-material';

const Wallets = () => {
  const [wallets, setWallets] = useState([
    { id: 1, name: 'Ví Tiền Mặt', balance: '2,000,000 VND', type: 'cash' },
    { id: 2, name: 'Ví Ngân Hàng', balance: '15,000,000 VND', type: 'bank' },
    { id: 3, name: 'Ví Tiết Kiệm', balance: '30,000,000 VND', type: 'savings' },
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [editingWallet, setEditingWallet] = useState(null);
  const [newWallet, setNewWallet] = useState({ name: '', balance: '', type: 'cash' });

  const handleOpenDialog = (wallet = null) => {
    if (wallet) {
      setEditingWallet(wallet);
      setNewWallet(wallet);
    } else {
      setEditingWallet(null);
      setNewWallet({ name: '', balance: '', type: 'cash' });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingWallet(null);
    setNewWallet({ name: '', balance: '', type: 'cash' });
  };

  const handleSaveWallet = () => {
    if (editingWallet) {
      setWallets(wallets.map(w => 
        w.id === editingWallet.id ? { ...newWallet, id: w.id } : w
      ));
    } else {
      setWallets([...wallets, { ...newWallet, id: wallets.length + 1 }]);
    }
    handleCloseDialog();
  };

  const handleDeleteWallet = (id) => {
    setWallets(wallets.filter(w => w.id !== id));
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h5" component="h2">
          Quản Lý Ví
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Thêm Ví Mới
        </Button>
      </Box>

      <Grid container spacing={3}>
        {wallets.map((wallet) => (
          <Grid item xs={12} md={4} key={wallet.id}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <AccountBalanceWallet sx={{ mr: 1 }} />
                  <Typography variant="h6" component="div">
                    {wallet.name}
                  </Typography>
                </Box>
                <Typography variant="h4" color="primary">
                  {wallet.balance}
                </Typography>
                <Typography color="textSecondary" sx={{ mb: 1.5 }}>
                  Loại: {wallet.type}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                  <IconButton
                    color="primary"
                    onClick={() => handleOpenDialog(wallet)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDeleteWallet(wallet.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>
          {editingWallet ? 'Chỉnh Sửa Ví' : 'Thêm Ví Mới'}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Tên Ví"
            fullWidth
            value={newWallet.name}
            onChange={(e) => setNewWallet({ ...newWallet, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Số Dư"
            fullWidth
            value={newWallet.balance}
            onChange={(e) => setNewWallet({ ...newWallet, balance: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Loại Ví"
            fullWidth
            value={newWallet.type}
            onChange={(e) => setNewWallet({ ...newWallet, type: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Hủy</Button>
          <Button onClick={handleSaveWallet} variant="contained">
            {editingWallet ? 'Cập Nhật' : 'Thêm'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Wallets;
