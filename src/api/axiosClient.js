import axios from 'axios';

// Create axios instance
const axiosClient = axios.create({
  baseURL: 'http://localhost:8000/api/v1', // NO trailing slash
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // required if you ever use cookies
});

// Request interceptor to attach token
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to unwrap data
axiosClient.interceptors.response.use(
  (response) => response.data, // return only data directly
  (error) => {
    // Optional: attach error message for easier debugging
    const message = error.response?.data?.detail || error.message;
    return Promise.reject(new Error(message));
  }
);

export default axiosClient;
