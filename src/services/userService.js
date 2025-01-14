import axios from 'axios';
import authService from './authService';

const API_URL = 'http://localhost:8080/api';
const BASE_URL = 'http://localhost:8080';

const getFullAvatarUrl = (avatarPath) => {
    if (!avatarPath) return null;
    if (avatarPath.startsWith('http')) return avatarPath;
    if (avatarPath.startsWith('data:image')) return avatarPath;
    return `${BASE_URL}${avatarPath}`;
};

export const getCurrentUser = async () => {
    try {
        const token = authService.getToken();
        const response = await axios.get(`${API_URL}/users/profile`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const userData = response.data;
        userData.avatar = getFullAvatarUrl(userData.avatar);
        localStorage.setItem('user', JSON.stringify(userData));
        return userData;
    } catch (error) {
        console.error('Error getting user:', error);
        throw error.response?.data || 'Không thể lấy thông tin người dùng';
    }
};

export const updateProfile = async (formData) => {
    try {
        const token = authService.getToken();
        const response = await axios.put(`${API_URL}/users/profile`, formData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        });
        const updatedUser = response.data;
        updatedUser.avatar = getFullAvatarUrl(updatedUser.avatar);
        
        // Cập nhật localStorage
        localStorage.setItem('user', JSON.stringify(updatedUser));
        
        return updatedUser;
    } catch (error) {
        console.error('Error updating profile:', error);
        throw error.response?.data || 'Không thể cập nhật thông tin';
    }
};
