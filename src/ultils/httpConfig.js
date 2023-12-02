import axios from "axios";
import { BASE_URL } from "./apiURL";
import { LOCAL_ITEM } from "./constant";
import { jwtDecode } from "jwt-decode";
import { refreshToken } from "../stores/reducer/authSlice";

class Http {
  constructor() {
    this.instance = axios.create({
      baseURL: BASE_URL,
      timeout: 10000,
    });
  }
}

const http = new Http().instance;

http.interceptors.request.use((config) => {
  if (localStorage.getItem(LOCAL_ITEM.ACCESS_TOKEN)) {
    const decodedToken = jwtDecode(
      localStorage.getItem(LOCAL_ITEM.ACCESS_TOKEN)
    );
    if (decodedToken.exp < new Date().getTime() / 1000) {
      refreshToken();
    }
    config.headers.Authorization = `Bearer ${localStorage.getItem(
      LOCAL_ITEM.ACCESS_TOKEN
    )}`;
  }
  return config;
});

http.interceptors.response.use((response) => {
  return response;
});

export default http;
