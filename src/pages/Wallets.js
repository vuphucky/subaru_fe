import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  AccountBalanceWallet,
  AttachMoney,
  Savings,
  CreditCard,
  LocalAtm,
} from "@mui/icons-material";

const Wallets = () => {
  const [wallets, setWallets] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [openAddMoneyDialog, setOpenAddMoneyDialog] = useState(false);
  const [editingWallet, setEditingWallet] = useState(null);
  const [newWallet, setNewWallet] = useState({ 
    name: "", 
    balance: "", 
    icon: "AccountBalanceWallet",
    currency: "VND",
    description: ""
  });
  const [addMoneyData, setAddMoneyData] = useState({
    amount: "",
    note: "",
    walletId: null
  });

  const icons = [
    { label: "Ví Tiền Mặt", value: "AccountBalanceWallet", icon: <AccountBalanceWallet fontSize="large" /> },
    { label: "Ngân Hàng", value: "CreditCard", icon: <CreditCard fontSize="large" /> },
    { label: "Tiết Kiệm", value: "Savings", icon: <Savings fontSize="large" /> },
    { label: "Tiền Mặt", value: "LocalAtm", icon: <LocalAtm fontSize="large" /> },
    { label: "Quản Lý Tiền", value: "AttachMoney", icon: <AttachMoney fontSize="large" /> },
  ];

  const handleOpenDialog = (wallet = null) => {
    if (wallet) {
      setEditingWallet(wallet);
      setNewWallet({
        name: wallet.name,
        balance: wallet.balance.toString(),
        icon: wallet.iconUrl || "AccountBalanceWallet",
        currency: wallet.currency || "VND",
        description: wallet.description || ""
      });
    } else {
      setEditingWallet(null);
      setNewWallet({ 
        name: "", 
        balance: "", 
        icon: "AccountBalanceWallet",
        currency: "VND",
        description: ""
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingWallet(null);
    setNewWallet({ 
      name: "", 
      balance: "", 
      icon: "AccountBalanceWallet",
      currency: "VND",
      description: ""
    });
  };

  const handleSaveWallet = async () => {
    try {
      // Kiểm tra dữ liệu đầu vào
      if (!newWallet.name.trim()) {
        alert('Vui lòng nhập tên ví!');
        return;
      }

      if (editingWallet) {
        // Cập nhật ví
        const response = await axios.post('http://localhost:8080/api/wallets/fix', {
          id: editingWallet.id,
          name: newWallet.name,
          balance: parseFloat(newWallet.balance) || 0,
          iconUrl: newWallet.icon,
          currency: newWallet.currency,
          description: newWallet.description || `Ví ${newWallet.name}`
        }, {
          headers: {
            'Authorization': `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJEdXliZmwiLCJpYXQiOjE3MzYxMzg2OTAsImV4cCI6MTczNjIyNTA5MH0.vHpr93tdIYmKg2o_szYvAjLPISAQXQnaf0vTGjFhWV0`
          }
        });

        console.log('Cập nhật ví thành công:', response.data);
      } else {
        // Thêm ví mới
        const response = await axios.post('http://localhost:8080/api/wallets/add', {
          name: newWallet.name,
          balance: parseFloat(newWallet.balance) || 0,
          iconUrl: newWallet.icon,
          currency: newWallet.currency,
          description: newWallet.description || `Ví ${newWallet.name}`
        }, {
          headers: {
            'Authorization': `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJEdXliZmwiLCJpYXQiOjE3MzYxMzg2OTAsImV4cCI6MTczNjIyNTA5MH0.vHpr93tdIYmKg2o_szYvAjLPISAQXQnaf0vTGjFhWV0`
          }
        });

        console.log('Thêm ví mới thành công:', response.data);
      }
      
      // Tải lại danh sách ví
      await fetchWallets();
      handleCloseDialog();
      alert(editingWallet ? 'Cập nhật ví thành công!' : 'Thêm ví mới thành công!');
    } catch (error) {
      console.error('Lỗi khi thao tác với ví:', error.response?.data || error.message);
      alert('Có lỗi xảy ra. Vui lòng thử lại!');
    }
  };

  const handleDeleteWallet = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8080/api/wallets/${id}`, {
        headers: {
          'Authorization': `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJEdXliZmwiLCJpYXQiOjE3MzYxMzg2OTAsImV4cCI6MTczNjIyNTA5MH0.vHpr93tdIYmKg2o_szYvAjLPISAQXQnaf0vTGjFhWV0`
        }
      });
      
      if (response.status === 200) {
        // Cập nhật state sau khi xóa thành công
        setWallets(wallets.filter((w) => w.id !== id));
        alert('Xóa ví thành công!');
      }
    } catch (error) {
      console.error('Lỗi khi xóa ví:', error.response?.data || error.message);
      alert('Có lỗi xảy ra khi xóa ví. Vui lòng thử lại!');
    }
  };

  const handleOpenAddMoneyDialog = (walletId) => {
    setAddMoneyData({
      amount: "",
      note: "",
      walletId: walletId
    });
    setOpenAddMoneyDialog(true);
  };

  const handleCloseAddMoneyDialog = () => {
    setOpenAddMoneyDialog(false);
    setAddMoneyData({
      amount: "",
      note: "",
      walletId: null
    });
  };

  const handleAddMoney = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/wallets/add-money', {
        walletId: addMoneyData.walletId,
        amount: parseFloat(addMoneyData.amount),
        note: addMoneyData.note
      }, {
        headers: {
          'Authorization': `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJEdXliZmwiLCJpYXQiOjE3MzYxNDIyODgsImV4cCI6MTczNjIyODY4OH0.W9MMjR0r5meLVE_cp5dX-F5lL6S9Ga7ZW_06JEpBs3U`
        }
      });

      console.log('Add money response:', response.data);
      await fetchWallets();
      handleCloseAddMoneyDialog();
      alert('Thêm tiền thành công!');
    } catch (error) {
      console.error('Error adding money:', error.response?.data || error.message);
      alert('Có lỗi xảy ra khi thêm tiền. Vui lòng thử lại!');
    }
  };

  const fetchWallets = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/wallets/list', {
        headers: {
          'Authorization': `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJEdXliZmwiLCJpYXQiOjE3MzYxMzg2OTAsImV4cCI6MTczNjIyNTA5MH0.vHpr93tdIYmKg2o_szYvAjLPISAQXQnaf0vTGjFhWV0`
        }
      });
      setWallets(response.data);
    } catch (error) {
      console.error('Error fetching wallets:', error);
    }
  };

  const formatCurrency = (amount) => {
    if (!amount) return "0 ₫";
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  useEffect(() => {
    fetchWallets();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h5" component="h2">
          Quản Lý Ví
        </Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleOpenDialog()}>
          Thêm Ví Mới
        </Button>
      </Box>

      <Grid container spacing={3}>
        {wallets.map((wallet) => (
          <Grid item xs={12} md={4} key={wallet.id}>
            <Card
              sx={{
                boxShadow: 3,
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 6,
                },
                borderRadius: 2,
                overflow: 'hidden',
              }}
            >
              <Box
                sx={{
                  background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                  py: 2,
                  px: 3,
                  color: 'white',
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 45,
                      height: 45,
                      borderRadius: "50%",
                      backgroundColor: "rgba(255, 255, 255, 0.2)",
                      mr: 2,
                    }}
                  >
                    {icons.find((icon) => icon.value === wallet.iconUrl)?.icon || <AccountBalanceWallet />}
                  </Box>
                  <Typography variant="h6" component="div" sx={{ fontWeight: 'medium' }}>
                    {wallet.name}
                  </Typography>
                </Box>
              </Box>

              <CardContent sx={{ p: 3 }}>
                <Box sx={{ mb: 3 }}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Số dư hiện tại
                  </Typography>
                  <Typography variant="h4" color="primary" sx={{ fontWeight: 'bold' }}>
                    {formatCurrency(wallet.balance)}
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Tổng số tiền đã nạp
                  </Typography>
                  <Typography variant="h6" color="text.primary">
                    {formatCurrency(wallet.totalDeposited)}
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2, pt: 2, borderTop: 1, borderColor: 'divider' }}>
                  <IconButton
                    color="primary"
                    onClick={() => handleOpenDialog(wallet)}
                    sx={{
                      mr: 1,
                      '&:hover': { backgroundColor: 'rgba(33, 150, 243, 0.1)' }
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDeleteWallet(wallet.id)}
                    sx={{ '&:hover': { backgroundColor: 'rgba(211, 47, 47, 0.1)' } }}
                  >
                    <DeleteIcon />
                  </IconButton>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={() => handleOpenAddMoneyDialog(wallet.id)}
                    sx={{ ml: 1 }}
                  >
                    Thêm tiền
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        PaperProps={{
          sx: {
            borderRadius: 2,
            boxShadow: 24,
          }
        }}
      >
        <DialogTitle sx={{
          background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
          color: 'white',
          mb: 2
        }}>
          {editingWallet ? "Chỉnh Sửa Ví" : "Thêm Ví Mới"}
        </DialogTitle>
        <DialogContent>
          <TextField
              autoFocus
              margin="dense"
              label="Tên Ví"
              fullWidth
              value={newWallet.name}
              onChange={(e) => setNewWallet({ ...newWallet, name: e.target.value })}
              sx={{ mb: 2 }}
          />
          <TextField
              margin="dense"
              label="Số Tiền"
              fullWidth
              value={newWallet.balance}
              onChange={(e) => {
                const value = e.target.value.replace(/[^0-9]/g, '');
                setNewWallet({ ...newWallet, balance: value });
              }}
              type="text"
              inputProps={{
                inputMode: 'numeric',
                pattern: '[0-9]*'
              }}
              sx={{ mb: 2 }}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Chọn Icon</InputLabel>
            <Select
                value={newWallet.icon}
                onChange={(e) => setNewWallet({ ...newWallet, icon: e.target.value })}
            >
              {icons.map((icon) => (
                  <MenuItem key={icon.value} value={icon.value}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      {icon.icon}
                      <Typography sx={{ ml: 1 }}>{icon.label}</Typography>
                    </Box>
                  </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
              margin="dense"
              label="Mô Tả"
              fullWidth
              value={newWallet.description}
              onChange={(e) => setNewWallet({ ...newWallet, description: e.target.value })}
              sx={{ mb: 2 }}
          />
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 2 }}>
          <Button
            onClick={handleCloseDialog}
            sx={{
              color: 'text.secondary',
              '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' }
            }}
          >
            Hủy
          </Button>
          <Button
            onClick={handleSaveWallet}
            variant="contained"
            sx={{
              background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
              boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
              '&:hover': {
                background: 'linear-gradient(45deg, #1976D2 30%, #21CBF3 90%)',
              }
            }}
          >
            {editingWallet ? "Cập Nhật" : "Thêm"}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openAddMoneyDialog} onClose={handleCloseAddMoneyDialog}>
        <DialogTitle>Thêm tiền vào ví</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Số tiền"
            type="number"
            fullWidth
            value={addMoneyData.amount}
            onChange={(e) => setAddMoneyData({ ...addMoneyData, amount: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Ghi chú"
            type="text"
            fullWidth
            multiline
            rows={3}
            value={addMoneyData.note}
            onChange={(e) => setAddMoneyData({ ...addMoneyData, note: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddMoneyDialog}>Hủy</Button>
          <Button onClick={handleAddMoney} variant="contained" color="primary">
            Thêm tiền
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Wallets;
