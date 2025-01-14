import axios from 'axios';
import { getToken } from './authService';

const API_URL = 'http://localhost:8080/api/users';

export const getCurrentUser = async () => {
    try {
        const token = getToken();
        const response = await axios.get(`${API_URL}/profile`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || 'Error getting user profile';
    }
};

export const updateProfile = async (userData) => {
    try {
        const token = getToken();
        const response = await axios.put(`${API_URL}/profile`, userData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || 'Error updating profile';
    }
};
