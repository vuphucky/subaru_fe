import React, { useState, useEffect } from 'react';
import {
    Container,
    Paper,
    Typography,
    TextField,
    Button,
    Avatar,
    Box,
    IconButton,
    Alert,
    CircularProgress,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Stack
} from '@mui/material';
import { PhotoCamera, Edit, Cancel, Save } from '@mui/icons-material';
import { updateProfile } from '../services/userService';
import { useUser } from '../contexts/UserContext';

const Profile = () => {
    const { user, avatar, updateUser, updateAvatar, loading } = useUser();
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState({ type: '', content: '' });
    const [previewUrl, setPreviewUrl] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
    const [editedData, setEditedData] = useState({
        email: '',
        fullName: ''
    });

    useEffect(() => {
        setPreviewUrl(avatar);
        setEditedData({
            email: user?.email || '',
            fullName: user?.fullName || ''
        });
    }, [avatar, user]);

    const handleStartEdit = () => {
        setIsEditing(true);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setFile(null);
        setPreviewUrl(avatar);
        setEditedData({
            email: user?.email || '',
            fullName: user?.fullName || ''
        });
        setMessage({ type: '', content: '' });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        if (e.target.files[0]) {
            const selectedFile = e.target.files[0];
            setFile(selectedFile);
            
            const reader = new FileReader();
            reader.onloadend = () => {
                const previewURL = reader.result;
                setPreviewUrl(previewURL);
                updateAvatar(previewURL);
            };
            reader.readAsDataURL(selectedFile);
        }
    };

    const handleSubmitClick = () => {
        if (!file && editedData.email === user?.email && editedData.fullName === user?.fullName) {
            setMessage({ type: 'warning', content: 'Không có thông tin nào được thay đổi' });
            return;
        }
        setConfirmDialogOpen(true);
    };

    const handleConfirmSubmit = async () => {
        setConfirmDialogOpen(false);
        const oldAvatar = avatar;
        setIsSubmitting(true);
        
        try {
            const formData = new FormData();
            formData.append('fullName', editedData.fullName);
            formData.append('email', editedData.email);
            if (file) {
                formData.append('avatar', file);
            }

            const updatedUser = await updateProfile(formData);
            updateUser(updatedUser);
            setMessage({ type: 'success', content: 'Cập nhật thông tin thành công' });
            setFile(null);
            setIsEditing(false);

            // Đợi 1 giây để hiển thị thông báo thành công, sau đó refresh trang
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } catch (error) {
            console.error('Error updating profile:', error);
            setMessage({ type: 'error', content: 'Lỗi khi cập nhật thông tin: ' + error });
            if (oldAvatar) {
                setPreviewUrl(oldAvatar);
                updateAvatar(oldAvatar);
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) {
        return (
            <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
                <CircularProgress />
            </Container>
        );
    }

    return (
        <Container maxWidth="sm" sx={{ mt: 4 }}>
            <Paper elevation={3} sx={{ p: 4 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Typography variant="h5">
                        Thông tin cá nhân
                    </Typography>
                    {!isEditing && (
                        <Button
                            startIcon={<Edit />}
                            variant="contained"
                            onClick={handleStartEdit}
                        >
                            Chỉnh sửa
                        </Button>
                    )}
                </Box>

                {message.content && (
                    <Alert severity={message.type} sx={{ mb: 2 }}>
                        {message.content}
                    </Alert>
                )}

                <Box
                    component="form"
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 2
                    }}
                >
                    <Box sx={{ position: 'relative' }}>
                        <Avatar
                            src={previewUrl}
                            alt={user?.username}
                            sx={{ width: 100, height: 100, mb: 2 }}
                            imgProps={{ 
                                loading: "eager",
                                onError: (e) => {
                                    console.error('Avatar load error:', e);
                                    e.target.src = '/default-avatar.png';
                                }
                            }}
                        />
                        {isEditing && (
                            <>
                                <input
                                    accept="image/*"
                                    type="file"
                                    id="avatar-upload"
                                    onChange={handleFileChange}
                                    style={{ display: 'none' }}
                                />
                                <label htmlFor="avatar-upload">
                                    <IconButton
                                        color="primary"
                                        component="span"
                                        sx={{
                                            position: 'absolute',
                                            bottom: 16,
                                            right: -8,
                                            backgroundColor: 'white'
                                        }}
                                        disabled={isSubmitting}
                                    >
                                        <PhotoCamera />
                                    </IconButton>
                                </label>
                            </>
                        )}
                    </Box>

                    <TextField
                        fullWidth
                        label="Tên đăng nhập"
                        name="username"
                        value={user?.username || ''}
                        disabled
                    />
                    <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        value={isEditing ? editedData.email : user?.email || ''}
                        onChange={handleChange}
                        disabled={!isEditing || isSubmitting}
                    />
                    <TextField
                        fullWidth
                        label="Họ và tên"
                        name="fullName"
                        value={isEditing ? editedData.fullName : user?.fullName || ''}
                        onChange={handleChange}
                        disabled={!isEditing || isSubmitting}
                    />

                    {isEditing && (
                        <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                            <Button
                                variant="outlined"
                                startIcon={<Cancel />}
                                onClick={handleCancelEdit}
                                disabled={isSubmitting}
                            >
                                Hủy
                            </Button>
                            <Button
                                variant="contained"
                                startIcon={<Save />}
                                onClick={handleSubmitClick}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? <CircularProgress size={24} /> : 'Lưu thay đổi'}
                            </Button>
                        </Stack>
                    )}
                </Box>
            </Paper>

            <Dialog
                open={confirmDialogOpen}
                onClose={() => setConfirmDialogOpen(false)}
            >
                <DialogTitle>
                    Xác nhận thay đổi
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Bạn có chắc chắn muốn cập nhật thông tin cá nhân?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setConfirmDialogOpen(false)}>
                        Hủy
                    </Button>
                    <Button onClick={handleConfirmSubmit} variant="contained" autoFocus>
                        Xác nhận
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default Profile;