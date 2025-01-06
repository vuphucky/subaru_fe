import React from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
} from '@mui/material';
import {
  Security,
  Update,
} from '@mui/icons-material';

const Privacy = () => {
  return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        {/* Header */}
        <Box sx={{ mb: 6, textAlign: 'center' }}>
          <Typography variant="h3" component="h1" gutterBottom>
            Chính Sách Bảo Mật
          </Typography>
          <Security color="primary" sx={{ fontSize: 60, mb: 2 }} />
        </Box>

        {/* Cam Kết Bảo Mật */}
        <Paper elevation={3} sx={{ p: 4, mb: 6 }}>
          <Typography variant="h4" gutterBottom>
            Cam Kết Bảo Mật Thông Tin Cá Nhân
          </Typography>
          <Typography variant="body1" paragraph>
            Tại Tài xỉu, bảo mật thông tin cá nhân và an toàn giao dịch là ưu tiên hàng đầu của chúng tôi.
            Chính sách bảo mật này nhằm minh bạch cách chúng tôi thu thập, sử dụng và bảo vệ dữ liệu cá nhân của bạn.
          </Typography>
          <Typography variant="body1" paragraph>
            Bằng việc sử dụng Tài Xỉu, bạn hoàn toàn có thể yên tâm rằng thông tin của mình luôn được bảo vệ với các tiêu chuẩn cao nhất.
          </Typography>
        </Paper>

        {/* Cập Nhật Chính Sách */}
        <Paper elevation={3} sx={{ p: 4, mb: 6 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Update color="primary" sx={{ mr: 2, fontSize: 30 }} />
            <Typography variant="h4">
              Cập Nhật Chính Sách
            </Typography>
          </Box>
          <Typography variant="body1" paragraph>
            Chính sách bảo mật có thể thay đổi theo thời gian để phù hợp với quy định pháp luật và yêu cầu dịch vụ.
            Chúng tôi sẽ thông báo đến bạn khi có bất kỳ thay đổi quan trọng nào.
          </Typography>
        </Paper>

        {/* Kết luận */}
        <Box sx={{ textAlign: 'center', mt: 6 }}>
          <Typography variant="h5" gutterBottom>
            Bảo mật của bạn là trách nhiệm của chúng tôi
          </Typography>
          <Typography variant="body1">
            Cảm ơn bạn đã tin tưởng và sử dụng Tài Xỉu!
          </Typography>
        </Box>
      </Container>
  );
};

export default Privacy;