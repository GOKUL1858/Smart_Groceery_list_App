import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const baseURL = process.env.EXPO_PUBLIC_API_URL || 'http://10.130.20.116:5000/api';

const api = axios.create({
  baseURL,
  timeout: 10000, // 10 seconds timeout to prevent infinite loading
});

api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
