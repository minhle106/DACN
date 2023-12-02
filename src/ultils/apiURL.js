const BASE_URL =
  "http://jobapply-env.eba-f9u9rk85.ap-southeast-1.elasticbeanstalk.com/api/v1/";

const refreshTokenAPI = `auth/refresh-token`;
const loginAPI = `auth/authenticate`;
const logoutAPI = `auth/logout`;
const registerAPI = `auth/register`;
const getUserInfoAPI = `common/user-info`;
const jobsAPI = `company/jobs`;
const affiliationsAPI = `affiliations`;
const rolesAPI = `roles`;
const featuresAPI = `features`;
const employeesAPI = `employees`;

export {
  BASE_URL,
  loginAPI,
  logoutAPI,
  registerAPI,
  refreshTokenAPI,
  getUserInfoAPI,
  jobsAPI,
  rolesAPI,
  affiliationsAPI,
  featuresAPI,
  employeesAPI,
};
