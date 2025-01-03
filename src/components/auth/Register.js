import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  Alert,
  InputAdornment,
  IconButton
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Tên đăng nhập là bắt buộc')
    .min(3, 'Tên đăng nhập phải có ít nhất 3 ký tự')
    .max(50, 'Tên đăng nhập không được vượt quá 50 ký tự'),
  email: yup
    .string()
    .required('Email là bắt buộc')
    .email('Email không hợp lệ'),
  password: yup
    .string()
    .required('Mật khẩu là bắt buộc')
    .min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/,
      'Mật khẩu phải chứa ít nhất 1 chữ hoa, 1 chữ thường và 1 số'
    ),
  confirmPassword: yup
    .string()
    .required('Xác nhận mật khẩu là bắt buộc')
    .oneOf([yup.ref('password')], 'Mật khẩu xác nhận không khớp')
});

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newFormData = {
      ...formData,
      [name]: value
    };
    setFormData(newFormData);
    
    // Xóa lỗi khi người dùng nhập
    setErrors(prev => ({ ...prev, [name]: '' }));
    
    // Validate field hiện tại
    try {
      validationSchema.validateSyncAt(name, newFormData);
      setErrors(prev => ({ ...prev, [name]: '' }));
    } catch (err) {
      setErrors(prev => ({ ...prev, [name]: err.message }));
    }
    
    // Validate confirmPassword khi password thay đổi
    if (name === 'password' && newFormData.confirmPassword) {
      try {
        validationSchema.validateSyncAt('confirmPassword', newFormData);
        setErrors(prev => ({ ...prev, confirmPassword: '' }));
      } catch (err) {
        setErrors(prev => ({ ...prev, confirmPassword: err.message }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await validationSchema.validate(formData, { abortEarly: false });
      
      const response = await axios.post('http://localhost:8080/api/auth/register', {
        username: formData.username,
        email: formData.email,
        password: formData.password
      });
      
      toast.success('Đăng ký thành công! Vui lòng đăng nhập.');
      navigate('/login');
    } catch (err) {
      if (err.name === 'ValidationError') {
        const validationErrors = {};
        err.inner.forEach(error => {
          validationErrors[error.path] = error.message;
        });
        setErrors(validationErrors);
      } else {
        toast.error(err.response?.data || 'Đăng ký thất bại');
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
          <PersonAddIcon sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
          <Typography component="h1" variant="h5" gutterBottom>
            Đăng ký tài khoản
          </Typography>

          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Tên đăng nhập"
              name="username"
              autoComplete="username"
              autoFocus
              value={formData.username}
              onChange={handleChange}
              error={!!errors.username}
              helperText={errors.username}
              sx={{ mb: 2 }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
              sx={{ mb: 2 }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Mật khẩu"
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="new-password"
              value={formData.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 2 }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Xác nhận mật khẩu"
              type={showConfirmPassword ? 'text' : 'password'}
              id="confirmPassword"
              autoComplete="new-password"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
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
              Đăng ký
            </Button>
            <Box sx={{ textAlign: 'center' }}>
              <Link 
                href="/login" 
                variant="body2" 
                sx={{ 
                  textDecoration: 'none',
                  color: 'primary.main',
                  '&:hover': {
                    color: 'primary.dark'
                  }
                }}
              >
                Đã có tài khoản? Đăng nhập
              </Link>
            </Box>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default Register;
