import {
  applyJobAPI,
  getAuthorizedAPI,
  getUserInfoAPI,
} from "../ultils/apiURL";
import http from "../ultils/httpConfig";

const userService = {
  getUserInfo: () => {
    return http.get(getUserInfoAPI);
  },
  getAuthorized: () => {
    return http.get(getAuthorizedAPI);
  },
  updateUserInfo: (body) => {
    return http.put(getUserInfoAPI, body);
  },
  applyJob: (body) => {
    return http.post(applyJobAPI, body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};

export default userService;
