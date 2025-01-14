import React, { useState, useEffect } from 'react';
import { Box, AppBar, Toolbar, Typography, IconButton, Avatar, Menu, MenuItem } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import authService from '../services/authService';

const MainLayout = ({ children }) => {
    const navigate = useNavigate();
    const { user, avatar, version, refetchUser } = useUser();
    const [anchorEl, setAnchorEl] = useState(null);

    useEffect(() => {
        // Nếu đã đăng nhập nhưng không có avatar, fetch lại user
        if (authService.isAuthenticated() && !avatar) {
            refetchUser();
        }
    }, [avatar, refetchUser]);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleProfile = () => {
        handleClose();
        navigate('/profile');
    };

    const handleLogout = () => {
        handleClose();
        authService.logout();
        navigate('/login');
    };

    const defaultAvatar = '/default-avatar.png'; // Đường dẫn đến ảnh avatar mặc định

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component={Link} to="/dashboard" sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}>
                        Ví Điện Tử Tài Xỉu
                    </Typography>
                    {user && (
                        <div>
                            <IconButton
                                onClick={handleMenu}
                                sx={{ padding: 0 }}
                            >
                                <Avatar
                                    key={version} 
                                    src={avatar || defaultAvatar}
                                    alt={user.username}
                                    sx={{ width: 40, height: 40 }}
                                    imgProps={{ 
                                        loading: "eager",
                                        onError: (e) => {
                                            console.error('Avatar load error:', e);
                                            e.target.src = defaultAvatar;
                                        }
                                    }}
                                />
                            </IconButton>
                            <Menu
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                            >
                                <MenuItem onClick={handleProfile}>Thông tin cá nhân</MenuItem>
                                <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
                            </Menu>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                {children}
            </Box>
        </Box>
    );
};

export default MainLayout;
