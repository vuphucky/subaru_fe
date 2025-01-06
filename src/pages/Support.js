import React from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
} from '@mui/material';
import {
  Support as SupportIcon,
  Language,
  Phone,
  Email,
  Chat,
  Group,
  Help,
  Security,
  Star,
  LibraryBooks,
  Update,
  BugReport,
  Warning,
  Lock,
  Diamond,
} from '@mui/icons-material';

const Support = () => {
  const supportChannels = [
    {
      icon: <Phone color="primary" />,
      title: 'Hotline',
      description: '083 997 3636 (miễn phí cước gọi)'
    },
    {
      icon: <Email color="primary" />,
      title: 'Email',
      description: 'support@taixiu.com – Phản hồi trong vòng 24 giờ'
    },
    {
      icon: <Chat color="primary" />,
      title: 'Live Chat',
      description: 'Trò chuyện trực tiếp với nhân viên tư vấn'
    },
    {
      icon: <Group color="primary" />,
      title: 'Cộng Đồng Người Dùng',
      description: 'Tham gia diễn đàn và nhóm hỗ trợ'
    }
  ];

  const helpCenterFeatures = [
    {
      icon: <LibraryBooks color="primary" />,
      title: 'Hướng Dẫn Sử Dụng',
      description: 'Bộ tài liệu và video hướng dẫn chi tiết'
    },
    {
      icon: <Help color="primary" />,
      title: 'Câu Hỏi Thường Gặp (FAQ)',
      description: 'Giải đáp nhanh các thắc mắc phổ biến'
    },
    {
      icon: <Update color="primary" />,
      title: 'Cập Nhật Mới Nhất',
      description: 'Tin tức về tính năng mới và khuyến mãi'
    }
  ];

  const technicalSupport = [
    {
      icon: <BugReport color="primary" />,
      title: 'Phát Hiện và Sửa Lỗi',
      description: 'Hỗ trợ xử lý các vấn đề kỹ thuật'
    },
    {
      icon: <Warning color="primary" />,
      title: 'Cảnh Báo An Ninh',
      description: 'Thông báo ngay lập tức hoạt động đáng ngờ'
    },
    {
      icon: <Lock color="primary" />,
      title: 'Khóa Tài Khoản Khẩn Cấp',
      description: 'Khóa tài khoản tạm thời khi cần thiết'
    }
  ];

  return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        {/* Header */}
        <Box sx={{ mb: 6, textAlign: 'center' }}>
          <Typography variant="h3" component="h1" gutterBottom>
            Hỗ Trợ Toàn Diện
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Đồng Hành Cùng Bạn Mọi Lúc Mọi Nơi
          </Typography>
        </Box>

        {/* Giới thiệu */}
        <Paper elevation={3} sx={{ p: 4, mb: 6 }}>
          <Typography variant="body1" paragraph>
            Tại Tài xỉu, sự hài lòng của bạn là ưu tiên hàng đầu. Chúng tôi luôn sẵn sàng hỗ trợ để đảm bảo mọi giao dịch của bạn diễn ra thuận lợi, an toàn và nhanh chóng.
          </Typography>
        </Paper>

        {/* Đội ngũ hỗ trợ chuyên nghiệp */}
        <Paper elevation={3} sx={{ p: 4, mb: 6 }}>
          <Typography variant="h4" gutterBottom>
            1. Đội Ngũ Hỗ Trợ Chuyên Nghiệp
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <SupportIcon color="primary" sx={{ mr: 2 }} />
                    <Typography variant="h6">
                      Trung Tâm Chăm Sóc Khách Hàng 24/7
                    </Typography>
                  </Box>
                  <Typography variant="body1">
                    Đội ngũ giàu kinh nghiệm, thân thiện, luôn sẵn sàng giải đáp mọi câu hỏi
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Language color="primary" sx={{ mr: 2 }} />
                    <Typography variant="h6">
                      Hỗ Trợ Nhiều Ngôn Ngữ
                    </Typography>
                  </Box>
                  <Typography variant="body1">
                    Phục vụ người dùng trong nước và quốc tế
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Paper>

        {/* Kênh liên lạc */}
        <Paper elevation={3} sx={{ p: 4, mb: 6 }}>
          <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
            2. Kênh Liên Lạc Linh Hoạt
          </Typography>
          <Grid container spacing={3}>
            {supportChannels.map((channel, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <Card>
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        {channel.icon}
                        <Typography variant="h6" sx={{ ml: 1 }}>
                          {channel.title}
                        </Typography>
                      </Box>
                      <Typography variant="body2">
                        {channel.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
            ))}
          </Grid>
        </Paper>

        {/* Help Center */}
        <Paper elevation={3} sx={{ p: 4, mb: 6 }}>
          <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
            3. Trung Tâm Trợ Giúp
          </Typography>
          <Grid container spacing={3}>
            {helpCenterFeatures.map((feature, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <Card>
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        {feature.icon}
                        <Typography variant="h6" sx={{ ml: 1 }}>
                          {feature.title}
                        </Typography>
                      </Box>
                      <Typography variant="body2">
                        {feature.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
            ))}
          </Grid>
        </Paper>

        {/* Technical Support */}
        <Paper elevation={3} sx={{ p: 4, mb: 6 }}>
          <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
            4. Hỗ Trợ Kỹ Thuật Nhanh Chóng
          </Typography>
          <Grid container spacing={3}>
            {technicalSupport.map((support, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <Card>
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        {support.icon}
                        <Typography variant="h6" sx={{ ml: 1 }}>
                          {support.title}
                        </Typography>
                      </Box>
                      <Typography variant="body2">
                        {support.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
            ))}
          </Grid>
        </Paper>

        {/* VIP Support */}
        <Paper elevation={3} sx={{ p: 4, mb: 6 }}>
          <Typography variant="h4" gutterBottom>
            5. Chăm Sóc Đặc Biệt Cho Khách Hàng VIP
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Diamond color="primary" sx={{ mr: 2, fontSize: 40 }} />
          </Box>
          <List>
            <ListItem>
              <ListItemText primary="Đường dây hỗ trợ ưu tiên với nhân viên chuyên trách" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Dịch vụ tư vấn tài chính và quản lý ví nâng cao" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Ưu đãi độc quyền khi sử dụng các dịch vụ của đối tác liên kết" />
            </ListItem>
          </List>
        </Paper>

        {/* Call to Action */}
        <Box sx={{ textAlign: 'center', mt: 6 }}>
          <Typography variant="h5" gutterBottom>
            Cùng Bạn Vượt Qua Mọi Thách Thức
          </Typography>
          <Typography variant="body1" paragraph>
            Hãy để Tài xỉu là trợ thủ đắc lực của bạn trong mọi hành trình tài chính.
            Dù bạn ở đâu, bất kể khi nào, chúng tôi luôn đồng hành để mang đến trải nghiệm tốt nhất!
          </Typography>
        </Box>
      </Container>
  );
};

export default Support;