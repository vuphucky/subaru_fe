import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={() => navigate('/')}
        >
          <AccountBalanceWalletIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Ví Điện Tử Tài Xỉu
        </Typography>
        <Button color="inherit" onClick={() => navigate('/dashboard')}>
          Tổng Quan
        </Button>
        <Button color="inherit" onClick={() => navigate('/wallets')}>
          Quản Lý Ví
        </Button>
        <Button color="inherit" onClick={() => navigate('/transactions')}>
          Giao Dịch
        </Button>
        <Button color="inherit" onClick={() => navigate('/budget')}>
          Ngân Sách
        </Button>
        <Button color="inherit" onClick={() => navigate('/profile')}>
          Tài Khoản
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
