import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getUserInfo,
  setUserInfo,
  removeToken,
  removeUserInfo,
  setToken,
} from "../../ultils/helpFunc";
import { notification } from "antd";
import { LOCAL_ITEM } from "../../ultils/constant";
import authService from "../../services/authService";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: getUserInfo() ? true : false,
    userInfo: getUserInfo() ? getUserInfo() : "{}",
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.isLoggedIn = true;
      state.userInfo = action.payload.userInfo;
      setUserInfo(action.payload.userInfo);
    },
    logoutSuccess: (state) => {
      state.isLoggedIn = false;
      state.userInfo = {};
      removeToken();
      removeUserInfo();
    },
  },
});

const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  await authService.logout();
  thunkAPI.dispatch(logoutSuccess());
});

const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  try {
    const response = await authService.login(user);
    const data = response.data;
    setToken(data);

    const responseUserInfo = await authService.getUserInfo({
      accessToken: localStorage.getItem(LOCAL_ITEM.ACCESS_TOKEN),
    });

    thunkAPI.dispatch(
      loginSuccess({
        userInfo: responseUserInfo.data,
      })
    );
  } catch (e) {
    notification.error({
      message: "Failed",
      description: "Email or password is incorrect!",
    });
    removeToken();
  }
});

const register = createAsyncThunk("auth/register", async (formInput) => {
  try {
    await authService.register(formInput);
  } catch (e) {
    notification.error({
      message: "Failed",
      description: "This email has already been registered!",
    });
  }
});

export const {
  setLoginStatus,
  setSignUpStatus,
  loginSuccess,
  logoutSuccess,
  registerSuccess,
} = authSlice.actions;

export default authSlice.reducer;
export const selectAuth = (state) => state.auth;

export { login, logout, register };
