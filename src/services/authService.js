import http from "../ultils/httpConfig";

import {
  loginAPI,
  logoutAPI,
  registerAPI,
  getUserInfoAPI,
} from "../ultils/apiURL";

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
  getUserInfo: (body) => {
    return http.post(getUserInfoAPI, body);
  },
};

export default authService;
