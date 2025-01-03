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
            Trang chủ
          </Button>
          <Button color="inherit" onClick={() => navigate('/wallets')}>
            Quản Lý Ví
          </Button>
          <Button color="inherit" onClick={() => navigate('/expense')}>
            Khoản Chi
          </Button>
          <Button color="inherit" onClick={() => navigate('/category')}>
            Danh Mục
          </Button>
          <Button color="inherit" onClick={() => navigate('/profile')}>
            Tài Khoản
          </Button>
        </Toolbar>
      </AppBar>
  );
};

export default Header;
