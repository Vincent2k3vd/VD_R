import { useCallback } from "react";
import userService from "../services/userService";
import { useDispatch } from "react-redux";
import { clearCredentials } from "../stores/authSlice";

const useUser = () => {
  const dispatch = useDispatch();

    const clearAuthData = useCallback(() => {

      dispatch(clearCredentials());
      
      userService.clearLocalStorage();
    }, [dispatch]);

  const getProfile = useCallback(async ({ accessToken } = {}) => {
      const token = accessToken;
      
      if (!token) {
        console.warn("No access token available for profile fetch");
        return null;
      }
  
      try {
        const response = await userService.getProfile(token);
        return response.data.user;
      } catch (error) {
        console.error("Get profile error:", error);
        
        if (error.code === 401) {
          clearAuthData();
        }
        
        return null;
      }
    }, [clearAuthData]);
  return {
    getProfile,
  };
};

export default useUser;
