import axios from "axios";
import axiosInstance from "../utils/axiosInstance";
const API_URL = "http://localhost:2003/api/auth/";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

class AuthService {

  async signin(email, password) {
    try {
      const response = await axios.post(API_URL + "signin", {
        email,
        password,
      }, {
        withCredentials: true 
      });
      localStorage.setItem("accessToken", response.data.accessToken)
      return response.data;
      
    } catch (error) {
      this.handleError(error, "Đăng nhập thất bại");
    }
  }

  async signup(username, email, password) {
    try {
      const response = await axios.post(API_URL + "signup", {
        username,
        email,
        password,
      });
      return response.data;
    } catch (error) {
      this.handleError(error, "Đăng ký thất bại");
    }
  }

  async forgotPassword(email) {
    try {
      const response = await axios.post(API_URL + "forgot", { email });
      return response.data;
    } catch (error) {
      this.handleError(error, "Gửi yêu cầu đặt lại mật khẩu thất bại");
    }
  }

  async resetPassword(token, password) {
    try {
      const response = await axios.post(API_URL + `reset/${token}`, { password });
      return response.data;
    } catch (error) {
      this.handleError(error, "Đặt lại mật khẩu thất bại");
    }
  }

  async verifyEmail(token) {
    try {
      const response = await axios.get(API_URL + `verifyemail/${token}`);
      return response.data;
    } catch (error) {
      this.handleError(error, "Xác thực email thất bại");
    }
  }

  async resendVerificationEmail(email) {
    try {
      const response = await axios.post(API_URL + "resend", { email });
      return response.data;
    } catch (error) {
      this.handleError(error, "Gửi lại email xác thực thất bại");
    }
  }

  async logout() {
    const response = await axios.post(API_URL + "logout", {}, {
      withCredentials: true,
    });
    return response.data;
}

async getUserProfile() {

    const token = this.getAccessToken();

    if (!token) return null;

    const res = await axiosInstance.get("auth/me");

    return res.data;

}

  getAccessToken() {
    return localStorage.getItem("accessToken");
  }

  async refreshToken() {
    try {
      const response = await axios.post(API_URL + "refresh", {}, {
        withCredentials: true
      });
      localStorage.setItem("accessToken", response.data.accessToken);
      return response.data.accessToken;
    } catch (error) {
      console.error("Refresh token failed", error);
    }
  }

  async loginGoogle(id_token) {
  try {
    const response = await axios.post(API_URL + "google-login", 
      { id_token },
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    this.handleError(error, "Đăng nhập Google thất bại");
  }
}


}



export default new AuthService();
