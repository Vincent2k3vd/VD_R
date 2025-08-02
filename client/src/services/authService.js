
import axios from 'axios';
import axiosInstance from '../utils/axiosInstance';


// API Configuration
const API_AUTH = import.meta.env.VITE_API_URL_AUTH;

/**
 * Authentication Service
 * Handles all authentication-related API calls
 */
class AuthService {
  /**
   * User registration
   */
  async register(userData) {
    try {
      const response = await axiosInstance.post(`${API_AUTH}/signup`, userData);
      return response.data;
    } catch (error) {
      this.handleError(error, 'Đăng ký thất bại');
    }
  }

  /**
   * Verify email with token
   */
  async verify(token) {
    try {
      const response = await axiosInstance.get(`${API_AUTH}/verify-email/${token}`);
      return response.data;
    } catch (error) {
      this.handleError(error, 'Xác thực email thất bại');
    }
  }

  /**
   * Resend verification email
   */
  async resendVerificationEmail(email) {
    try {
      const response = await axiosInstance.post(`${API_AUTH}/resend-verification`, { email });
      return response.data;
    } catch (error) {
      this.handleError(error, 'Gửi lại email xác thực thất bại');
    }
  }

  async signin(email, password) {
    try {
      const response = await axiosInstance.post(`${API_AUTH}/signin`, {
        email,
        password
      });

      return response.data;
    } catch (error) {
      
      this.handleError(error, 'Đăng nhập thất bại');
    }
  }

  async loginGoogle(idToken) {
    try {
      
      const response = await axios.post(`${API_AUTH}/google`, 
        { id_token: idToken },
        { withCredentials: true }
      );
      
      return response.data;
    } catch (error) {
      this.handleError(error, 'Đăng nhập bằng Google thất bại');
    }
  }

  /**
   * User logout
   */
  
  async logout() {
    try {
      const response = await axiosInstance.post(`${API_AUTH}/logout`, {}, {
        withCredentials: true,
      });
      
      // Clear local storage after successful logout
      this.clearLocalStorage();
      
      return response.data;
    } catch (error) {
      // Even if server logout fails, clear local storage
      this.clearLocalStorage();
      console.error('Logout error:', error);
      
      // Don't throw error for logout to ensure cleanup happens
      return { success: false, error: error.message };
    }
  }

  /**
   * Refresh access token
   */
  async refreshToken() {
    try {
      const response = await axiosInstance.post(`${API_AUTH}/refresh-token`, {}, {
        withCredentials: true
      });
      
      // Update access token in localStorage
      if (response.data.data?.accessToken) {
        localStorage.setItem('accessToken', response.data.data.accessToken);
      }
      
      return response.data;
    } catch (error) {
      // Clear tokens if refresh fails
      this.clearLocalStorage();
      throw error; // Re-throw to trigger logout in interceptor
    }
  }

  /**
   * Forgot password request
   */
  async forgotPassword(email) {
    try {
      const response = await axiosInstance.post(`${API_AUTH}/forgot-password`, { email });
      return response.data;
    } catch (error) {
      this.handleError(error, 'Gửi yêu cầu đặt lại mật khẩu thất bại');
    }
  }

  /**
   * Reset password with token
   */
  async resetPassword(token, data) {
    try {
      const response = await axiosInstance.post(`${API_AUTH}/reset-password/${token}`, data);
      return response.data;
    } catch (error) {
      this.handleError(error, 'Đặt lại mật khẩu thất bại');
    }
  }

  async changePassword(data) {
    try {
      const response = await axiosInstance.post(`${API_AUTH}/change-password`, data);
      return response.data;
    } catch (error) {
      this.handleError(error, 'Đổi mật khẩu thất bại');
    }
  }
  
  /**
   * Get access token from localStorage
   * @returns {string|null} Access token or null
   */

  /**
   * Check if user is authenticated
   * @returns {boolean} Authentication status
   */

  /**
   * Clear all authentication data from localStorage
   */
  clearLocalStorage() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('persist:root');
  }

 
  handleError(error, customMessage = 'Đã xảy ra lỗi') {
    let message = customMessage;
    let errorCode = null;

    if (axios.isAxiosError(error)) {
      const response = error.response;
      
      if (response) {
        errorCode = response.data.error;
      } else if (error.request) {
        message = 'Không nhận được phản hồi từ máy chủ. Vui lòng kiểm tra kết nối mạng.';
      }
    } else {
      message = error.message || customMessage;
    }

    console.error(`[AuthService] ${customMessage}:`, {
      message,
      errorCode,
      originalError: error
    });

    const formattedError = new Error(message);
    formattedError.code = errorCode;
    formattedError.originalError = error;
    
    throw formattedError;
  }
}

export default new AuthService();