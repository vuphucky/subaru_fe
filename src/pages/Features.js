import React from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  CategoryOutlined,
  AccountBalanceWalletOutlined,
  ShowChartOutlined,
  TipsAndUpdatesOutlined,
  CurrencyExchangeOutlined,
  GroupsOutlined,
  UpdateOutlined,
} from '@mui/icons-material';

const Features = () => {
  const smartSpendingFeatures = [
    {
      icon: <CategoryOutlined color="primary" />,
      title: 'Phân Loại Giao Dịch Tự Động',
      description: 'Mọi giao dịch được tự động phân loại (mua sắm, ăn uống, giải trí, hóa đơn,...) giúp bạn theo dõi chi tiêu chi tiết.'
    },
    {
      icon: <AccountBalanceWalletOutlined color="primary" />,
      title: 'Lập Ngân Sách Hàng Tháng',
      description: 'Đặt hạn mức cho từng hạng mục chi tiêu, nhận cảnh báo nếu bạn gần đạt hoặc vượt quá ngân sách.'
    },
    {
      icon: <ShowChartOutlined color="primary" />,
      title: 'Báo Cáo Chi Tiêu Theo Thời Gian Thực',
      description: 'Các biểu đồ trực quan và báo cáo giúp bạn thấy được thói quen chi tiêu của mình.'
    },
    {
      icon: <TipsAndUpdatesOutlined color="primary" />,
      title: 'Tính Năng Gợi Ý Tiết Kiệm',
      description: 'Đề xuất những cách cắt giảm chi phí hoặc tiết kiệm hiệu quả dựa trên dữ liệu chi tiêu của bạn.'
    }
  ];

  const walletManagementFeatures = [
    {
      icon: <CurrencyExchangeOutlined color="primary" />,
      title: 'Hỗ Trợ Nhiều Tiền Tệ',
      description: 'Tạo các ví cá nhân bằng các loại tiền tệ khác nhau như VNĐ, USD, EUR, JPY,... để quản lý tài chính toàn cầu.'
    },
    {
      icon: <GroupsOutlined color="primary" />,
      title: 'Ví Nhóm hoặc Gia Đình',
      description: 'Tạo ví chung để chia sẻ chi tiêu với bạn bè, người thân, hoặc đối tác.'
    },
    {
      icon: <UpdateOutlined color="primary" />,
      title: 'Chuyển Đổi Tiền Tệ Thông Minh',
      description: 'Cập nhật tỷ giá hối đoái theo thời gian thực, giúp bạn giao dịch và chuyển đổi tiền tệ nhanh chóng, chính xác.'
    }
  ];

  return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        {/* Header */}
        <Box sx={{ mb: 6, textAlign: 'center' }}>
          <Typography variant="h3" component="h1" gutterBottom>
            Tính Năng Nổi Bật
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Khám phá những tính năng độc đáo giúp bạn quản lý tài chính hiệu quả
          </Typography>
        </Box>

        {/* Kiểm Soát Chi Tiêu Thông Minh */}
        <Paper elevation={3} sx={{ p: 4, mb: 6 }}>
          <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
            1. Kiểm Soát Chi Tiêu Thông Minh
          </Typography>
          <Grid container spacing={3}>
            {smartSpendingFeatures.map((feature, index) => (
                <Grid item xs={12} md={6} key={index}>
                  <Card elevation={2}>
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        {feature.icon}
                        <Typography variant="h6" sx={{ ml: 2 }}>
                          {feature.title}
                        </Typography>
                      </Box>
                      <Typography variant="body1" color="text.secondary">
                        {feature.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
            ))}
          </Grid>
        </Paper>

        {/* Quản Lý Nhiều Loại Ví */}
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
            2. Quản Lý Nhiều Loại Ví
          </Typography>
          <Grid container spacing={3}>
            {walletManagementFeatures.map((feature, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <Card elevation={2}>
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        {feature.icon}
                        <Typography variant="h6" sx={{ ml: 2 }}>
                          {feature.title}
                        </Typography>
                      </Box>
                      <Typography variant="body1" color="text.secondary">
                        {feature.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
            ))}
          </Grid>
        </Paper>

        {/* Call to Action */}
        <Box sx={{ textAlign: 'center', mt: 6 }}>
          <Typography variant="h5" gutterBottom>
            Bắt đầu quản lý tài chính thông minh ngay hôm nay
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Tài Xỉu - Đồng hành cùng bạn trên mọi hành trình tài chính
          </Typography>
        </Box>
      </Container>
  );
};

export default Features;