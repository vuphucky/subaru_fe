import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
  IconButton,
  InputAdornment
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import axios from 'axios';

const ChangePassword = () => {
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPasswords, setShowPasswords] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false
  });
  const [message, setMessage] = useState({ type: '', content: '' });

  const handleChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords({
      ...showPasswords,
      [field]: !showPasswords[field]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kiểm tra mật khẩu mới và xác nhận mật khẩu
    if (passwords.newPassword !== passwords.confirmPassword) {
      setMessage({
        type: 'error',
        content: 'Mật khẩu mới và xác nhận mật khẩu không khớp'
      });
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'http://localhost:8080/api/auth/change-password',
        {
          currentPassword: passwords.currentPassword,
          newPassword: passwords.newPassword
        },
        {
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      setMessage({
        type: 'success',
        content: 'Đổi mật khẩu thành công'
      });
      // Reset form
      setPasswords({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (error) {
      setMessage({
        type: 'error',
        content: error.response?.data || 'Lỗi khi đổi mật khẩu. Vui lòng kiểm tra lại mật khẩu hiện tại.'
      });
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom align="center">
          Đổi mật khẩu
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
            gap: 2
          }}
        >
          <TextField
            fullWidth
            type={showPasswords.currentPassword ? 'text' : 'password'}
            label="Mật khẩu hiện tại"
            name="currentPassword"
            value={passwords.currentPassword}
            onChange={handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => togglePasswordVisibility('currentPassword')}
                    edge="end"
                  >
                    {showPasswords.currentPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />

          <TextField
            fullWidth
            type={showPasswords.newPassword ? 'text' : 'password'}
            label="Mật khẩu mới"
            name="newPassword"
            value={passwords.newPassword}
            onChange={handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => togglePasswordVisibility('newPassword')}
                    edge="end"
                  >
                    {showPasswords.newPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />

          <TextField
            fullWidth
            type={showPasswords.confirmPassword ? 'text' : 'password'}
            label="Xác nhận mật khẩu mới"
            name="confirmPassword"
            value={passwords.confirmPassword}
            onChange={handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => togglePasswordVisibility('confirmPassword')}
                    edge="end"
                  >
                    {showPasswords.confirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Đổi mật khẩu
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default ChangePassword;
