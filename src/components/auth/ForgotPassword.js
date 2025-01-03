import React, { useState } from 'react';
import axios from 'axios';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Link,
  Alert
} from '@mui/material';
import LockResetIcon from '@mui/icons-material/LockReset';

const validationSchema = yup.object({
  email: yup
    .string()
    .required('Email là bắt buộc')
    .email('Email không hợp lệ')
});

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await validationSchema.validate({ email }, { abortEarly: false });
      
      const response = await axios.post('http://localhost:8080/api/auth/reset-password', {
        email: email
      });
      
      toast.success('Hướng dẫn đặt lại mật khẩu đã được gửi đến email của bạn.');
      setEmail('');
    } catch (err) {
      if (err.name === 'ValidationError') {
        setError(err.message);
      } else {
        toast.error(err.response?.data || 'Không thể gửi email đặt lại mật khẩu');
      }
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #1976d2 0%, #64b5f6 100%)',
        padding: 2
      }}
    >
      <Container component="main" maxWidth="xs">
        <Paper
          elevation={6}
          sx={{
            padding: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            borderRadius: 2
          }}
        >
          <LockResetIcon sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
          <Typography component="h1" variant="h5" gutterBottom>
            Quên mật khẩu
          </Typography>

          {error && <Alert severity="error" sx={{ mb: 2, width: '100%' }}>{error}</Alert>}

          <Typography variant="body2" align="center" sx={{ mb: 3, color: 'text.secondary' }}>
            Nhập email của bạn để nhận hướng dẫn đặt lại mật khẩu
          </Typography>

          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError('');
              }}
              error={!!error}
              helperText={error}
              sx={{ mb: 3 }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{
                mb: 3,
                height: 48,
                borderRadius: 2,
                textTransform: 'none',
                fontSize: '1.1rem'
              }}
            >
              Gửi yêu cầu
            </Button>
            <Box sx={{ textAlign: 'center' }}>
              <Link href="/login" variant="body2" sx={{ textDecoration: 'none' }}>
                Quay lại đăng nhập
              </Link>
            </Box>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default ForgotPassword;
