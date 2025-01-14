import React, { useState, useEffect } from 'react';
import {
    Container,
    Paper,
    Typography,
    TextField,
    Button,
    Avatar,
    Box,
    IconButton,
    Alert,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions
} from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';
import { getCurrentUser, updateProfile } from '../services/userService';

const Profile = () => {
    const [user, setUser] = useState({
        username: '',
        email: '',
        fullName: '',
        avatar: null
    });
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState({ type: '', content: '' });
    const [openPasswordDialog, setOpenPasswordDialog] = useState(false);
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        try {
            const userData = await getCurrentUser();
            setUser(userData);
        } catch (error) {
            setMessage({ type: 'error', content: 'Lỗi khi tải thông tin người dùng' });
        }
    };

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handlePasswordChange = (e) => {
        setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        if (e.target.files[0]) {
            setFile(e.target.files[0]);
            const reader = new FileReader();
            reader.onloadend = () => {
                setUser({ ...user, avatar: reader.result });
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('fullName', user.fullName);
            formData.append('email', user.email);
            if (file) {
                formData.append('avatar', file);
            }

            const updatedUser = await updateProfile(formData);
            setUser(updatedUser);
            setMessage({ type: 'success', content: 'Cập nhật thông tin thành công' });
        } catch (error) {
            setMessage({ type: 'error', content: 'Lỗi khi cập nhật thông tin: ' + error });
        }
    };

    const handlePasswordSubmit = async () => {
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            setMessage({ type: 'error', content: 'Mật khẩu mới không khớp' });
            return;
        }

        try {
            await updateProfile({ password: passwordData.newPassword });
            setMessage({ type: 'success', content: 'Cập nhật mật khẩu thành công' });
            setOpenPasswordDialog(false);
            setPasswordData({
                currentPassword: '',
                newPassword: '',
                confirmPassword: ''
            });
        } catch (error) {
            setMessage({ type: 'error', content: 'Lỗi khi cập nhật mật khẩu: ' + error });
        }
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 4 }}>
            <Paper elevation={3} sx={{ p: 4 }}>
                <Typography variant="h5" gutterBottom align="center">
                    Thông tin cá nhân
                </Typography>
                {message.content && (
                    <Alert severity={message.type} sx={{ mb: 2 }}>
                        {message.content}
                    </Alert>
                )}
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 2
                    }}
                >
                    <Box sx={{ position: 'relative' }}>
                        <Avatar
                            src={user.avatar}
                            sx={{ width: 100, height: 100, mb: 2 }}
                        />
                        <IconButton
                            color="primary"
                            aria-label="upload picture"
                            component="label"
                            sx={{
                                position: 'absolute',
                                bottom: 0,
                                right: 0,
                                backgroundColor: 'white'
                            }}
                        >
                            <input
                                hidden
                                accept="image/*"
                                type="file"
                                onChange={handleFileChange}
                            />
                            <PhotoCamera />
                        </IconButton>
                    </Box>
                    <TextField
                        fullWidth
                        label="Tên đăng nhập"
                        name="username"
                        value={user.username}
                        disabled
                    />
                    <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                    />
                    <TextField
                        fullWidth
                        label="Họ và tên"
                        name="fullName"
                        value={user.fullName}
                        onChange={handleChange}
                    />
                    <Box sx={{ display: 'flex', gap: 2, width: '100%' }}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                        >
                            Cập nhật thông tin
                        </Button>
                        <Button
                            variant="outlined"
                            color="primary"
                            fullWidth
                            onClick={() => setOpenPasswordDialog(true)}
                        >
                            Đổi mật khẩu
                        </Button>
                    </Box>
                </Box>
            </Paper>

            {/* Dialog đổi mật khẩu */}
            <Dialog open={openPasswordDialog} onClose={() => setOpenPasswordDialog(false)}>
                <DialogTitle>Đổi mật khẩu</DialogTitle>
                <DialogContent>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
                        <TextField
                            fullWidth
                            type="password"
                            label="Mật khẩu hiện tại"
                            name="currentPassword"
                            value={passwordData.currentPassword}
                            onChange={handlePasswordChange}
                        />
                        <TextField
                            fullWidth
                            type="password"
                            label="Mật khẩu mới"
                            name="newPassword"
                            value={passwordData.newPassword}
                            onChange={handlePasswordChange}
                        />
                        <TextField
                            fullWidth
                            type="password"
                            label="Xác nhận mật khẩu mới"
                            name="confirmPassword"
                            value={passwordData.confirmPassword}
                            onChange={handlePasswordChange}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenPasswordDialog(false)}>Hủy</Button>
                    <Button onClick={handlePasswordSubmit} variant="contained">
                        Cập nhật
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default Profile;