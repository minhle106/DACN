import axios from "axios";
import { BASE_URL } from "./apiURL";
import { getAccessToken } from "./helpFunc";

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
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
export default http;
