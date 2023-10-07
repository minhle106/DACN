import { createSlice } from "@reduxjs/toolkit";
import { STATUS } from "../../ultils/constant";
import {
  getUserInfo,
  setToken,
  setUserInfo,
  removeToken,
  removeUserInfo,
} from "../../ultils/helpFunc";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: getUserInfo() ? true : false,
    userInfo: getUserInfo() ? getUserInfo() : "{}",
    status: STATUS.IDLE,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.isLoggedIn = true;
      state.userInfo = action.payload.userInfo;
      setToken(action.payload.token);
      setUserInfo(action.payload.userInfo);
    },
    logoutSuccess: (state) => {
      state.isLoggedIn = false;
      state.userInfo = {};
      removeToken();
      removeUserInfo();
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
  },
});

export const { setStatus, loginSuccess, logoutSuccess } = authSlice.actions;
export default authSlice.reducer;
export const selectAuth = (state) => state.auth;
