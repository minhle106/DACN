import queryString from "query-string";
import { employeesAPI } from "../ultils/apiURL";
import http from "../ultils/httpConfig";

const employeeService = {
  getEmployees: (params) => {
    const qs = queryString.stringify(params);
    return http.get(`${employeesAPI}?${qs}`);
  },
  createEmployee: (body) => {
    return http.post(employeesAPI, body);
  },
  updateEmployee: (body) => {
    return http.put(employeesAPI, body);
  },
  deleteEmployee: (params) => {
    return http.delete(`${employeesAPI}/${params}`);
  },
};

export default employeeService;
