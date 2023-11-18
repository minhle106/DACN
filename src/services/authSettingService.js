import queryString from "query-string";
import { affiliationsAPI, rolesAPI, featuresAPI } from "../ultils/apiURL";
import http from "../ultils/httpConfig";

const authSettingService = {
  getAffiliations: (params) => {
    const qs = queryString.stringify(params);
    return http.get(`${affiliationsAPI}?${qs}`);
  },
  createAffiliation: (body) => {
    return http.post(affiliationsAPI, body);
  },
  updateAffiliation: (body) => {
    return http.put(affiliationsAPI, body);
  },
  deleteAffiliation: (params) => {
    return http.delete(`${affiliationsAPI}/${params}`);
  },
  getRoles: (params) => {
    const qs = queryString.stringify(params);
    return http.get(`${rolesAPI}?${qs}`);
  },
  createRole: (body) => {
    return http.post(rolesAPI, body);
  },
  updateRole: (body) => {
    return http.put(rolesAPI, body);
  },
  deleteRole: (params) => {
    return http.delete(`${rolesAPI}/${params}`);
  },
  getFeatures: () => {
    return http.get(featuresAPI);
  },
};

export default authSettingService;
