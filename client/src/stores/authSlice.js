// src/store/authSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { setAccessToken } from "../utils/tokenManager";

const initialState = {
  user: null,
  accessToken: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, accessToken } = action.payload;
      state.user = user;
      state.accessToken = accessToken;
      setAccessToken(accessToken);
    },
    clearCredentials: (state) => {
      state.user = null;
      state.accessToken = null;
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setCredentials, clearCredentials, logout } = authSlice.actions;
export default authSlice.reducer;