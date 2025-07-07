import axios from 'axios';
import authService from '../services/authService';
import { getAccessToken } from '../utils/tokenManager';

let isRefreshing = false;
let refreshSubscribers = [];

function subscribeTokenRefresh(cb) {
  refreshSubscribers.push(cb);
}

function onRefreshed(newToken) {
  refreshSubscribers.forEach(cb => cb(newToken));
  refreshSubscribers = [];
}


// Callback để handle force logout
let forceLogoutCallback = null;

/**
 * Set force logout callback từ useAuth hook
 * @param {Function} callback - Force logout callback
 */
export const setForceLogoutCallback = (callback) => {
  forceLogoutCallback = callback;
};

// Tạo axios instance
const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  timeout: 10000, // 10 seconds timeout
});

// Request interceptor
instance.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // Handle 401 Unauthorized
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve) => {
          subscribeTokenRefresh((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(instance(originalRequest));
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const response = await authService.refreshToken();
        const newToken = response.data.data.accessToken;

        localStorage.setItem('accessToken', newToken);
        onRefreshed(newToken);
        isRefreshing = false;

        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return instance(originalRequest);
      } catch (err) {
        isRefreshing = false;
        refreshSubscribers = [];

        if (forceLogoutCallback) forceLogoutCallback();
        else window.location.href = '/';

        return Promise.reject(err);
      }
    }

    
    // Handle other errors
    if (error.response?.status >= 500) {
      console.error(`[Server Error ${error.response.status}]:`, error.response.data?.message || error.message);
    }

    
    return Promise.reject(error);
  }
);

export default instance;