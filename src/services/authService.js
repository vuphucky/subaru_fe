import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth';
const BASE_URL = 'http://localhost:8080';

const getFullAvatarUrl = (avatarPath) => {
    if (!avatarPath) return null;
    if (avatarPath.startsWith('http')) return avatarPath;
    if (avatarPath.startsWith('data:image')) return avatarPath;
    return `${BASE_URL}${avatarPath}`;
};

const processUserData = (userData) => {
    if (!userData) return null;
    const processed = { ...userData };
    if (processed.avatar) {
        processed.avatar = getFullAvatarUrl(processed.avatar);
    }
    return processed;
};

const authService = {
    login: async (username, password) => {
        try {
            const response = await axios.post(`${API_URL}/signin`, {
                username,
                password
            });
            
            if (response.data.token) {
                const { token, ...userData } = response.data;
                // Xử lý URL avatar trước khi lưu
                const processedUser = processUserData(userData);
                
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(processedUser));
                return processedUser;
            }
            return null;
        } catch (error) {
            console.error('Login error:', error);
            throw error.response?.data || 'Đăng nhập thất bại';
        }
    },

    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    },

    getToken: () => {
        return localStorage.getItem('token');
    },

    getCurrentUser: () => {
        const userStr = localStorage.getItem('user');
        if (userStr) {
            const user = JSON.parse(userStr);
            // Đảm bảo URL avatar luôn được xử lý đúng
            return processUserData(user);
        }
        return null;
    },

    isAuthenticated: () => {
        return !!localStorage.getItem('token');
    },

    // Export hàm xử lý user data
    processUserData
};

export default authService;
