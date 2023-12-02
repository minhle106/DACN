import http from "../ultils/httpConfig";
import { jobsAPI } from "../ultils/apiURL";
import queryString from "query-string";

const jobService = {
  getJobs: (params) => {
    const qs = queryString.stringify(params);
    return http.get(`${jobsAPI}?${qs}`);
  },
  getJob: (params) => {
    return http.get(`${jobsAPI}/${params}`);
  },
  createJob: (body) => {
    return http.post(jobsAPI, body);
  },
  updateJob: (params, body) => {
    return http.put(`${jobsAPI}/${params}`, body);
  },
  deleteJob: (params) => {
    return http.delete(`${jobsAPI}/${params}`);
  },
};

export default jobService;
