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
  addNotes: (body) => {
    return http.put(`${cvApplyAPI}/note`, body);
  },
  createMeeting: (body) => {
    return http.post(`${cvApplyAPI}/meeting`, body);
  },
};

export default candidateService;
