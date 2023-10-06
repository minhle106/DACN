import { createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../../services/authService";
import { setToken } from "../../ultils/helpToken";

const login = createAsyncThunk("auth/authLogin", async (user) => {
  try {
    const response = await authService.login(user);
    const data = response.data;
    setToken(data);
    console(data);
  } catch (e) {}
});

export { login };
