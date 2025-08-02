import axios from 'axios';
import authService from '../services/authService';
import { logout, updateToken } from '../stores/authSlice';
import { store } from '../stores/index';

let isRefreshing = false;
let refreshSubscribers = [];

function subscribeTokenRefresh(cb) {
  refreshSubscribers.push(cb);
}

function onRefreshed(token) {
  refreshSubscribers.forEach(cb => cb(token));
  refreshSubscribers = [];
}

let forceLogoutCallback = null;

export const setForceLogoutCallback = (callback) => {
  forceLogoutCallback = callback;
};

const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL_API,
  withCredentials: true,
  timeout: 10000,
});

// REQUEST interceptor
instance.interceptors.request.use(
  (config) => {
    const accessToken = store.getState().auth.accessToken;
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// RESPONSE interceptor
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Khi access token hết hạn
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve) => {
          subscribeTokenRefresh((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(instance(originalRequest));
          });
        });
      }

      isRefreshing = true;

      try {

        const response = await authService.refreshToken();

        const newToken = response.data.accessToken;
        if (!newToken) {
          console.error("New access token not found!");
          throw new Error("Access token is missing");
        }
  
        store.dispatch(updateToken(newToken));

        onRefreshed(newToken);
        isRefreshing = false;

        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return instance(originalRequest);
      } catch (err) {
        console.error("Refresh token failed:", err);
        isRefreshing = false;
        refreshSubscribers = [];

        if (
          err.response?.status === 401 &&
          err.response?.data?.message === 'Refresh token expired'
        ) {
          store.dispatch(logout()); 
          window.location.href = '/auth/signin';
        } else if (forceLogoutCallback) {
          forceLogoutCallback();
        } else {
          window.location.href = '/auth/signin';
        }

        return Promise.reject(err);
      }

    }

    // Server error khác
    if (error.response?.status >= 500) {
      console.error(`[Server Error ${error.response.status}]:`, error.response.data?.message || error.message);
    }

    return Promise.reject(error);
  }
);

export default instance;
