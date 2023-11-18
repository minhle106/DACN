import axios from "axios";
import { BASE_URL } from "./apiURL";
import { LOCAL_ITEM } from "./constant";

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
  const token = localStorage.getItem(LOCAL_ITEM.ACCESS_TOKEN);
  if (token) {
    /* const decodedToken = jwtDecode(token);
    console.log(decodedToken.exp * 1000 - new Date().getTime());
    if (decodedToken.exp * 1000 < new Date().getTime()) {
      console.log(localStorage.getItem(LOCAL_ITEM.REFRESH_TOKEN));
      console.log(token);
      const refreshToken = localStorage.getItem(LOCAL_ITEM.REFRESH_TOKEN);
      const response = axios.post(BASE_URL + refreshTokenAPI, null, {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      });
      console.log(response);
      setToken(response.data);

      config.headers.Authorization = `Bearer ${localStorage.getItem(
        LOCAL_ITEM.ACCESS_TOKEN
      )}`;
    } else {
      config.headers.Authorization = `Bearer ${token}`;
    } */ config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

http.interceptors.response.use((response) => {
  return response;
});

export default http;
