import http from "../ultils/httpConfig";
import { cvApplyAPI } from "../ultils/apiURL";
import queryString from "query-string";

const candidateService = {
  getCandidates: (params) => {
    const qs = queryString.stringify(params);
    return http.get(`${cvApplyAPI}?${qs}`);
  },
  reject: (params) => {
    return http.post(`${cvApplyAPI}/reject/${params}`);
  },
  toInterview: (params) => {
    return http.post(`${cvApplyAPI}/to-interview/${params}`);
  },
  toEvaluation: (params) => {
    return http.post(`${cvApplyAPI}/to-evaluation/${params}`);
  },
  accept: (params) => {
    return http.post(`${cvApplyAPI}/accept/${params}`);
  },
};

export default candidateService;
