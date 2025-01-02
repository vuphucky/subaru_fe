import React from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import {
  Security,
  Speed,
  Devices,
  Diversity3,
  Person,
  AutoGraph,
  PublicOutlined,
} from '@mui/icons-material';

const About = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      {/* Phần giới thiệu */}
      <Box sx={{ mb: 6, textAlign: 'center' }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Về Chúng Tôi
        </Typography>
        <Typography variant="h5" color="text.secondary" sx={{ mb: 4 }}>
          Chào mừng bạn đến với Tài Xỉu – Nền tảng kiểm soát chi tiêu trực tuyến.
        </Typography>
      </Box>

      {/* Sứ mệnh */}
      <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Sứ Mệnh Của Chúng Tôi
        </Typography>
        <Typography variant="body1">
          Tại Tài xỉu, chúng tôi cam kết mang đến giải pháp thanh toán hiện đại, đơn giản hóa cuộc sống tài chính của bạn. 
          Chúng tôi tin rằng công nghệ có thể tạo nên sự khác biệt, giúp mọi giao dịch trở nên dễ dàng, nhanh chóng và đáng tin cậy.
        </Typography>
      </Paper>

      {/* Chúng tôi là ai */}
      <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Chúng Tôi Là Ai?
        </Typography>
        <Typography variant="body1">
          Tài Xỉu là sản phẩm của đội ngũ chuyên gia giàu kinh nghiệm trong lĩnh vực công nghệ tài chính (Fintech). 
          Với tầm nhìn xây dựng một hệ sinh thái tài chính số hóa, chúng tôi không ngừng nỗ lực để mang đến trải nghiệm người dùng tốt nhất.
        </Typography>
      </Paper>

      {/* Tại sao chọn chúng tôi */}
      <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Tại Sao Chọn Chúng Tôi?
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <List>
              <ListItem>
                <ListItemIcon>
                  <Security color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="An Toàn và Bảo Mật" 
                  secondary="Mọi giao dịch được mã hóa với các tiêu chuẩn bảo mật cao nhất" 
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Speed color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="Nhanh Chóng và Tiện Lợi" 
                  secondary="Thanh toán chỉ với vài cú chạm" 
                />
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={12} md={6}>
            <List>
              <ListItem>
                <ListItemIcon>
                  <Devices color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="Hỗ Trợ Đa Nền Tảng" 
                  secondary="Hoạt động mượt mà trên cả Android và iOS" 
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Diversity3 color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="Hệ Sinh Thái Đa Dạng" 
                  secondary="Hợp tác với hàng nghìn đối tác" 
                />
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </Paper>

      {/* Giá trị cốt lõi */}
      <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Giá Trị Cốt Lõi
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: 'center', p: 2 }}>
              <Person color="primary" sx={{ fontSize: 40, mb: 2 }} />
              <Typography variant="h6">Khách Hàng Là Trung Tâm</Typography>
              <Typography variant="body2">
                Chúng tôi luôn lắng nghe và cải tiến để đáp ứng nhu cầu của bạn
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: 'center', p: 2 }}>
              <AutoGraph color="primary" sx={{ fontSize: 40, mb: 2 }} />
              <Typography variant="h6">Đổi Mới Không Ngừng</Typography>
              <Typography variant="body2">
                Công nghệ luôn tiến hóa, và chúng tôi cũng vậy
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: 'center', p: 2 }}>
              <PublicOutlined color="primary" sx={{ fontSize: 40, mb: 2 }} />
              <Typography variant="h6">Trách Nhiệm Xã Hội</Typography>
              <Typography variant="body2">
                Mang lại giá trị bền vững cho người dùng và cộng đồng
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Hành trình */}
      <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Hành Trình Của Chúng Tôi
        </Typography>
        <Typography variant="body1">
          Kể từ khi ra mắt, tài xỉu đã trở thành lựa chọn hàng đầu cho hàng triệu người dùng trên khắp cả nước. 
          Chúng tôi tự hào góp phần xây dựng nền kinh tế không tiền mặt, thúc đẩy sự phát triển bền vững.
        </Typography>
      </Paper>

      <Divider sx={{ my: 4 }} />

      {/* Thông tin liên hệ */}
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Liên Hệ Với Chúng Tôi
        </Typography>
        <Typography variant="body1">
          Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Typography variant="body1">Email: support@taixiu.com</Typography>
          <Typography variant="body1">Hotline: 083 997 3636</Typography>
          <Typography variant="body1">
            Địa chỉ: Nhà số 23, Lô TT-01, Khu đô thị MonCity, P. Hàm Nghi, Hanoi
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default About;
