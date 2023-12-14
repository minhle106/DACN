import http from "../ultils/httpConfig";

import {
  loginAPI,
  logoutAPI,
  registerAPI,
  refreshTokenAPI,
  BASE_URL,
} from "../ultils/apiURL";
import axios from "axios";
import { LOCAL_ITEM } from "../ultils/constant";

const axios_config = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

axios_config.interceptors.request.use((config) => {
  if (localStorage.getItem(LOCAL_ITEM.REFRESH_TOKEN)) {
    config.headers.Authorization = `Bearer ${localStorage.getItem(
      LOCAL_ITEM.REFRESH_TOKEN
    )}`;
  }
  return config;
});

const authService = {
  login: (body) => {
    return http.post(loginAPI, body);
  },
  logout: () => {
    return http.get(logoutAPI);
  },
  register: (body) => {
    return http.post(registerAPI, body);
  },
  refreshToken: () => {
    return axios_config.post(refreshTokenAPI);
  },
};

export default authService;
