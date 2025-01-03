import React, { useState, useEffect, useRef } from 'react';
import {
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
  Box,
  Typography,
  Paper,
  Popper,
  Grow,
  ClickAwayListener,
  MenuList
} from '@mui/material';
import { 
  Logout, 
  AccountCircle,
  Lock
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const AvatarMenu = ({ userAvatar }) => {
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState('');
  const anchorRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.username) {
      setUsername(user.username);
    }
  }, []);

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const handleListKeyDown = (event) => {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
    setOpen(false);
  };

  const handleProfile = () => {
    navigate('/profile');
    setOpen(false);
  };

  const handleChangePassword = () => {
    navigate('/change-password');
    setOpen(false);
  };

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: 1,
        mr: 2,
      }}
      onMouseEnter={() => setOpen(true)}
      ref={anchorRef}
    >
      <Avatar 
        sx={{ 
          width: 35, 
          height: 35,
          border: '2px solid white',
          transition: 'border 0.2s ease',
          cursor: 'pointer',
          '&:hover': {
            border: '2px solid #90caf9'
          }
        }}
        src={userAvatar || '/default-avatar.png'} 
      >
        {username ? username[0].toUpperCase() : 'U'}
      </Avatar>
      <Typography 
        className="username"
        sx={{ 
          color: 'white',
          fontSize: '0.9rem',
          fontWeight: 500,
          display: { xs: 'none', sm: 'block' },
          maxWidth: '120px',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap'
        }}
      >
        {username}
      </Typography>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom-end"
        transition
        disablePortal
        style={{ zIndex: 1300 }}
      >
        {({ TransitionProps }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin: 'right top'
            }}
          >
            <Paper
              elevation={3}
              onMouseLeave={() => setOpen(false)}
              sx={{
                mt: 1,
                '&:before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                }
              }}
            >
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="composition-menu"
                  aria-labelledby="composition-button"
                  onKeyDown={handleListKeyDown}
                >
                  <MenuItem onClick={handleProfile}>
                    <ListItemIcon>
                      <AccountCircle fontSize="small" />
                    </ListItemIcon>
                    Thông tin cá nhân
                  </MenuItem>
                  <MenuItem onClick={handleChangePassword}>
                    <ListItemIcon>
                      <Lock fontSize="small" />
                    </ListItemIcon>
                    Đổi mật khẩu
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                      <Logout fontSize="small" />
                    </ListItemIcon>
                    Đăng xuất
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </Box>
  );
};

export default AvatarMenu;
