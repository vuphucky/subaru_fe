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
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

const validationSchema = yup.object({
    username: yup
        .string()
        .required('Tên đăng nhập là bắt buộc')
        .min(3, 'Tên đăng nhập phải có ít nhất 3 ký tự')
        .max(50, 'Tên đăng nhập không được vượt quá 50 ký tự'),
    password: yup
        .string()
        .required('Mật khẩu là bắt buộc')
        .min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
});

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
    const [loginError, setLoginError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const validateField = async (name, value) => {
        try {
            await yup.reach(validationSchema, name).validate(value);
            setErrors(prev => ({ ...prev, [name]: '' }));
        } catch (err) {
            setErrors(prev => ({ ...prev, [name]: err.message }));
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        setLoginError(''); // Clear login error when user types
        validateField(name, value);
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await validationSchema.validate(formData, { abortEarly: false });

            const response = await axios.post('http://localhost:8080/api/auth/login', formData);
            const { token, ...userData } = response.data;
            
            // Import authService để xử lý user data
            const authService = (await import('../../services/authService')).default;
            const processedUser = authService.processUserData(userData);
            
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(processedUser));

            toast.success('Đăng nhập thành công!');
            navigate('/dashboard');
        } catch (err) {
            if (err.name === 'ValidationError') {
                const validationErrors = {};
                err.inner.forEach(error => {
                    validationErrors[error.path] = error.message;
                });
                setErrors(validationErrors);
            } else {
                setLoginError(err.response?.data || 'Tên đăng nhập hoặc mật khẩu không đúng');
                toast.error('Đăng nhập thất bại');
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
                    <MonetizationOnIcon
                        sx={{
                            fontSize: 45,
                            color: 'primary.main',
                            mb: 3,
                            filter: 'drop-shadow(2px 2px 3px rgba(0,0,0,0.2))',
                            transition: 'transform 0.3s ease-in-out',
                            '&:hover': {
                                transform: 'scale(1.1)'
                            }
                        }}
                    />
                    <Typography
                        component="h1"
                        variant="h4"
                        gutterBottom
                        sx={{
                            fontWeight: 600,
                            background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            color: 'transparent',
                            textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
                            letterSpacing: '0.5px',
                            mb: 3,
                            textAlign: 'center',
                            width: '100%'
                        }}
                    >
                        Chào mừng bạn đến với Tài Xỉu
                    </Typography>

                    {loginError && (
                        <Alert severity="error" sx={{ mb: 2, width: '100%' }}>
                            {loginError}
                        </Alert>
                    )}

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
                            error={!!errors.username || !!loginError}
                            helperText={errors.username}
                            InputProps={{
                                sx: {
                                    '& fieldset': {
                                        borderColor: (errors.username || loginError) ? 'error.main' : undefined,
                                        borderWidth: (errors.username || loginError) ? 2 : 1,
                                    },
                                },
                            }}
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
                            autoComplete="current-password"
                            value={formData.password}
                            onChange={handleChange}
                            error={!!errors.password || !!loginError}
                            helperText={errors.password}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                                sx: {
                                    '& fieldset': {
                                        borderColor: (errors.password || loginError) ? 'error.main' : undefined,
                                        borderWidth: (errors.password || loginError) ? 2 : 1,
                                    },
                                },
                            }}
                            sx={{
                                mb: 3,
                                '& .MuiFormHelperText-root': {
                                    color: 'error.main',
                                    marginLeft: 0,
                                    marginTop: 1
                                }
                            }}
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
                            Đăng nhập
                        </Button>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Link href="/register" variant="body2" sx={{ textDecoration: 'none' }}>
                                Đăng ký tài khoản
                            </Link>
                            <Link href="/forgot-password" variant="body2" sx={{ textDecoration: 'none' }}>
                                Quên mật khẩu?
                            </Link>
                        </Box>
                    </form>
                </Paper>
            </Container>
        </Box>
    );
};

export default Login;