import axios from 'axios';
import { API_URL } from './constants';
import { getFromStorage } from './common';

// Create an instance of Axios
const axiosInstance = axios.create({
  baseURL: API_URL, // Backend URL
});

// Add a request interceptor to include token in the headers
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getFromStorage('token');
    if (token) {
      config.headers['Authorization'] = `${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;