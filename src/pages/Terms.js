import React from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import {
  Gavel,
  Person,
  Security,
  AccountBalance,
  Warning,
  Payment,
  Copyright,
  NoAccounts,
  Update,
} from '@mui/icons-material';

const Terms = () => {
  const sections = [
    {
      icon: <Person color="primary" />,
      title: "1. Phạm Vi Áp Dụng",
      content: "Các điều khoản này áp dụng cho tất cả người dùng của Tài xỉu, bao gồm cá nhân, tổ chức và doanh nghiệp sử dụng dịch vụ để thực hiện các giao dịch tài chính."
    },
    {
      icon: <AccountBalance color="primary" />,
      title: "2. Điều Kiện Sử Dụng Dịch Vụ",
      content: [
        "Là công dân hoặc cư dân hợp pháp tại quốc gia nơi dịch vụ được cung cấp.",
        "Đủ 18 tuổi trở lên hoặc đáp ứng độ tuổi tối thiểu theo quy định pháp luật.",
        "Cung cấp đầy đủ và chính xác thông tin cá nhân khi đăng ký tài khoản.",
        "Không sử dụng dịch vụ cho các mục đích vi phạm pháp luật, lừa đảo, hoặc gian lận."
      ]
    },
    {
      icon: <Security color="primary" />,
      title: "3. Trách Nhiệm của Người Dùng",
      content: [
        "Bảo mật tài khoản: Không chia sẻ mật khẩu, mã OTP, hoặc thông tin cá nhân với bất kỳ ai.",
        "Sử dụng hợp pháp: Không sử dụng tài khoản cho các hoạt động như rửa tiền, tài trợ khủng bố, hoặc các giao dịch bất hợp pháp khác.",
        "Cập nhật thông tin: Đảm bảo thông tin tài khoản luôn chính xác và cập nhật kịp thời khi có thay đổi.",
        "Báo cáo vấn đề: Thông báo ngay cho chúng tôi nếu bạn phát hiện hoạt động bất thường trong tài khoản."
      ]
    },
    {
      icon: <Gavel color="primary" />,
      title: "4. Quyền Hạn của Tài xỉu",
      content: [
        "Đình chỉ tài khoản: Tạm thời hoặc vĩnh viễn khóa tài khoản nếu phát hiện vi phạm điều khoản sử dụng.",
        "Kiểm tra giao dịch: Giám sát và xác minh các giao dịch để ngăn chặn gian lận hoặc hoạt động đáng ngờ.",
        "Cập nhật dịch vụ: Thay đổi, bổ sung hoặc ngừng cung cấp một phần hoặc toàn bộ dịch vụ, có thông báo trước.",
        "Chia sẻ thông tin: Cung cấp thông tin người dùng cho cơ quan có thẩm quyền khi có yêu cầu hợp pháp."
      ]
    },
    {
      icon: <Warning color="primary" />,
      title: "5. Giới Hạn Trách Nhiệm",
      content: [
        "Thiệt hại phát sinh từ việc người dùng vi phạm điều khoản sử dụng.",
        "Lỗi hoặc gián đoạn dịch vụ do các sự cố kỹ thuật ngoài tầm kiểm soát.",
        "Tổn thất tài chính liên quan đến việc người dùng không tuân thủ hướng dẫn bảo mật."
      ]
    },
    {
      icon: <Payment color="primary" />,
      title: "6. Chính Sách Phí và Giao Dịch",
      content: [
        "Phí Dịch Vụ: Một số dịch vụ có thể áp dụng phí (chuyển tiền, rút tiền, giao dịch quốc tế...). Thông tin chi tiết sẽ được công bố công khai trên ứng dụng hoặc website.",
        "Xử Lý Giao Dịch: Giao dịch không thể hoàn tác sau khi được xác nhận. Người dùng chịu trách nhiệm kiểm tra kỹ thông tin trước khi thực hiện giao dịch."
      ]
    },
    {
      icon: <Copyright color="primary" />,
      title: "7. Quyền Sở Hữu Trí Tuệ",
      content: "Tất cả nội dung, logo, thương hiệu, và phần mềm liên quan đến Tài xỉu đều thuộc quyền sở hữu trí tuệ của chúng tôi. Nghiêm cấm sao chép, sử dụng, hoặc phát tán bất kỳ nội dung nào mà không có sự đồng ý bằng văn bản."
    },
    {
      icon: <NoAccounts color="primary" />,
      title: "8. Chấm Dứt Tài Khoản",
      content: "Bạn có thể yêu cầu chấm dứt tài khoản bất kỳ lúc nào bằng cách liên hệ với bộ phận hỗ trợ khách hàng. Chúng tôi có quyền chấm dứt tài khoản nếu phát hiện các hành vi vi phạm nghiêm trọng hoặc không tuân thủ điều khoản sử dụng."
    },
    {
      icon: <Update color="primary" />,
      title: "9. Thay Đổi Điều Khoản",
      content: "Chúng tôi có thể cập nhật điều khoản sử dụng để phù hợp với pháp luật và chính sách mới. Bất kỳ thay đổi nào sẽ được thông báo đến bạn trước khi áp dụng."
    }
  ];

  return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        {/* Header */}
        <Box sx={{ mb: 6, textAlign: 'center' }}>
          <Typography variant="h3" component="h1" gutterBottom>
            Điều Khoản Sử Dụng
          </Typography>
          <Gavel color="primary" sx={{ fontSize: 60, mb: 2 }} />
        </Box>

        {/* Giới thiệu */}
        <Paper elevation={3} sx={{ p: 4, mb: 6 }}>
          <Typography variant="h5" gutterBottom>
            Giới Thiệu
          </Typography>
          <Typography variant="body1" paragraph>
            Chào mừng bạn đến với Tài xỉu. Bằng cách đăng ký và sử dụng dịch vụ của chúng tôi,
            bạn đồng ý tuân thủ các điều khoản sử dụng dưới đây. Chúng tôi khuyến khích bạn đọc kỹ
            để hiểu rõ quyền và nghĩa vụ của mình khi sử dụng dịch vụ.
          </Typography>
        </Paper>

        {/* Các section */}
        {sections.map((section, index) => (
            <Paper key={index} elevation={3} sx={{ p: 4, mb: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                {section.icon}
                <Typography variant="h5" sx={{ ml: 2 }}>
                  {section.title}
                </Typography>
              </Box>
              {Array.isArray(section.content) ? (
                  <List>
                    {section.content.map((item, i) => (
                        <ListItem key={i}>
                          <ListItemText primary={item} />
                        </ListItem>
                    ))}
                  </List>
              ) : (
                  <Typography variant="body1">
                    {section.content}
                  </Typography>
              )}
            </Paper>
        ))}
      </Container>
  );
};

export default Terms;