import React, { useState, useEffect } from 'react';
import {
    Table,
    Button,
    Modal,
    Form,
    Input,
    message,
    Popconfirm,
    Card,
    Typography,
    Space,
    Tag
} from 'antd';
import {
    PlusOutlined,
    EditOutlined,
    DeleteOutlined
} from '@ant-design/icons';
import axios from 'axios';

const { Title } = Typography;

const Category = () => {
    const [categories, setCategories] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
    const [editingId, setEditingId] = useState(null);

    // Fetch categories
    const fetchCategories = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/expense-categories');
            setCategories(response.data);
        } catch (error) {
            message.error('Không thể tải danh sách danh mục');
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    // Handle form submission
    const handleSubmit = async (values) => {
        try {
            if (editingId) {
                await axios.put(`http://localhost:8080/api/expense-categories/${editingId}`, values);
                message.success('Cập nhật danh mục thành công');
            } else {
                await axios.post('http://localhost:8080/api/expense-categories', values);
                message.success('Thêm danh mục thành công');
            }
            setIsModalVisible(false);
            form.resetFields();
            setEditingId(null);
            fetchCategories();
        } catch (error) {
            message.error('Có lỗi xảy ra');
        }
    };

    // Handle delete
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/expense-categories/${id}`);
            message.success('Xóa danh mục thành công');
            fetchCategories();
        } catch (error) {
            message.error('Có lỗi xảy ra khi xóa');
        }
    };

    // Handle edit
    const handleEdit = (record) => {
        setEditingId(record.id);
        form.setFieldsValue({
            name: record.name,
            description: record.description
        });
        setIsModalVisible(true);
    };

    const columns = [
        {
            title: 'Tên danh mục',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <Tag color="blue">{text}</Tag>
        },
        {
            title: 'Mô tả',
            dataIndex: 'description',
            key: 'description',
            ellipsis: true
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
                        title="Xóa danh mục này?"
                        description="Bạn có chắc chắn muốn xóa danh mục này không?"
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
            <Card>
                <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Title level={3} style={{ margin: 0 }}>Quản lý Danh mục Chi tiêu</Title>
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={() => {
                            setIsModalVisible(true);
                            setEditingId(null);
                            form.resetFields();
                        }}
                    >
                        Thêm danh mục
                    </Button>
                </div>

                <Table
                    columns={columns}
                    dataSource={categories}
                    rowKey="id"
                    pagination={{
                        pageSize: 10,
                        showTotal: (total) => `Tổng số ${total} danh mục`
                    }}
                />
            </Card>

            <Modal
                title={editingId ? "Sửa danh mục" : "Thêm danh mục mới"}
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
                    initialValues={{ name: '', description: '' }}
                >
                    <Form.Item
                        name="name"
                        label="Tên danh mục"
                        rules={[
                            { required: true, message: 'Vui lòng nhập tên danh mục' },
                            { max: 50, message: 'Tên danh mục không được quá 50 ký tự' }
                        ]}
                    >
                        <Input placeholder="Nhập tên danh mục" />
                    </Form.Item>

                    <Form.Item
                        name="description"
                        label="Mô tả"
                        rules={[
                            { max: 200, message: 'Mô tả không được quá 200 ký tự' }
                        ]}
                    >
                        <Input.TextArea
                            placeholder="Nhập mô tả cho danh mục"
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

export default Category;
