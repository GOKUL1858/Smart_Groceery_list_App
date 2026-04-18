import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Use your provided IP address for network connectivity with Expo Go
const BASE_URL = 'http://10.130.22.142:5000/api';

const api = axios.create({
  baseURL: BASE_URL,
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
