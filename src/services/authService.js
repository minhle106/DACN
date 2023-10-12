import { loginAPI, logoutAPI, registerAPI } from "../ultils/apiURL";
import http from "../ultils/httpConfig";

const authService = {
  login: (user) => {
    return http.post(loginAPI, user);
  },
  logout: () => {
    return http.get(logoutAPI);
  },
  register: (formInput) => {
    return http.post(registerAPI, formInput);
  },
};

export default authService;
