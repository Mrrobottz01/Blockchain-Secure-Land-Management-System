import axios from 'axios';

const API_URL = 'http://localhost:8000/api/';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add interceptor to add auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add interceptor to handle token expiration
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // If error is 401 and not already retrying
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Attempt to refresh token
        const refreshToken = localStorage.getItem('refreshToken');
        const response = await axios.post(API_URL + 'token/refresh/', {
          refresh: refreshToken
        });
        
        const { access } = response.data;
        
        // Update stored token
        localStorage.setItem('token', access);
        
        // Update header and retry request
        originalRequest.headers['Authorization'] = `Bearer ${access}`;
        return api(originalRequest);
      } catch (error) {
        // If refresh fails, logout user
        logout();
        return Promise.reject(error);
      }
    }
    
    return Promise.reject(error);
  }
);

// Register new user
const register = async (userData) => {
  const response = await api.post('users/', userData);
  return response.data;
};

// Login user and store tokens
const login = async (email, password) => {
  // Django Simple JWT expects username and password fields
  const response = await api.post('token/', { username: email, password });
  if (response.data.access) {
    localStorage.setItem('token', response.data.access);
    localStorage.setItem('refreshToken', response.data.refresh);
    
    // Get user data after successful login
    const userResponse = await api.get('users/me/');
    localStorage.setItem('user', JSON.stringify(userResponse.data));
  }
  return response.data;
};

// Logout user and clear storage
const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('user');
};

// Get current user from localstorage
const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};

// Check if user is authenticated
const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

const authService = {
  register,
  login,
  logout,
  getCurrentUser,
  isAuthenticated,
  api
};

export default authService;
