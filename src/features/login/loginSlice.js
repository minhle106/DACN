import { createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../../services/authService";
import { setStatus } from "../../stores/reducer/authSlice";
import { STATUS } from "../../ultils/constant";
import { loginSuccess, logoutSuccess } from "../../stores/reducer/authSlice";

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
  thunkAPI.dispatch(setStatus(STATUS.IDLE));
  try {
    thunkAPI.dispatch(setStatus(STATUS.LOADING));
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
  } catch (e) {
    thunkAPI.dispatch(setStatus(STATUS.ERROR));
  }
});

export { login, logout, getUserInfoByAccessToken };
