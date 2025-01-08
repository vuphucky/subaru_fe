import axios from 'axios';
import authService from './authService';

const API_URL = 'http://localhost:8080/api/wallets';

// Tạo axios instance với interceptor
const axiosInstance = axios.create();

// Add request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = authService.getToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token hết hạn hoặc không hợp lệ
      authService.logout();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

const walletService = {
  getWallets: async () => {
    try {
      const response = await axiosInstance.get(`${API_URL}/list`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  addWallet: async (walletData) => {
    try {
      const response = await axiosInstance.post(`${API_URL}/add`, walletData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  updateWallet: async (walletData) => {
    try {
      const response = await axiosInstance.post(`${API_URL}/fix`, walletData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  deleteWallet: async (id) => {
    try {
      const response = await axiosInstance.delete(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  addMoney: async (data) => {
    try {
      const response = await axiosInstance.post(`${API_URL}/add-money`, data);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};

export default walletService;
