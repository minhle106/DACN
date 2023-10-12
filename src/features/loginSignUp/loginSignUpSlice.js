import { createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../../services/authService";
import {
  setLoginStatus,
  setSignUpStatus,
} from "../../stores/reducer/authSlice";
import { STATUS } from "../../ultils/constant";
import {
  loginSuccess,
  logoutSuccess,
  registerSuccess,
} from "../../stores/reducer/authSlice";
import { notification } from "antd";

const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  await authService.logout();
  thunkAPI.dispatch(logoutSuccess());
});

const getUserInfoByAccessToken = createAsyncThunk(
  "auth/getUserInfo",
  async (token) => {
    return {
      fullName: "Minh",
      role: "Student",
    };
  }
);

const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  thunkAPI.dispatch(setLoginStatus(STATUS.IDLE));
  try {
    thunkAPI.dispatch(setLoginStatus(STATUS.LOADING));
    const response = await authService.login(user);
    const data = response.data;

    //  const userInfoData = getUserInfoByAccessToken(data);
    thunkAPI.dispatch(
      loginSuccess({
        userInfo: {
          fullName: "Minh",
          role: "Student",
        },
        token: data,
      })
    );
    thunkAPI.dispatch(setLoginStatus(STATUS.IDLE));
  } catch (e) {
    notification.error({
      message: "Failed",
      description: "Email or password is incorrect!",
    });
    thunkAPI.dispatch(setLoginStatus(STATUS.ERROR));
  }
});

const register = createAsyncThunk(
  "auth/register",
  async (formInput, thunkAPI) => {
    thunkAPI.dispatch(setSignUpStatus(STATUS.IDLE));
    try {
      thunkAPI.dispatch(setLoginStatus(STATUS.LOADING));
      await authService.register(formInput);
      thunkAPI.dispatch(registerSuccess(true));
      thunkAPI.dispatch(setSignUpStatus(STATUS.IDLE));
    } catch (e) {
      notification.error({
        message: "Failed",
        description: "This email has already been registered!",
      });
      thunkAPI.dispatch(setLoginStatus(STATUS.ERROR));
    }
  }
);

export { login, register, logout, getUserInfoByAccessToken };
