import React, { useState, useEffect } from 'react';
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Select,
  message,
  Popconfirm,
  InputNumber,
  Card,
  Typography,
  Space,
  Tag,
  Statistic,
  Row,
  Col
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  WalletOutlined
} from '@ant-design/icons';
import axios from 'axios';

const { Option } = Select;
const { Title } = Typography;

const Expense = () => {
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState(null);
  const [totalExpense, setTotalExpense] = useState(0);

  // Fetch expenses and categories
  const fetchExpenses = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/expenses');
      setExpenses(response.data);
      // Tính tổng chi tiêu
      const total = response.data.reduce((sum, expense) => sum + expense.amount, 0);
      setTotalExpense(total);
    } catch (error) {
      message.error('Không thể tải danh sách giao dịch');
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/expense-categories');
      setCategories(response.data);
    } catch (error) {
      message.error('Không thể tải danh sách danh mục');
    }
  };

  useEffect(() => {
    fetchExpenses();
    fetchCategories();
  }, []);

  // Handle form submission
  const handleSubmit = async (values) => {
    try {
      if (editingId) {
        await axios.put(`http://localhost:8080/api/expenses/${editingId}`, {
          ...values,
          category: { id: values.categoryId }
        });
        message.success('Cập nhật giao dịch thành công');
      } else {
        await axios.post('http://localhost:8080/api/expenses', {
          ...values,
          category: { id: values.categoryId }
        });
        message.success('Thêm giao dịch thành công');
      }
      setIsModalVisible(false);
      form.resetFields();
      setEditingId(null);
      fetchExpenses();
    } catch (error) {
      message.error('Có lỗi xảy ra');
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/expenses/${id}`);
      message.success('Xóa giao dịch thành công');
      fetchExpenses();
    } catch (error) {
      message.error('Có lỗi xảy ra khi xóa');
    }
  };

  // Handle edit
  const handleEdit = (record) => {
    setEditingId(record.id);
    form.setFieldsValue({
      amount: record.amount,
      categoryId: record.category.id,
      wallet: record.wallet,
      note: record.note
    });
    setIsModalVisible(true);
  };

  const columns = [
    {
      title: 'Số tiền',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount) => (
          <span style={{ color: '#ff4d4f', fontWeight: 'bold' }}>
                    {amount.toLocaleString()} VND
                </span>
      ),
      sorter: (a, b) => a.amount - b.amount
    },
    {
      title: 'Danh mục',
      dataIndex: ['category', 'name'],
      key: 'category',
      render: (text) => <Tag color="blue">{text}</Tag>,
      filters: categories.map(cat => ({
        text: cat.name,
        value: cat.name
      })),
      onFilter: (value, record) => record.category.name === value
    },
    {
      title: 'Ví',
      dataIndex: 'wallet',
      key: 'wallet',
      render: (text) => (
          <Space>
            <WalletOutlined />
            {text}
          </Space>
      )
    },
    {
      title: 'Ghi chú',
      dataIndex: 'note',
      key: 'note',
      ellipsis: true
    },
    {
      title: 'Thời gian',
      dataIndex: 'timestamp',
      key: 'timestamp',
      render: (timestamp) => new Date(timestamp).toLocaleString(),
      sorter: (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
    },
    {
      title: 'Thao tác',
      key: 'action',
      width: '150px',
      render: (_, record) => (
          <Space>
            <Button
                type="primary"
                icon={<EditOutlined />}
                onClick={() => handleEdit(record)}
                size="small"
            >
              Sửa
            </Button>
            <Popconfirm
                title="Xóa giao dịch này?"
                description="Bạn có chắc chắn muốn xóa giao dịch này không?"
                onConfirm={() => handleDelete(record.id)}
                okText="Có"
                cancelText="Không"
            >
              <Button
                  type="primary"
                  danger
                  icon={<DeleteOutlined />}
                  size="small"
              >
                Xóa
              </Button>
            </Popconfirm>
          </Space>
      )
    }
  ];

  return (
      <div style={{ padding: '24px' }}>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Card>
              <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <Title level={3} style={{ margin: 0 }}>Quản lý Chi tiêu</Title>
                  <Statistic
                      title="Tổng chi tiêu"
                      value={totalExpense}
                      suffix="VND"
                      valueStyle={{ color: '#cf1322' }}
                  />
                </div>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => {
                      setIsModalVisible(true);
                      setEditingId(null);
                      form.resetFields();
                    }}
                >
                  Thêm khoản chi
                </Button>
              </div>

              <Table
                  columns={columns}
                  dataSource={expenses}
                  rowKey="id"
                  pagination={{
                    pageSize: 10,
                    showTotal: (total) => `Tổng số ${total} giao dịch`
                  }}
              />
            </Card>
          </Col>
        </Row>

        <Modal
            title={editingId ? "Sửa khoản chi" : "Thêm khoản chi mới"}
            open={isModalVisible}
            onCancel={() => {
              setIsModalVisible(false);
              form.resetFields();
              setEditingId(null);
            }}
            footer={null}
            destroyOnClose
        >
          <Form
              form={form}
              onFinish={handleSubmit}
              layout="vertical"
              initialValues={{ amount: 0, categoryId: undefined, wallet: '', note: '' }}
          >
            <Form.Item
                name="amount"
                label="Số tiền"
                rules={[
                  { required: true, message: 'Vui lòng nhập số tiền' },
                  { type: 'number', min: 0, message: 'Số tiền không được âm' }
                ]}
            >
              <InputNumber
                  style={{ width: '100%' }}
                  formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={value => value.replace(/\$\s?|(,*)/g, '')}
                  placeholder="Nhập số tiền"
              />
            </Form.Item>

            <Form.Item
                name="categoryId"
                label="Danh mục"
                rules={[{ required: true, message: 'Vui lòng chọn danh mục' }]}
            >
              <Select placeholder="Chọn danh mục">
                {categories.map(category => (
                    <Option key={category.id} value={category.id}>
                      {category.name}
                    </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
                name="wallet"
                label="Ví"
                rules={[{ required: true, message: 'Vui lòng nhập tên ví' }]}
            >
              <Input
                  prefix={<WalletOutlined />}
                  placeholder="Nhập tên ví"
              />
            </Form.Item>

            <Form.Item
                name="note"
                label="Ghi chú"
            >
              <Input.TextArea
                  placeholder="Nhập ghi chú cho khoản chi"
                  rows={4}
              />
            </Form.Item>

            <Form.Item style={{ marginBottom: 0, textAlign: 'right' }}>
              <Space>
                <Button onClick={() => {
                  setIsModalVisible(false);
                  form.resetFields();
                }}>
                  Hủy
                </Button>
                <Button type="primary" htmlType="submit">
                  {editingId ? 'Cập nhật' : 'Thêm mới'}
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Modal>
      </div>
  );
};

export default Expense;
