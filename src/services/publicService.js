import queryString from "query-string";
import http from "../ultils/httpConfig";
import { publicJobsAPI } from "../ultils/apiURL";

const publicService = {
  getJobs: (params) => {
    const qs = queryString.stringify(params);
    return http.get(`${publicJobsAPI}?${qs}`);
  },
  getJob: (params) => {
    return http.get(`${publicJobsAPI}/${params}`);
  },
};

export default publicService;
