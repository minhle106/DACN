import { loginAPI } from "../ultils/apiURL";
import http from "../ultils/httpConfig";


const authService = {
    login: (user) => {
        return http.post(loginAPI , {
            username: user.email, password: user.pwd
        })
    },

}

export default authService;