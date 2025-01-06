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
    Alert
} from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';
import axios from 'axios';
const Profile = () => {
    const [user, setUser] = useState({
        username: '',
        email: '',
        fullName: '',
        avatar: null
    });
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState({ type: '', content: '' });
    useEffect(() => {
        // Lấy thông tin user từ API
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:8080/api/users/profile', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setUser(response.data);
            } catch (error) {
                setMessage({ type: 'error', content: 'Lỗi khi tải thông tin người dùng' });
            }
        };
        fetchUserData();
    }, []);
    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };
    const handleFileChange = (e) => {
        if (e.target.files[0]) {
            setFile(e.target.files[0]);
            // Hiển thị preview
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
            const token = localStorage.getItem('token');
            const formData = new FormData();
            formData.append('fullName', user.fullName);
            formData.append('email', user.email);
            if (file) {
                formData.append('avatar', file);
            }
            await axios.put('http://localhost:8080/api/users/profile', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            setMessage({ type: 'success', content: 'Cập nhật thông tin thành công' });
            // Cập nhật thông tin user trong localStorage
            localStorage.setItem('user', JSON.stringify(user));
        } catch (error) {
            setMessage({ type: 'error', content: 'Lỗi khi cập nhật thông tin' });
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
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        sx={{ mt: 2 }}
                    >
                        Cập nhật thông tin
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};
export default Profile;