import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getUserInfo,
  setUserInfo,
  removeToken,
  removeUserInfo,
  setToken,
} from "../../ultils/helpFunc";
import { notification } from "antd";
import authService from "../../services/authService";
import userService from "../../services/userService";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: getUserInfo() ? true : false,
    userInfo: getUserInfo() ? getUserInfo() : "{}",
    isRegister: false,
    isLogin: false,
    authorized: [],
    count: 1,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.isLoggedIn = true;
      state.isLogin = true;
      state.userInfo = action.payload.userInfo;
      setUserInfo(action.payload.userInfo);
    },
    logoutSuccess: (state) => {
      state.isLoggedIn = false;
      state.isLogin = false;
      state.userInfo = {};
      removeToken();
      removeUserInfo();
    },
    setIsRegister: (state, action) => {
      state.isRegister = action.payload;
    },
    setAuthorized: (state, action) => {
      state.authorized = action.payload;
    },
    setCount: (state, action) => {
      state.count = action.payload;
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

    const responseUserInfo = await userService.getUserInfo();

    thunkAPI.dispatch(
      loginSuccess({
        userInfo: responseUserInfo.data,
      })
    );
  } catch (e) {
    /* notification.error({
      message: "Failed",
      description: "Email or password is incorrect!",
    }); */
    notification.error({
      message: "Error",
      description: e.message,
    });
    removeToken();
  }
});

const register = createAsyncThunk(
  "auth/register",
  async ({ formInput, setStep }, thunkAPI) => {
    try {
      await authService.register(formInput);
      thunkAPI.dispatch(setIsRegister(true));
    } catch (e) {
      /* notification.error({
      message: "Failed",
      description: "This email has already been registered!",
    }); */
      notification.error({
        message: "Error",
        description: e.message,
      });
      setStep(0);
    }
  }
);

const refreshToken = async () => {
  try {
    const response = await authService.refreshToken();
    const data = response.data;
    setToken(data);
  } catch (e) {
    notification.error({
      message: "Error",
      description: e.message,
    });
  }
};

export const {
  loginSuccess,
  logoutSuccess,
  setIsRegister,
  setAuthorized,
  setCount,
} = authSlice.actions;
export default authSlice.reducer;
export const selectAuth = (state) => state.auth;

export { login, logout, register, refreshToken };
