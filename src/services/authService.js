import { loginAPI, logoutAPI } from "../ultils/apiURL";
import http from "../ultils/httpConfig";

const authService = {
  login: (user) => {
    return http.post(loginAPI, {
      username: user.email,
      password: user.password,
    });
  },
  logout: () => {
    return http.get(logoutAPI);
  },
};

export default authService;
