import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { useNavigate } from 'react-router-dom';
import AvatarMenu from './AvatarMenu';

const Header = () => {
  const navigate = useNavigate();
  const [userAvatar, setUserAvatar] = useState(null);

  useEffect(() => {
    // Lấy thông tin user từ localStorage hoặc state management
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.avatar) {
      setUserAvatar(user.avatar);
    }
  }, []);

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={() => navigate('/dashboard')}
        >
          <AccountBalanceWalletIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Ví Điện Tử Tài Xỉu
        </Typography>
        <Button color="inherit" onClick={() => navigate('/dashboard')}>
          Trang chủ
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
        <AvatarMenu userAvatar={userAvatar} />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
