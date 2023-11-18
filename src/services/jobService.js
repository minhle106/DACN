import http from "../ultils/httpConfig";
import { CRUDJobsAPI } from "../ultils/apiURL";
import queryString from "query-string";

const jobService = {
  createJob: (body) => {
    return http.post(CRUDJobsAPI, body);
  },
  getJobs: (params) => {
    const qs = queryString.stringify(params);
    return http.get(`${CRUDJobsAPI}?${qs}`);
  },
  getJob: (jobId) => {
    return http.get(`${CRUDJobsAPI}/${jobId}`);
  },
  updateJob: (jobId, body) => {
    return http.put(`${CRUDJobsAPI}/${jobId}`, body);
  },
  deleteJob: (jobId) => {
    return http.delete(`${CRUDJobsAPI}/${jobId}`);
  },
};

export default jobService;
