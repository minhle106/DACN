import { createSlice } from "@reduxjs/toolkit";
import { STATUS } from "../../ultils/constant";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    accessToken: "",
    isLogin: false,
    status: STATUS.IDLE,
  },
  reducers: {
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setIsLogin: (state, action) => {
      state.isLogin = action.payload;
    },
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
  },
});

export const { setAccessToken, setIsLogin, setStatus } = authSlice.actions;
export default authSlice.reducer;
