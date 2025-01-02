import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
  Divider,
} from '@mui/material';
import {
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
  Phone,
  Email,
  LocationOn,
  Google,
} from '@mui/icons-material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'primary.main',
        color: 'white',
        py: 6,
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Thông tin công ty */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Ví Điện Tử Tài Xỉu
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Giải pháp quản lý tài chính thông minh cho cuộc sống hiện đại
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton color="inherit" aria-label="Facebook">
                <Facebook />
              </IconButton>
              <IconButton color="inherit" aria-label="Twitter">
                <Twitter />
              </IconButton>
              <IconButton color="inherit" aria-label="Instagram">
                <Instagram />
              </IconButton>
              <IconButton color="inherit" aria-label="LinkedIn">
                <LinkedIn />
              </IconButton>
              <IconButton color="inherit" aria-label="Google">
                <Google />
              </IconButton>
            </Box>
          </Grid>

          {/* Liên kết nhanh */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Liên Kết Nhanh
            </Typography>
            <Link href="/about" color="inherit" display="block" sx={{ mb: 1 }}>
              Về Chúng Tôi
            </Link>
            <Link href="/features" color="inherit" display="block" sx={{ mb: 1 }}>
              Tính Năng
            </Link>
            <Link href="/support" color="inherit" display="block" sx={{ mb: 1 }}>
              Hỗ Trợ
            </Link>
            <Link href="/privacy" color="inherit" display="block" sx={{ mb: 1 }}>
              Chính Sách Bảo Mật
            </Link>
            <Link href="/terms" color="inherit" display="block" sx={{ mb: 1 }}>
              Điều Khoản Sử Dụng
            </Link>
          </Grid>

          {/* Thông tin liên hệ */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Liên Hệ
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <LocationOn sx={{ mr: 1 }} />
              <Typography variant="body2">
                Nhà số 23, Lô TT-01, Khu đô thị MonCity, P. Hàm Nghi, Hanoi
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Phone sx={{ mr: 1 }} />
              <Typography variant="body2">
                083 997 3636
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Email sx={{ mr: 1 }} />
              <Typography variant="body2">
                support@taixiu.com
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3, bgcolor: 'rgba(255, 255, 255, 0.2)' }} />

        {/* Copyright */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body2">
            {new Date().getFullYear()} Ví Điện Tử Tài Xỉu. Tất cả quyền được bảo lưu.
          </Typography>
          <Box>
            <Link href="/terms" color="inherit" sx={{ mx: 1 }}>
              Điều Khoản Sử Dụng
            </Link>
            <Link href="/privacy" color="inherit" sx={{ mx: 1 }}>
              Chính Sách Bảo Mật
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
