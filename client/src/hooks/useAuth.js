import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { setCredentials, clearCredentials } from "../stores/authSlice";
import authService from "../services/authService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

/**
 * Custom hook for authentication operations
 */
const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});


  const clearErrors = useCallback(() => {
    setErrors({});
  }, []);

  const handleAuthError = useCallback((error, fallbackMessage) => {
    
    const errorCode = error.code || error.response?.status;

    if (errorCode !== 422) {
      toast.error(error.code || fallbackMessage);
    }
  }, []);


  const storeAuthData = useCallback((authData, remember ) => {
    const { user, accessToken } = authData;
    
    // Store in Redux
    dispatch(setCredentials({ user, accessToken }));
    
    // Handle remember me preference
    if (remember) {
      localStorage.setItem("remember", "true");
    } 
  }, [dispatch]);

  /**
   * Clear all authentication data
   */
  const clearAuthData = useCallback(() => {
    // Clear Redux state
    dispatch(clearCredentials());
    
    // Clear localStorage using authService method
    authService.clearLocalStorage();
  }, [dispatch]);

  
  const login = useCallback(async ({ email, password, remember }) => {
  if (!email || !password) {
    setErrors({ validation: "Email và mật khẩu là bắt buộc." });
    return null;
  }
  

  setLoading(true);
  clearErrors();

  try {
    
    const response = await authService.signin(email, password);
    
    if (response?.data.error) {
      handleAuthError(new Error(response.data.error));
      return null;
    }
    
    storeAuthData(response.data, remember);

    toast.success("Đăng nhập thành công!");
    navigate("/", { replace: true });

    return response.user;
  } catch (error) {
     
    handleAuthError(error, "Có lỗi xảy ra khi đăng nhập.");
    return null;
  } finally {
    setLoading(false);
  }
}, [navigate, handleAuthError, storeAuthData, clearErrors]);



  const register = useCallback(async (userData) => {
    if (!userData.username || !userData.email || !userData.password) {
      setErrors({ validation: "Tất cả các trường là bắt buộc." });
      return null;
    }

    setLoading(true);
    clearErrors();

    try {
      
      const response = await authService.register(userData);
      
      toast.success("Đăng ký thành công! Vui lòng kiểm tra email để xác thực tài khoản.");
      navigate("/auth/signin", { replace: true });
      
      return response;
    } catch (error) {
      handleAuthError(error, "Có lỗi xảy ra khi đăng ký.");
      return null;
    } finally {
      setLoading(false);
    }
  }, [navigate, handleAuthError, clearErrors]);


  const loginWithGoogle = useCallback(async (idToken) => {
    
    if (!idToken) {
      toast.error("Token Google không hợp lệ.");
      return null;
    }

    setLoading(true);
    clearErrors();

    try {
      const response = await authService.loginGoogle(idToken);
      
      if (response?.error) {
        handleAuthError(new Error(response.error), "Đăng nhập bằng Google thất bại.");
        return null;
      }

      const authData = {
        user: response.data.user,
        accessToken: response.data.accessToken,
      };
      
      storeAuthData(authData);
      toast.success("Đăng nhập thành công!");
      navigate("/", { replace: true });
      
      return authData.user;
    } catch (error) {
      handleAuthError(error, "Đăng nhập bằng Google thất bại.");
      return null;
    } finally {
      setLoading(false);
    }
  }, [navigate, handleAuthError, storeAuthData, clearErrors]);

  const getProfile = useCallback(async ({ accessToken } = {}) => {
    const token = accessToken || authService.getAccessToken();
    
    if (!token) {
      console.warn("No access token available for profile fetch");
      return null;
    }

    try {
      const response = await authService.getProfile(token);
      return response.data.user;
    } catch (error) {
      console.error("Get profile error:", error);
      
      // If token is invalid, clear auth data
      if (error.code === 401) {
        clearAuthData();
      }
      
      return null;
    }
  }, [clearAuthData]);

  const verifyEmail = useCallback(async (token) => {
    if (!token) {
      toast.error("Token xác thực không hợp lệ.");
      return null;
    }

    setLoading(true);
    clearErrors();

    try {
      const response = await authService.verify(token);
      
      toast.success("Xác thực email thành công!");
      navigate("/auth/signin", { replace: true });
      
      return response;
    } catch (error) {
      handleAuthError(error, "Xác thực email thất bại.");
      return null;
    } finally {
      setLoading(false);
    }
  }, [navigate, handleAuthError, clearErrors]);

  const forgotPassword = useCallback(async (email) => {
    if (!email) {
      setErrors({ validation: "Email là bắt buộc." });
      return null;
    }

    setLoading(true);
    clearErrors();

    try {
      const response = await authService.forgotPassword(email);
      
      toast.success("Yêu cầu đặt lại mật khẩu đã được gửi đến email của bạn.");
      
      return response.data;
    } catch (error) {
      handleAuthError(error, "Gửi yêu cầu đặt lại mật khẩu thất bại.");
      return null;
    } finally {
      setLoading(false);
    }
  }, [handleAuthError, clearErrors]);

  const resetPassword = useCallback(async (token, data) => {
    if (!token || !data.password || !data.confirmPassword) {
      setErrors({ validation: "Tất cả các trường là bắt buộc." });
      return null;
    }

    if (data.password !== data.confirmPassword) {
      setErrors({ validation: "Mật khẩu xác nhận không khớp." });
      return null;
    }

    setLoading(true);
    clearErrors();

    try {
      const response = await authService.resetPassword(token, data);
      
      toast.success("Đặt lại mật khẩu thành công!");
      navigate("/auth/signin", { replace: true });
      
      return response;
    } catch (error) {
      handleAuthError(error, "Đặt lại mật khẩu thất bại.");
      return null;
    } finally {
      setLoading(false);
    }
  }, [navigate, handleAuthError, clearErrors]);

  const logout = useCallback(async () => {
  setLoading(true);

  try {
    
    await authService.logout();
    
  } catch (error) {
    console.warn("Không thể logout server:", error?.response?.data?.message || error.message);
  } finally {

    clearAuthData();

    localStorage.removeItem("accessToken");

    toast.success("Đăng xuất thành công!");
    setLoading(false);

    navigate("/", { replace: true });
  }
}, [navigate, clearAuthData]);


  const forceLogout = useCallback(() => {
    clearAuthData();
    toast.error("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
    navigate("/auth/signin", { replace: true });
  }, [navigate, clearAuthData]);

  const isAuthenticated = useCallback(() => {
    return authService.isAuthenticated();
  }, []);

  return {
    // Actions
    login,
    register,
    loginWithGoogle,
    getProfile,
    verifyEmail,
    forgotPassword,
    resetPassword,
    logout,
    forceLogout,
    clearErrors,
    isAuthenticated,
    
    // State
    loading,
    errors,
    
    // Utilities
    setErrors,
  };
};

export default useAuth;